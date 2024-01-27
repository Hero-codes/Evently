import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import NavItems from './NavItems'

const MobileNav = () => {
    return (
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger className='align-middle'>
                    <Image
                        src="/assets/icons/menu.svg"
                        alt='menu'
                        width={24}
                        height={24}
                        className='cursor-pointer' />
                </SheetTrigger>

                <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
                    <Image src="/assets/images/logo.svg"
                        alt='logo'
                        width={128}
                        height={38} />

                    <Separator className='border border-gray-50' />

                    <NavItems />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav