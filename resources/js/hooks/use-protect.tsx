/** Vendor. */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/** Hook. */
import { useAppSelector } from '$lib/hooks/use-rtk'

const useProtect = () => {
    /** Use selector. */
    const auth = useAppSelector((state) => state.auth)
    const { access_token } = auth

    /** Use navigate. */
    const navigate = useNavigate()

    /** Use effect. */
    useEffect(() => {
        /** Check if access token is set.ß */
        if (access_token) {
            navigate('/dashboard')
        } else {
            navigate('/auth/login')
        }
    }, [access_token])
}
export default useProtect
