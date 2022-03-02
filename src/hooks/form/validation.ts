import { FormValues, FormValidation } from './useForm';

export interface ValidationRecord<TFieldValue, TFormValues> {
    name: string;
    message: string;
    validationFn: (fieldValue: TFieldValue, formObject: TFormValues) => boolean;
}

export function validateForm<TFormValues extends FormValues>(
    formValues: TFormValues,
    validations?: FormValidation<any, TFormValues>) {
    if (!validations) {
        return {
            isValid: true,
            errors: {}
        }
    }

    let errors = {};
    for (const fieldName of Object.keys(formValues)) {
        errors = { ...errors, ...validateFormField(fieldName, validations, formValues) };
    }

    return {
        isValid: Object.keys(errors).length <= 0,
        errors
    };
}

function validateFormField<TFormValues extends FormValues>(
    name: string | symbol,
    validations: FormValidation<any, TFormValues>,
    formValues: TFormValues) {
    const rules = validations[name];

    if (!rules) {
        return {};
    }

    const fieldValue = formValues[name];

    for (const rule of rules) {
        if (!rule.validationFn(fieldValue, formValues)) {
            return {
                [rule.name]: rule.message
            }
        }
    }

    return {};
}
