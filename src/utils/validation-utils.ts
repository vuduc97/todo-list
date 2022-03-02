import { ValidationRecord } from '../hooks/form/validation';
import { Todo } from './../types/todo';

export function string() {
    function required(name: string, message?: string): ValidationRecord<string, Todo> {
        return {
            name,
            message: message ?? `${name} is required`,
            validationFn: (fieldValue: string, formObject: Todo) => !!fieldValue && fieldValue.trim().length > 0
        };
    }

    return {
        required
    };
}

export function date() {
    function presentOrFutureDate(name: string, message?: string): ValidationRecord<Date | string, Todo> {
        return {
            name,
            message: message ?? `${name} must be greater than or equal to the current date`,
            validationFn: (fieldValue: Date | string, formObject: Todo) => {
                if (!fieldValue) {
                    return false;
                }

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                const dateValue = new Date(fieldValue);
                dateValue.setHours(0, 0, 0, 0);

                return dateValue >= currentDate;
            }
        };
    }

    return {
        presentOrFutureDate
    };
}