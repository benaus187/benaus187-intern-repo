import { add } from './add'

describe('add', () => {
  it('adds positive numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('handles strings that look like numbers', () => {
    expect(add('2', '8')).toBe(10)
  })

  it('adds negatives', () => {
    expect(add(-4, -6)).toBe(-10)
  })
})
