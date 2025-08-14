# Clean Code

## Writing Unit Test for Clean Code

### Tasks - Unit test

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

### Reflection - Unit Test

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

## Handling Errors & Edge Cases

### Task - handling error

1. Research strategies for handling errors and edge cases in code (include Guard Clauses)
    - A guard clause is a technique derived from the fail-fast method whose purpose is to validate a condition and immediately stop the code execution if the condition is not met by throwing a meaningful error instead of leaving the program to throw a deeper and less meaningful error.
    - Code quality assumes a hard challenge of considering very many scenarios, especially with edge cases and error handling. When working with Copilot or coding manually, it is important for the developer to think of solutions meant to accept expected inputs and unexpected ones. That includes error handling, edge case processing, and general robustness of the code.
    - There are few steps to work through to ensuring suggestions include edge cases and error handling:
    1. Identify common edge case.
    2. Leverage defensive programming pratices.
    3. Improve error handling mechanism.
    4. Test for edge cases.
    5. Refine suggestions using linting and code review.
2. Find an existing function that doesn't properly handle errors or invalid inputs
    Here is one of the function from my previous application :
    ![Previous code](checkout_before.png)
    Problems:
    - No validation for productId/quantity (NaN, negative, huge values).
    - No network error handling (fetch failures throw and crash the event handler).
    - Assumes response is always JSON.
    - No early user feedback (spinner/disable) if the request is in-flight.
3. Refactor the function to improve error handling
    Here is the code after refactoring :
    ![After refactoring](checkout_after1.png)
    ![After refactoring](checkout_after2.png)

### Reflection - handling error

1. What was the issue with the original code?
    - Bug in original code: updateQuantity and handlePayNow made the assumptions that input was good and the network calls was successful. They did not validate quantity/product IDs, did not detect network errors and added the assumption that the response was always JSON. That might lead to crashes or silent failures that have confusing UX.
    - The changes to what I made: I introduced guard clauses to scrutinize the input and terminate with a clear message early. I then wrapped network calls in a try/catch, and included a little fetchJson helper with a timeout and safe JSON parsing and then showed informative error messages to the user.
2. How does handling errors improve reliability ?
    - How this increases reliability: Guard clauses ensure that happy‑path code remains uncluttered and that invalid states cannot occur sooner. Effective error catching will avoid crashing, provide a user with immediate, actionable feedback, and is also easier to debug/break down (ex: HTTP status vs invalid JSON vs, timeout).
    - Outcome: The module now fails quickly when given bad input, it gracefully recovers after some network problems and gives predictable messages- which make it more robust and the user more willing to trust it.

## Commenting & Documentation

### Tasks - Commenting

1. Research best practices for writing comments and documentation.
    - Explain the “why”, not the “what”: Code shows what it does; comments capture intent, trade‑offs, links to tickets/specs, and non‑obvious constraints.
    - Document contracts: Inputs/outputs, error cases, units, invariants, side effects, performance assumptions.
    - Keep comments close to code and update them when code changes (stale comments are worse than none).
    - Prefer self‑documenting code: good names, small functions, clear types; add comments only where names can’t carry the meaning.
    - Use consistent format: JSDoc (TS/JS), docstrings (Python), etc. Include examples for tricky functions.
    - Flag surprises: workarounds, TODOs with owner + issue link, security/privacy caveats.
2. Find and example of poorly commented code and rewrite the comments to be more useful
    - Example of poorly commented code :
        // increase x
        // loop stuff
        function calc(a: number, b: number) {
        let x = a + b
        for (let i = 0; i < 100; i++) {
            x += i
        }
        return x // return result
        }
    - Rewrite the comments to be more useful :
        /**
            Computes a base sum and adds a triangular offset.
            Why:
            - Used by the budgeting screen to apply a fixed offset equal to sum(0..N-1).
            Contracts:
            - a, b are integers (can be negative).
            - N defaults to 100; change with env var `OFFSET_N` if needed.
        */
            export function sumWithOffset(a: number, b: number, N = Number(process.env.OFFSET_N ?? 100)) {
            const base = a + b
            // Triangular number T_(N-1) = N*(N-1)/2 (faster than a loop)
            const offset = (N * (N - 1)) / 2
            return base + offset
            }

### Reflection - Commenting

1. When should you add comments?
    - Non-obvious intent or domain rules ("VAT applies only if ...").
    - Workarounds/tech debt with a link to an issue (e.g. //TODO(owner): fix#123).
    - Security, performance, or numerical vaceats (e.g., rounding, timezone).
    - Public or shared APIs (parameters, return values, error modes, examples).
2. When should you avoid comments and instead improve the code?
    - When a better name or smaller function makes the comment redundant.
    - When the comment repeats code ("increment i by 1").
    - WHen comments would mask a design smell-refactor first.

## Refactoring Code for Simplicity

### Task - refactoring code

1. Research common refactoring techniques.

- There are 7 code refactoring techniques in Software Engineering:
    1. Red-Green Refactoring.
    2. Refactoring by Abstraction.
    3. Composing Method.
    4. Simplifying Methods.
    5. Moving Features between Objects.
    6. Preparatory Refactoring.
    7. User Interface Refactoring.

1. Find an example of overly complicated code in an existing project (or write your own)
    // cart-old.js
        function checkout(cart, taxRate, discountCode) {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            if (!item || !item.price || !item.quantity) continue; // silent skip
            total += item.price*item.quantity;
        }
        // discount + tax mixed together
        if (discountCode === 'WELCOME10') total*=0.9;
        if (discountCode === 'VIP20') total*=0.8;
        const tax = total*(taxRate || 0.1);
        total += tax;
        return '$' + total.toFixed(2);
        }
1. Refactor it to make it simpler and more readable
    // cart.js
        /**
        *@typedef {Object} CartItem
        *@property {number} product_id
        *@property {string} name
        *@property {number} price
        *@property {number} quantity
        */

        /** Guard: validate one item */
        function validateItem(item) {
        if (!item) throw new Error('Item is required');
        if (typeof item.price !== 'number' || item.price < 0) {
            throw new Error(`Invalid price for ${item.name || 'item'}`);
        }
        if (!Number.isInteger(item.quantity) || item.quantity < 0) {
            throw new Error(`Invalid quantity for ${item.name || 'item'}`);
        }
        }

        /** Pure: line total */
        function lineTotal(item) {
        validateItem(item);
        return item.price * item.quantity;
        }

        /** Pure: sum of line totals */
        function cartSubtotal(cart) {
        if (!Array.isArray(cart)) throw new Error('Cart must be an array');
        return cart.reduce((sum, it) => sum + lineTotal(it), 0);
        }

        /** Pure: apply known discounts */
        function applyDiscount(subtotal, code) {
        const codes = {
            WELCOME10: 0.10,
            VIP20: 0.20,
        };
        const pct = codes[code] || 0;
        return subtotal * (1 - pct);
        }

        /** Pure: tax */
        function calcTax(amount, taxRate) {
        const rate = typeof taxRate === 'number' ? taxRate : 0.10;
        if (rate < 0) throw new Error('Tax rate cannot be negative');
        return amount * rate;
        }

        /** Format money */
        function formatCurrency(n) {
        return `$${n.toFixed(2)}`;
        }

        /**
        * End-to-end calculator (still pure)
        * @param {CartItem[]} cart
        * @param {Object} opts
        * @param {number} [opts.taxRate]
        * @param {string} [opts.discountCode]
        */
        function calculateTotal(cart, { taxRate, discountCode } = {}) {
        const subtotal = cartSubtotal(cart);
        const discounted = applyDiscount(subtotal, discountCode);
        const tax = calcTax(discounted, taxRate);
        const grandTotal = discounted + tax;

        return {
            subtotal,
            discounted,
            tax,
            total: grandTotal,
            display: formatCurrency(grandTotal),
        };
        }

        // Example usage:
        const cart = [
        { product_id: 1, name: 'Notebook', price: 4.5, quantity: 3 },
        { product_id: 2, name: 'Pen',      price: 1.2, quantity: 5 },
        ];

        try {
        const result = calculateTotal(cart, { taxRate: 0.1, discountCode: 'WELCOME10' });
        console.log(result.display); // -> "$14.58" (example)
        } catch (err) {
        console.error('Checkout error:', err.message);
        };

### Reflection - refactoring code

1. What made the original code complex?
    The initial code had all sorts of problems that rendered it difficult to maintain:
    - Long function has split duties.
    - Deeply nested conditionals that made the conditionals very difficult to read.
    - Redundant code in two locations.
    - Strings and magic numbers which complicated the reading of the code.
    - Lack of sufficiently split concerns, where all the UI logic, calculations and data manipulation are the same function.
    This complicated debugging, the likelihood of the bugs during change, and the slowness of development.
2. How did refactoring improve it?
    - Readability: Functions were smaller with pertinent names and the flow of text more consumable.
    - Maintainability: It is possible to make changes only staying at one point and keep them not related.
    - Testability: The ability to test units within logic in a more focused manner, this became much easier because it was divided into smaller units.
    - Scalability: Being able to have a neat division between UI and business logic eases the work of extending the app.
