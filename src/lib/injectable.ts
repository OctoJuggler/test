import { defaultRegistry } from './registry';

export const injectable = <D>(from: D, to: D): D => {
    defaultRegistry.registerImplementation(from, to);
    return from;
};
