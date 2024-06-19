'use client'

import React from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
    const pathName = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="menu"
                        height={30}
                        width={30}
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                    <Link
                        href="/"
                        className="flex items-center cursor-pointer gap-1 px-4"
                    >
                        <Image
                            alt="ByteBank Logo"
                            src="./icons/logo.svg"
                            height={34}
                            width={34}
                        />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                            Byte Bank
                        </h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="h-full flex flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((item) => {
                                    const isActive =
                                        pathName === `${item.route}` ||
                                        pathName.startsWith(`${item.route}/`);
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', {
                                                    'bg-bank-gradient':
                                                        isActive,
                                                })}
                                            >
                                                    <Image
                                                        height={20}
                                                        width={20}
                                                        alt={item.label}
                                                        src={item.imgURL}
                                                        className={cn({
                                                            'brightness-[3] invert-0':
                                                                isActive,
                                                        })}
                                                    />
                                                <p
                                                    className={cn(
                                                        'text-16 font-semibold text-black-2',
                                                        {
                                                            'text-white':
                                                                isActive,
                                                        }
                                                    )}
                                                >
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                                USER
                            </nav>
                        </SheetClose>
                        FOOTER
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
