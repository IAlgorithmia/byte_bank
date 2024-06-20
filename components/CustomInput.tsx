import React from 'react';
import { FieldPath, UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

const CustomInput = ({
    form,
    placeHolder,
    name,
    label,
}: {
    form: UseFormReturn<
        {
            firstName?: string | undefined;
            lastName?: string | undefined;
            address1?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            postalCode?: string | undefined;
            dateOfBirth?: string | undefined;
            ssn?: string | undefined;
            email: string;
            password: string;
        },
        any,
        undefined
    >;
    placeHolder: string;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input
                                placeholder={placeHolder}
                                className="input-class"
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
