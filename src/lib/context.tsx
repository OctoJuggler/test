import React, { FC, ReactNode, useContext, useEffect, useMemo } from 'react';
import { defaultRegistry, ImplementationProvider } from './registry';
import { createExtendedContext, ExtendedContext } from './utils';

export const RegistryContext: ExtendedContext<ImplementationProvider> =
    createExtendedContext<ImplementationProvider>(defaultRegistry);

export type Props = {
    use: Array<unknown>;
    children: ReactNode;
};

export const DiProvider: FC<Props> = ({ use, children }) => {
    const registry = useContext(RegistryContext);

    const implementationProvider =
        useMemo<ImplementationProvider>((): ImplementationProvider => {
            const map: Map<unknown, unknown> = use.reduce(
                (acc: Map<unknown, unknown>, current) => {
                    const implementation = registry.getImplementation(current);
                    if (implementation) {
                        acc.set(current, implementation);
                    }
                    return acc;
                },
                new Map()
            );

            return {
                getImplementation: <D,>(token: D): D | undefined => {
                    return map.get(token) as D;
                },
            };
        }, [registry, use]);

    useEffect(() => {
        return () => {
            use.forEach(defaultRegistry.unregisterImplementation);
        };
    });

    return (
        <RegistryContext.Provider value={implementationProvider}>
            {children}
        </RegistryContext.Provider>
    );
};
