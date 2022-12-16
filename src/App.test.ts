import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it } from 'vitest';
import App from './App.vue';
import { useBoardStore } from './stores/board';

describe('App.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initiates the board', async () => {
    render(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const board = useBoardStore();
    expect(board.init).toHaveBeenCalledOnce();
  });

  it('handles keyboard events and triggers board movement', async () => {
    const user = userEvent.setup();
    render(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const board = useBoardStore();

    await user.type(document.body, 'test');
    expect(board.handleMove).not.toHaveBeenCalled();

    await user.type(document.body, '{ArrowUp}');
    expect(board.handleMove).toHaveBeenCalledTimes(1);
    expect(board.handleMove).toHaveBeenLastCalledWith('ArrowUp');

    await user.type(document.body, '{ArrowRight}');
    expect(board.handleMove).toHaveBeenCalledTimes(2);
    expect(board.handleMove).toHaveBeenLastCalledWith('ArrowRight');
  });
});
