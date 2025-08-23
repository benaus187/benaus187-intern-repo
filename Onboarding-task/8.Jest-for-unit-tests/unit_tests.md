# Testing Redux with Jest

## Tasks

1. Research how to test Redux reducers and actions in Jest.
![Researching for test Redux](research_jest.png)

2. Create a simple Redux slice (if not already created).
![Setup environment for testing](setup_jest_environ.png)
![Setup environment for testing](setup_test_environ.png)

3. Write a test that checks if a reducer updates state correctly.
![setup test for counter](setup_test_slice.png)

4. Write a test for an asynchronous Redux action (if applicable).
![setup test for an asynchronous Redux](setup_jest_environ.png)

5. Run the tests and check that they pass.
![Result of test](test_jest.png)

## Reflection

1. What was the most challenging part of testing Redux?
The trickiest factor was working with asynchronous operations The thunks and async logic add some states such as pending, fulfilled and rejected, which complicate thunks and make them harder to test. These could be simulated without being able to make a hit to a real API by mocking or calling the thunk lifecycle actions yourself It took a weighing of options to only confirm the state changes we were really interested in as well as maintain the tests reputable and quick.

2. How do Redux tests differ from React component tests?
Redux tests target state changes- it checks that given an action, reducer returns the right new state. They do not normally make _any_ use of the DOM. In comparison to Jetpack Compose, the testing of React components is oriented on UI visualization and interaction. In those tests, they attach their components use the click or typing and assert what the user sees. Concisely, Redux tests will ensure the data logic is correct and React component tests ensure the user interface and behavior are correct.
