import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Greeting from './Greeting'

describe('Greeting', () => {
  test('renders the message', () => {
    render(<Greeting name="Focus Bear" />)
    // assert by role/label (behavior, not implementation)
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent('Hello, Focus Bear!')
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/clicks/i)).toHaveTextContent('Clicks: 0')
  })

  test('increments counter on click (user interaction)', async () => {
    const user = userEvent.setup()
    render(<Greeting />)

    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    await user.click(button)

    // UI reflects interaction
    expect(screen.getByLabelText(/clicks/i)).toHaveTextContent('Clicks: 2')
  })
})
