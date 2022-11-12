import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import MiQuiniela from '../views/MiQuiniela.vue';
import { createTestingPinia } from '@pinia/testing';
import quinielaWeeks from './mocks/miquiniela/quinielaWeeks.js';
import quinielaWeek from './mocks/miquiniela/quinielaWeek.js';

vi.mock('../api/quinielaRequests', () => ({
  getQuiniela : () => Promise.resolve(quinielaWeek),
  getWeeks : () => Promise.resolve(quinielaWeeks)
}));

describe('MiQuiniela', () => {
  it('should have many plays', async () => {
    const wrapper = mount(MiQuiniela, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn })],
      },
    });

    await flushPromises();

    expect(wrapper.findAll('.match')).toHaveLength(15);
  });
});