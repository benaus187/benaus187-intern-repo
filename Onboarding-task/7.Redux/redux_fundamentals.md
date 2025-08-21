# Using Selectors in Redux Toolkit

## Task - Redux Toolkit

1. Create a selector function to get the current counter value from Redux.
![Create selector](selector.png)
![Create Counterslice](counterslice.png)
![Create store](store.png)

2. Use useSelector to access the counter value in multiple components.
![Using useSelector](header.png)
![Using useSelector](counterview.png)

3. Modify the app to display different messages based on the counter value.
![Running app](test_redux1.png)
![Running app](test_redux2.png)

## Reflection - Redux Toolkit

1. What are the benefits of using selectors instead of directly accessing state?

1. Encapsulation and Abstraction

- Selectors act as a single source of truth for how a piece of state should be read.
- Components don’t need to know the exact shape of the Redux store; they just use the selector. If the state shape changes later, only the selector needs updating, not every component.

1. Reusability

- A selector function can be reused across multiple components.
- This avoids repeating state.counter.value (or similar) in different places.

1. Maintainability and Readability

- Code becomes easier to read since selectors have descriptive names (e.g., selectCounterValue) instead of raw property chains.
- Makes the intent of the code clearer.

1. Testability

- Selectors are pure functions, so they can be unit-tested independently of components.
- This increases confidence that the state access logic is correct.

1. Performance (with memoized selectors)

- Libraries like Reselect let selectors memoize their results.
- This prevents unnecessary re-renders by only recalculating derived data when inputs actually change.
