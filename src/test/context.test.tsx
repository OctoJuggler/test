import React from 'react';
import { DiProvider } from '../lib/context';
import { render } from '@testing-library/react';
import { useTestHook } from './helpers/useTestHook';
import { injectable } from '../lib';
import { RootComponent } from './helpers/RootComponent';
import { ChildComponent } from './helpers/ChildComponent';

const MockTestHook = injectable(useTestHook, () => 'mocked hook');

const MockedChildComponent = injectable(ChildComponent, () => (
    <div>mocked child component</div>
));

describe('context', () => {
    test('should call mocked version', () => {
        const { getAllByText } = render(
            <DiProvider use={[MockTestHook]}>
                <RootComponent />
            </DiProvider>
        );
        const components = getAllByText('mocked hook');

        expect(components.length).toBeGreaterThan(0);
    });

    test('should not call mocked version', () => {
        const { getAllByText } = render(
            <DiProvider use={[]}>
                <RootComponent />
            </DiProvider>
        );

        const components = getAllByText('useTestHook');
        expect(components.length).toBeGreaterThan(0);
    });

    test('should call mocked child component', () => {
        const { getAllByText } = render(
            <DiProvider use={[MockedChildComponent]}>
                <RootComponent />
            </DiProvider>
        );

        const components = getAllByText('mocked child component');
        expect(components.length).toBeGreaterThan(0);
    });
});
