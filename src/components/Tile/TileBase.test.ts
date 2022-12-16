import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import TileBase from './TileBase.vue';

describe('TileBase.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders tile on given position', async () => {
    const { container, rerender } = render(TileBase, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        x: 1,
        y: 1,
      },
    });

    const tile = container.querySelector('div')!;
    expect(tile).toBeDefined();
    expect(tile.style).toHaveProperty('transform');
    expect(tile.style.transform).toEqual('translate(100%, 100%)');

    await rerender({
      x: 3,
      y: 5,
    });

    expect(tile.style.transform).toEqual('translate(300%, 500%)');
  });
});
