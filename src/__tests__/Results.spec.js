import { mount } from '@vue/test-utils'
import Results from '../views/Results.vue'

jest.mock('../api/resultsRequests.ts', () => {
  return {
    getResults: () => {
      return Promise.resolve({
        data: {
          results: []
        }
      })
    },

    getMatchs: () => {
      return Promise.resolve({
        data: {
          matchs: []
        }
      })
    }
  }

});

jest.mock('../api/quinielaRequests.ts', () => {
  return {
    getWeeks: () => {
      return Promise.resolve({
        data: {
          weeks: []
        }
      })
    }
  }
});

describe('Results.vue', () => {
  it('Mounted', () => {
    const wrapper = mount(Results);
    //check if the component is mounted
    expect(wrapper.exists()).toBe(true);
  });
});