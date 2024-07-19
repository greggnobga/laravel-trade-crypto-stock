import axios, { AxiosError } from 'axios';

/** Type guard to check if error is an axios error */
export function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}
