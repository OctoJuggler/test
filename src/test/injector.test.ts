import { injector, RegistryContext } from '../lib';
import { useTestHook } from './helpers/useTestHook';

jest.mock('../lib/context', () => {
    return {
        RegistryContext: {
            _currentValue: {
                getImplementation: jest.fn(),
            },
            _currentRenderer: {},
            _currentValue2: {
                getImplementation: jest.fn(),
            },
            _currentRenderer2: undefined,
        },
    };
});

const mockGetImplementation1 = RegistryContext._currentValue
    .getImplementation as jest.Mock;
const mockGetImplementation2 = RegistryContext._currentValue2
    .getImplementation as jest.Mock;

describe('injector', () => {
    beforeAll(() => {
        jest.resetAllMocks();
    });

    test('should use implementation provider from standard renderer', () => {
        const mockImplementation = jest.fn();
        mockGetImplementation1.mockImplementation((fn) => {
            return fn === useTestHook ? mockImplementation : undefined;
        });

        const [result] = injector(useTestHook);

        expect(result).toBe(mockImplementation);
    });

    test('should use implementation provider from second renderer 2', () => {
        const mockImplementation = jest.fn();
        mockGetImplementation1.mockImplementation((fn) => {
            return fn === useTestHook ? jest.fn() : undefined;
        });

        mockGetImplementation2.mockImplementation((fn) => {
            return fn === useTestHook ? mockImplementation : undefined;
        });

        jest.replaceProperty(RegistryContext, '_currentRenderer2', {});

        const [result] = injector(useTestHook);

        expect(result).toBe(mockImplementation);
    });
});
