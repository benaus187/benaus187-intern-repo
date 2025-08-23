import { render, screen, waitFor } from '@testing-library/react'
import Todos from './Todos'

// Mock the module that the component imports
jest.mock('../lib/api', () => ({
  getTodos: jest.fn(),
}))

import { getTodos } from '../lib/api'

describe('Todos (module-mocked)', () => {
  it('renders list when API succeeds', async () => {
    getTodos.mockResolvedValueOnce([
      { id: 1, title: 'Buy milk' },
      { id: 2, title: 'Ship code' },
      { id: 3, title: 'Take a break' },
    ])

    render(<Todos />)

    // loading first
    expect(screen.getByLabelText('status').textContent).toMatch(/Loading/i)

    // then items appear
    await waitFor(() => {
      expect(screen.getByText('Buy milk')).toBeInTheDocument()
      expect(screen.getByText('Ship code')).toBeInTheDocument()
      expect(screen.getByText('Take a break')).toBeInTheDocument()
    })
  })

  it('renders error when API fails', async () => {
    getTodos.mockRejectedValueOnce(new Error('boom'))

    render(<Todos />)

    expect(screen.getByLabelText('status').textContent).toMatch(/Loading/i)

    await waitFor(() => {
      expect(screen.getByText(/Error: boom/i)).toBeInTheDocument()
    })
  })
})
