import './@types/react';
import { ImplementationProvider } from './registry';
import { RegistryContext } from './context';

export function injector<P1>(p1: P1): [P1];
export function injector<P1, P2>(p1: P1, p2: P2): [P1, P2];
export function injector<P1, P2, P3>(p1: P1, p2: P2, p3: P3): [P1, P2, P3];
export function injector<P1, P2, P3, P4>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4
): [P1, P2, P3, P4];
export function injector<P1, P2, P3, P4, P5>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5
): [P1, P2, P3, P4, P5];
export function injector<P1, P2, P3, P4, P5, P6>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6
): [P1, P2, P3, P4, P5, P6];
export function injector<P1, P2, P3, P4, P5, P6, P7>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7
): [P1, P2, P3, P4, P5, P6, P7];
export function injector<P1, P2, P3, P4, P5, P6, P7, P8>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7,
    p8: P8
): [P1, P2, P3, P4, P5, P6, P7, P8];
export function injector<P1, P2, P3, P4, P5, P6, P7, P8, P9>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7,
    p8: P8,
    p9: P9
): [P1, P2, P3, P4, P5, P6, P7, P8, P9];
export function injector<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10>(
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7,
    p8: P8,
    p9: P9,
    p10: P10
): [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10];

export function injector(...args: unknown[]): unknown[] {
    const implementationProvider: ImplementationProvider =
        (RegistryContext._currentRenderer2 && RegistryContext._currentValue2) ||
        (RegistryContext._currentRenderer && RegistryContext._currentValue);

    return args.map((value) => {
        const implementation = implementationProvider.getImplementation(value);
        return implementation !== undefined ? implementation : value;
    });
}
