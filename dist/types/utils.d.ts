export * from './utils/date';
export * from './utils/colors';
export * from './utils/dom';
export * from './utils/format';
export * from './utils/scroll';
export * from './utils/event';

// others utils
export function openURL(url: string): void;
export function debounce<F extends (...args: any[]) => any>(
  fn: F,
  wait?: number,
  immediate?: boolean
): F;
export function extend<R>(deep: boolean, target: any, ...sources: any[]): R;
export function extend<R>(target: object, ...sources: any[]): R;
export function throttle<F extends (...args: any[]) => any>(
  fn: F,
  limit: number
): F;
export function uid(): string;