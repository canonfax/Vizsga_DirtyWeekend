export function LogClass(prefix = "Log") {
    return function <T extends { new (...args: any[]): {} }>(constructor:T) {
        return class extends constructor {
            constructor(...args: any[]) {
                console.info(`[${prefix}] ${constructor.name} példány létrehozva.`);
                super(...args);
            }
        };
    };
}

export function LogMethod(
    _target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
        console.log(
            `[Method:${propertyKey}] hívás ${JSON.stringify(args, null, 2)}`
        );
        return originalMethod.apply(this, args);
    };
}