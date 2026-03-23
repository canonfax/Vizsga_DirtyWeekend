"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClass = LogClass;
exports.LogMethod = LogMethod;
function LogClass(prefix = "Log") {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                console.info(`[${prefix}] ${constructor.name} példány létrehozva.`);
                super(...args);
            }
        };
    };
}
function LogMethod(_target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`[Method:${propertyKey}] hívás ${JSON.stringify(args, null, 2)}`);
        return originalMethod.apply(this, args);
    };
}
