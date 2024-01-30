"use client";
import { headerLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavItems = () => {

    const pathname = usePathname();

    return (
        <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
            {headerLinks.map(link => {
                const isActive = pathname === link.route

                return (
                    <li
                        className={cn("flex-center p-medium-16 whitespace-nowrap",
                            isActive && "text-purple-500"
                        )}
                        key={link.route}>
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavItems