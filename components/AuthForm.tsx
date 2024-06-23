'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address1: '',
            state: '',
            postalCode: '',
            dateOfBirth: '',
            ssn: '',
            city: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password,
                };
                const newUser = await signUp(userData);
                setUser(newUser);
            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });
                if (response) {
                    router.push('/');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className="cursor-pointer flex items-center gap-1"
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="Byte Bank Logo"
                        width={34}
                        height={34}
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        {' '}
                        Byte Bank{' '}
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link account'
                            : type === 'sign-in'
                            ? 'Sign-In'
                            : 'Sign-Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
            <div className="flex flex-col gap-4">
                <PlaidLink user={user} variant="primary" />
            </div>
            ) : (
            <>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {type === 'sign-up' ? (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput
                                        form={form}
                                        placeHolder="Enter your First Name"
                                        name="firstName"
                                        label="First Name"
                                    />
                                    <CustomInput
                                        form={form}
                                        placeHolder="Enter your Last Name"
                                        name="lastName"
                                        label="Last Name"
                                    />
                                </div>
                                <CustomInput
                                    form={form}
                                    placeHolder="Enter your specific Address"
                                    name="address1"
                                    label="Address"
                                />
                                <CustomInput
                                    form={form}
                                    placeHolder="Enter your City"
                                    name="city"
                                    label="City"
                                />
                                <div className="flex gap-4">
                                    <CustomInput
                                        form={form}
                                        placeHolder="Example : NY"
                                        name="state"
                                        label="State"
                                    />
                                    <CustomInput
                                        form={form}
                                        placeHolder="Example : 11101"
                                        name="postalCode"
                                        label="Postal Code"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput
                                        form={form}
                                        placeHolder="YYYY-MM-DD"
                                        name="dateOfBirth"
                                        label="Date Of Birth"
                                    />
                                    <CustomInput
                                        form={form}
                                        placeHolder="Example : 1234"
                                        name="ssn"
                                        label="SSN"
                                    />
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        <CustomInput
                            form={form}
                            placeHolder="Enter your email"
                            name="email"
                            label="Email"
                        />
                        <CustomInput
                            form={form}
                            placeHolder="Enter your password"
                            name="password"
                            label="Password"
                        />
                        <div className="flex flex-col gap-4">
                            <Button
                                disabled={isLoading}
                                className="form-btn"
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        &nbsp; Submitting...
                                    </>
                                ) : type === 'sign-in' ? (
                                    'Sign-In'
                                ) : (
                                    'Sign-Up'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type == 'sign-in'
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                    </p>
                    <Link
                        href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                        className="form-link"
                    >
                        {type == 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </footer>
            </>
            )}
        </section>
    );
};

export default AuthForm;
