/** Global typescript variable. */
import { AxiosStatic } from 'axios';

declare global {
    const axios: AxiosStatic;
}
