# Writing Unit Test for Clean Code

## Tasks - Unit test

1. Researching the importance of unit testing in software development.
    - Unit  testing  stands  as  a  cornerstone  of  modern  software  development  practices,  offering developers a systematic approach to ensure the correctness, reliability, and maintainability of their  code.  This  article  delves  into  the  significance  of  unit  tests  in  software  development, exploring their benefits, principles, best practices, and their transformative impact on the quality and agility of software projects.
    - The Importance of Unit Tests:
    Unit  tests  are  small,  automated  tests  designed  to  validate  the  behavior  of  individual  units  or components  of  code  in  isolation. By  isolating  units  of  code  and  testing  them independently, developers  can  identify  defects  early  in  the  development  cycle,  reduce debugging  time, and enhance code quality.
    The importance of unit tests can be summarized as follows:
    1. Early Bug Detection: Unit tests enable developers to catch bugs and regressions early in the development process, preventing them from propagating to subsequent stages and minimizing the cost of fixing defects.
    1. Code Confidence: Writing unit tests instills confidence in the correctness and behavior of code, allowing developers to make changes and refactor code with assurance that existing functionality remains intact.
    1. Improved Code  Quality:  Unit tests  promote  clean, modular,  and  maintainable code  by enforcing  design  principles  such  as  encapsulation,  loose  coupling,  and  single responsibility. Well-tested code tends to be more robust, readable, and extensible.
    1. Documentation: Unit tests serve as living documentation for code, providing executable specifications that describe the intended behavior of individual units. They enhance code comprehension and facilitate knowledge transfer among team members.
2. Choose a testing framework (e.g., Jest for JavaScript, PyTest for Python).
    Deciced to go with Jest for JavaScript with this experiment :
    ![Setup Jest](setup_test_tool.png)
3. Write a few unit tests for a function in your test repo.
    - Creating function :
    ![Creating JS function](function.png)
    - Creating Unit Test:
    ![Creating JS Unit testing](test_function.png)
    - Result of testing:
    ![Testing result](test_result.png)

## Reflection - Unit Test

1. How do unit test help keep code clean?
    - Protect behavior: When I refactor (e.g., change rounding), tests guard against accidental breakage.
    - Design pressure: Writing tests pushed me to validate inputs and split logic (subtotal, tax) clearly.
    - Documentation: Tests show expected use (valid arrays), edge cases (empty cart), and failure modes (invalid items).
2. What issues did you find while testing ?
    - I initially forgot to validate input shapes; tests for invalid items failed -> added `TypeError` checks.
    - Floating point precision needed explicit rounding to two decimals.
3. Takeaways
    - Small, focused tests catch real bugs early (type errors, rounding).
    - Clear contracts (throw on bad input) make the function safer to reuse
