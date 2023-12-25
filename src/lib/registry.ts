export interface ImplementationProvider {
    getImplementation<D>(from: D): D | undefined;
}

export interface DiRegistry extends ImplementationProvider {
    registerImplementation<D>(from: D, to: D): void;
    unregisterImplementation<D>(from: D): void;
}

export class DefaultRegistry implements DiRegistry {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private registry: WeakMap<any, any>;

    constructor() {
        this.registry = new WeakMap();
    }
    registerImplementation = <D>(from: D, to: D) => {
        this.registry.set(from, to);
    };

    unregisterImplementation = <D>(from: D): void => {
        this.registry.delete(from);
    };

    getImplementation = <D>(from: D): D | undefined => {
        return this.registry.has(from) ? this.registry.get(from) : undefined;
    };
}

export const defaultRegistry = new DefaultRegistry();
