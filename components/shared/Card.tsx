import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DeleteConfirmation from './DeleteConfirmation';

interface CardProps {
    event: IEvent
    hasOrderLink?: boolean
    hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const isEventCreator = userId === event.organizer._id.toString()

    return (
        <div className='group flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden 
        rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] relative'>
            <Link
                style={{
                    backgroundImage: `url(${event.imageUrl})`
                }}
                className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500'
                href={`/events/${event._id}`} />

            {
                isEventCreator && !hidePrice && (
                    <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                        <Link href={`/events/${event._id}/update`}>
                            <Image
                                src="/assets/icons/edit.svg"
                                alt="edit"
                                height={20}
                                width={20} />
                        </Link>

                        <DeleteConfirmation
                            eventId={event._id} />
                    </div>
                )
            }

            <div
                className='flex min-h-[238px] flex-col gap-3 p-5 md:gap-4'
            >
                {!hidePrice && <div className='flex gap-2'>
                    <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>{event.isFree ? "FREE" : `${event.price}`}</span>

                    <p className='p-semibold-14 w-min rounded-full bg-gray-500/10 text-grey-500 px-4 py-1 line-clamp-1'>
                        {event.category.name}
                    </p>
                </div>
                }

                <p className='p-medium-16 p-medium-18 text-grey-500'>
                    {formatDateTime(event.startDateTime).dateTime}
                </p>

                <Link href={`/events/${event._id}`}>
                    <p className='line-clamp-2 flex-1 text-black p-medium-16 md:p-medium-20'>
                        {event.title}
                    </p>
                </Link>

                <div className='flex-between w-full'>
                    <p className='p-medium-14 md:p-medium-16 text-grey-600'>
                        {event.organizer.firstName} {event.organizer.lastName}
                    </p>

                    {hasOrderLink && (
                        <Link
                            className='flex gap-2'
                            href={`/orders?eventId=${event._id}`}>

                            <p className='text-primary-500'>Order Details</p>
                            <Image
                                src="/assets/icons/arrow.svg"
                                alt="arrow"
                                width={10}
                                height={10}
                            />
                        </Link>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Card