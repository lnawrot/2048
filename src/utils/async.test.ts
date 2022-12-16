import { describe, expect, it, vi } from 'vitest';
import { delay, waitForEvent } from './async';

describe('async utils', () => {
  it('resolves when event is dispatched', async () => {
    const promise = waitForEvent('event');
    document.dispatchEvent(new Event('event'));

    await expect(promise).resolves.toBeUndefined();
  });

  it('resolves after given duration', async () => {
    vi.useFakeTimers();

    const promise = delay(500);
    vi.runAllTimers();

    await expect(promise).resolves.toBeUndefined();

    vi.resetAllMocks();
  });
});

