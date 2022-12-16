export function delay(duration = 250) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

export function waitForEvent(name: string) {
  return new Promise<void>((resolve) => document.addEventListener(name, () => resolve(), { once: true }));
}
