import { Context, createContext } from 'react';

export interface ExtendedContext<T> extends Context<T> {
    _currentValue: T;
    _currentValue2: T;
    _currentRenderer: object;
    _currentRenderer2: object | null;
}

export const createExtendedContext = <T>(
    defaultValue: T
): ExtendedContext<T> => {
    const context: unknown = createContext(defaultValue);
    return context as ExtendedContext<T>;
};
