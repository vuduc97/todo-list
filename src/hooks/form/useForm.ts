import { ChangeEvent, useCallback, useState } from 'react';
import { validateForm, ValidationRecord } from './validation';

export type FormValues = Record<string | symbol, any>;
export type FormValidation<TFieldValue, TFormValues> = Record<string | symbol, ValidationRecord<TFieldValue, TFormValues>[]>;
export type ChangeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>;

interface UseFormProps<TFormValues extends FormValues> {
    initValue: TFormValues;
    validations?: FormValidation<any, TFormValues>;
    submit: (value: TFormValues) => void;
}

export function useForm<TFormValues extends FormValues>({ initValue, validations, submit }: UseFormProps<TFormValues>) {
    const [formValues, setFormValues] = useState<TFormValues>(initValue);
    const [errors, setErrors] = useState<Record<string, string>>({});

    /**
     * Set form field value base on input name
     */
    const setFieldValue = useCallback((e: ChangeType) => {
        setFormValues((formValues) => ({
            ...formValues,
            [e.target.name]: e.target.value
        }));
    }, []);

    /**
    * Get form field value base on input name
    */
    const getFieldValue = useCallback((name: string) => {
        return formValues[name];
    }, [formValues]);


    /**
    * Validate and submit form
    */
    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const formValidation = validateForm(formValues, validations);
        setErrors(formValidation.errors);
        if (!formValidation.isValid) {
            return;
        }

        submit(formValues);
    }, [formValues, submit, validations]);

    /**
    * Reset form values to initial value
    */
    const reset = useCallback(() => {
        setFormValues({ ...initValue });
    }, [initValue]);

    /**
    * Set form values
    */
    const setValues = useCallback((formValues: TFormValues) => {
        setFormValues({ ...formValues });
    }, []);

    return {
        formValues,
        errors,
        getFieldValue,
        setFieldValue,
        setValues,
        handleSubmit,
        reset,
    }
}