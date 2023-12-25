import { defaultRegistry } from '../lib/registry';
import { injectable } from '../lib';
import { useTestHook } from './helpers/useTestHook';

jest.mock('../lib/registry', () => {
    return {
        defaultRegistry: {
            registerImplementation: jest.fn(),
        },
    };
});

const mockRegisterImplementation =
    defaultRegistry.registerImplementation as jest.Mock;

describe('injectable', () => {
    test('should register implementation', () => {
        const mockImplementation = jest.fn();
        const result = injectable(useTestHook, mockImplementation);

        expect(result).toBe(useTestHook);
        expect(mockRegisterImplementation).toBeCalledWith(
            useTestHook,
            mockImplementation
        );
    });
});
