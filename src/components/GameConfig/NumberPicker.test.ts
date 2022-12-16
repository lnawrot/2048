import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import NumberPicker from './NumberPicker.vue';

describe('NumberPicker.vue', () => {
  it('renders given range of numbers and emits on change', async () => {
    const user = userEvent.setup();

    const { emitted } = render(NumberPicker, {
      props: {
        min: 2,
        max: 4,
        current: 3,
      },
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();

    screen.getByText('2');
    screen.getByText('3');
    screen.getByText('4');

    await user.click(screen.getByText('2'));
    await user.click(screen.getByText('4'));
    expect(emitted()).toHaveProperty('change');
    expect(emitted('change')).toEqual([[2], [4]]);
  });
});
