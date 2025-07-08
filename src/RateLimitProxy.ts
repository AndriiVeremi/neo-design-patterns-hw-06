import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  wrappee: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(wrappee, {
    get(target, prop) {
      if (prop === 'send') {
        return (message: string) => {
          const now = Date.now();
          if (now - lastCallTime < intervalMs) {
            console.log('[RateLimit] skipped');
          } else {
            lastCallTime = now;
            target.send(message);
          }
        };
      }
      return (target as any)[prop];
    },
  });
}