/** Interface action. */
export interface Action<T = any> {
    type: T;
    payload?: T;
}
