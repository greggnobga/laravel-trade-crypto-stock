/** Vendor. */
import { useEffect } from 'react';

/** Hook. */
import { useAppDispatch, useAppSelector } from '$lib/hooks/use-rtk';

/** Action. */
import { validateRequest } from '$lib/store/feature/user/auth-slice';

const useProtect = () => {
    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { access_token } = auth;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** If acces token is set, send dispatch to validate. */
        if (access_token) {
            dispatch(validateRequest({ token: access_token }));
        }
    }, [access_token]);
};
export default useProtect;
