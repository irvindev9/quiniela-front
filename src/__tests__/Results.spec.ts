/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import Results from '../views/Results.vue'
import * as quinielaRequests from '../api/quinielaRequests'
import * as resultsRequests from '../api/resultsRequests'

describe('Results.vue - Quinielas states', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockWeeks = [
    {
      id: 1,
      name: 'Semana 1',
      end_date: '2099-12-31 23:59:59', // Future date -> unrevealed / !isActive
      is_forced_open: 0
    }
  ]

  const mockMatches = [
    {
      id: 101,
      team_1: { id: 1, name: 'Team A', logo: 'team_01.png' },
      team_2: { id: 2, name: 'Team B', logo: 'team_02.png' },
      winner_id: null
    },
    {
      id: 102,
      team_1: { id: 3, name: 'Team C', logo: 'team_03.png' },
      team_2: { id: 4, name: 'Team D', logo: 'team_04.png' },
      winner_id: null
    }
  ]

  const mockResults = [
    {
      id: 1,
      name: 'User With Quiniela',
      points: 0,
      team_id: 1,
      img: '',
      results: [
        { id: 1, match_id: 101, team_id: 1 },
        { id: 2, match_id: 102, team_id: 3 }
      ]
    },
    {
      id: 2,
      name: 'User Without Quiniela',
      points: 0,
      team_id: 2,
      img: '',
      results: []
    }
  ]

  it('renders distinctive submitted and not-submitted chips when results are not yet revealed', async () => {
    vi.spyOn(quinielaRequests, 'getWeeks').mockResolvedValue(mockWeeks as any)
    vi.spyOn(resultsRequests, 'getMatchs').mockResolvedValue(mockMatches as any)
    vi.spyOn(resultsRequests, 'getResults').mockResolvedValue(mockResults as any)

    const wrapper = mount(Results, {
      global: {
        plugins: [createPinia()]
      }
    })
    await flushPromises()

    // Week is in the future and not forced open, so isActive should be false
    expect(wrapper.find('tfoot').text()).toContain('resultados aún no disponibles')
    expect(wrapper.find('.results-legend').exists()).toBe(true)
    expect(wrapper.text()).toContain('Pronóstico enviado')
    expect(wrapper.text()).toContain('Sin pronóstico')

    // Find table rows for users
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)

    // User 1 (submitted) should have .submitted chips with bi-check-lg icon
    const user1Chips = rows[0].findAll('.pick-chip')
    expect(user1Chips.length).toBe(2)
    expect(user1Chips[0].classes()).toContain('submitted')
    expect(user1Chips[0].find('.bi-check-lg').exists()).toBe(true)
    expect(user1Chips[1].classes()).toContain('submitted')
    expect(user1Chips[1].find('.bi-check-lg').exists()).toBe(true)

    // User 2 (not submitted) should have .not-submitted chips with bi-x-lg icon
    const user2Chips = rows[1].findAll('.pick-chip')
    expect(user2Chips.length).toBe(2)
    expect(user2Chips[0].classes()).toContain('not-submitted')
    expect(user2Chips[0].find('.bi-x-lg').exists()).toBe(true)
    expect(user2Chips[1].classes()).toContain('not-submitted')
    expect(user2Chips[1].find('.bi-x-lg').exists()).toBe(true)
  })

  it('renders team logos when week results are revealed', async () => {
    const pastWeeks = [
      {
        id: 1,
        name: 'Semana 1',
        end_date: '2020-01-01 00:00:00', // Past date -> revealed / isActive
        is_forced_open: 0
      }
    ]

    vi.spyOn(quinielaRequests, 'getWeeks').mockResolvedValue(pastWeeks as any)
    vi.spyOn(resultsRequests, 'getMatchs').mockResolvedValue(mockMatches as any)
    vi.spyOn(resultsRequests, 'getResults').mockResolvedValue(mockResults as any)

    const wrapper = mount(Results, {
      global: {
        plugins: [createPinia()]
      }
    })
    await flushPromises()

    expect(wrapper.find('tfoot').text()).toContain('resultados disponibles')
    const rows = wrapper.findAll('tbody tr')

    // User 1 should have <img> with team logos
    const user1Images = rows[0].findAll('.pick-chip img')
    expect(user1Images.length).toBe(2)

    // User 2 has no picks, should show pending "?"
    const user2Pending = rows[1].findAll('.pick-chip.pending')
    expect(user2Pending.length).toBe(2)
    expect(user2Pending[0].text()).toBe('?')
  })
})
