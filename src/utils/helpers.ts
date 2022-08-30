import { nanoid } from 'nanoid';

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    return setTimeout(() => resolve(), ms);
  });
}

export function generateID(): string {
  return nanoid(8);
}
