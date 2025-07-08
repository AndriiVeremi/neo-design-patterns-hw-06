// Декоратор для додавання timestamp
export function withTimestamp(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const now = new Date();
    const timestamp = `[${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    args[0] = `${timestamp} ${args[0]}`;
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// Декоратор для перетворення в верхній регістр
export function uppercase(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    args[0] = (args[0] as string).toUpperCase();
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
