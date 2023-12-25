import React from 'react';
import { injector } from '../../lib';
import { useTestHook as useHookDefault } from './useTestHook';
import { ChildComponent as DefaultChildComponent } from './ChildComponent';

export const RootComponent = () => {
    const [useTestHook, ChildComponent] = injector(
        useHookDefault,
        DefaultChildComponent
    );

    const value = useTestHook();

    return <ChildComponent value={value} />;
};
