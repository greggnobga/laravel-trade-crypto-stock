/** Vendor. */
import { useState, useEffect } from 'react'

const Notice = ({ children, duration, status }) => {
    /** Use state. */
    const [notice, setNotice] = useState(true)

    /** Use effect. */
    useEffect(() => {
        /** Auto hide notification. */
        if (children) {
            const timer = setTimeout(() => {
                setNotice(false)
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [duration, children])

    /** Return something. */
    return (
        <>
            {notice && (
                <div className='rounded fixed top-0 right-0 m-2 cursor-pointer transition-all duration-1000 ease-in-out z-50'>
                    {status > 300 ? (
                        <p className='alert-danger text-xs '>{children}</p>
                    ) : (
                        <p className='alert-success text-xs'>{children}</p>
                    )}
                </div>
            )}
        </>
    )
}

export default Notice
