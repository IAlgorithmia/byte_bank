import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { logoutAccount } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const Footer = ({ user, type }: FooterProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logoutAccount();
        if (response) {
            router.push('/sign-in');
        }
    };

    return (
        <footer className="footer">
            <div
                className={
                    type === 'mobile' ? 'footer_name-mobile' : 'footer_name'
                }
            >
                <p className="text-xl font-bold text-gray-700">
                    {user.firstName[0]}
                </p>
            </div>
            <div
                className={
                    type === 'mobile' ? 'footer_email-mobile' : 'footer_email'
                }
            >
                <h1 className="text-14 truncate font-semibold text-gray-600">
                    {user.firstName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user.email}
                </p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image src="icons/logout.svg" fill alt="logout" />
            </div>
        </footer>
    );
};

export default Footer;
