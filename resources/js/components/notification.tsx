/** Vendor. */
import React, { useState, useEffect } from 'react'

/** Hook. */
import { useAppDispatch } from '$lib/hooks/use-rtk'
import useNotification from '$lib/hooks/use-notification'

/** Component. */
import Icon from '$lib/components/icon'

/** Notice props. */
type NoticeProps<T = any> = {
    children: T
    duration: number
    status: number
}

const Notice: React.FC<NoticeProps> = ({ children, duration, status }) => {
    /** Use state. */
    const [notice, setNotice] = useState(true)

    /** Use effect. */
    useEffect(() => {
        /** Auto hide notification. */
        if (children) {
            const timer = setTimeout(() => {
                setNotice(false)
            }, duration)

            /** Set show message to true. */
            useNotification()

            return () => clearTimeout(timer)
        }
    }, [duration, children])

    /** Return something. */
    return (
        <>
            {notice && (
                <div className='fixed top-0 right-0 p-2 z-50 cursor-pointer animate-fade-left animate-once animate-ease-in'>
                    {status > 300 ? (
                        <p className='alert-danger text-xs'>
                            <span className='pr-2 text-red-700'>
                                <Icon id='notifications' width='w-4' height='h-4' />
                            </span>
                            {children}
                        </p>
                    ) : (
                        <p className='alert-success text-xs'>
                            <span className='pr-2 text-green-700'>
                                <Icon id='notifications' width='w-6' height='h-6' />
                            </span>
                            {children}
                        </p>
                    )}
                </div>
            )}
        </>
    )
}

export default Notice
