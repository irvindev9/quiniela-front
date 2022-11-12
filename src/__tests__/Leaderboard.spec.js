import { describe, it, expect, beforeEach, afterEach, vi, } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import Leaderboard from '../views/Leaderboard.vue';
import results from './mocks/leaderboard.js';
import { createTestingPinia } from '@pinia/testing';

vi.mock('../api/resultsRequests', () => ({
  getLeaderboard: () => Promise.resolve(results),
}));

describe('Leaderboard', () => {
  it('should have many players', async () => {
    const wrapper = mount(Leaderboard, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn })],
      },
    });

    await flushPromises();

    expect(wrapper.findAll('.player')).toHaveLength(3);
  });
});