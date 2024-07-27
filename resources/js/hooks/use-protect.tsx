/** Vendor. */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk'

/** Action. */
import { validateRequest } from '$lib/store/feature/user/auth-slice'

const useProtect = () => {
    /** Use selector. */
    const auth = useAppSelector((state) => state.auth)
    const { access_token, valid } = auth

    /** Use navigate. */
    const navigate = useNavigate()

    /** Use dispatch. */
    const dispatch = useAppDispatch()

    /** Use effect. */
    useEffect(() => {
        /** If acces token is set, send dispatch to validate. */
        if (access_token) {
            dispatch(validateRequest({ token: access_token }))
        }

        /** Check if access token is set. */
        if (access_token && valid) {
            navigate('/dashboard')
        } else {
            navigate('/auth/login')
        }
    }, [access_token, valid])
}
export default useProtect
