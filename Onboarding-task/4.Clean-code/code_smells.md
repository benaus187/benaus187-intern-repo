# Code Smells

## Research

    Code Smells are the traces in the code that indicates a deeper problem in the application or codebase. They are not bugs or errors but are tangible and observable violations of code design/development fundamentals that could eventually lead to poor code quality and technical debt. The code will still compile and perform as expected, but it may impede the development process and make the program vulnerable to performance and security issues in the future. Code smells indicate the underlying issues that lead to technical debt.

    A code smell is a surface indication that usually corresponds to a deeper problem in the system.
    - Martin Fowler

    So, these code smells require some in-depth investigation and often reveal some critical problems in the code that require immediate remediation. To identify code smells and fix the underlying problem, it's imperative to know in detail the different types of code smells and the best practices to avoid them. In this blog, we'll cover all the key topics concerning code smells:

## Task

1. Magic Numbers & Strings – Using hardcoded values instead of constants.
   - Code smell :
     // function calcTotal(price) {
     const tax = price \* 0.1; // 0.1 is a magic number
     return price + tax +4.99; // 4.99 is a magic number
     }
   - Refactor the code :
     const TAX_RATE = 0.10;
     const SHIPPING_FEE = 4.99;
     function calcTotal(price) {
     const tax = price \* TAX_RATE;
     return price + tax + SHIPPING_FEE;
     }
2. Long Functions – Functions that do too much and should be broken into smaller parts.
   - Code smell :
     // checkout.js
     async function checkout(cart, user) {
     // validate
     if (!user || cart.length === 0) throw new Error('Bad request');
     // totals
     let subtotal = 0;
     for (const item of cart) subtotal += item.price*item.qty;
     const tax = subtotal*0.1;
     const total = subtotal + tax;
     // payment
     const token = await getPaymentToken(user.id);
     const charged = await charge(token, total);
     if (!charged.ok) throw new Error('Payment failed');
     // fulfillment
     await createOrder(user.id, cart, total);
     await sendEmail(user.email, 'Thanks!');
     return { total };
     }
   - Refactor the code :
     // checkout.js
     const TAX_RATE = 0.10;

     const validate = (cart, user) => {
     if (!user || cart.length === 0) throw new Error('Bad request');
     };

     const calcTotal = (cart) => {
     const subtotal = cart.reduce((s, i) => s+i.price*i.qty, 0);
     return subtotal+subtotal*TAX_RATE;
     };

     const takePayment = async (userId, total) => {
     const token = await getPaymentToken(userId);
     const charged = await charge(token, total);
     if (!charged.ok) throw new Error('Payment failed');
     };

     const fulfill = (user, cart, total) =>
     Promise.all([createOrder(user.id, cart, total), sendEmail(user.email, 'Thanks!')]);

     export async function checkout(cart, user) {
     validate(cart, user);
     const total = calcTotal(cart);
     await takePayment(user.id, total);
     await fulfill(user, cart, total);
     return { total };
     }

3. Duplicate Code – Copy-pasting logic instead of reusing functions.
   - Code smell :
     // filters.js
     function activeTodos(todos) { return todos.filter(t => !t.done); }
     function activeNotes(notes) { return notes.filter(n => !n.archived); } // similar logic everywhere
   - Refactor the code :
     // filters.js
     const by = (pred) => (arr) => arr.filter(pred);

     export const activeTodos = by(t => !t.done);
     export const activeNotes = by(n => !n.archived);

4. Large Classes (God Objects) – Classes that handle too many responsibilities.
   - Code smell :
     // AppManager.js
     class AppManager {
     constructor(api){ this.api = api; this.state = { theme:'light', cart:[] }; }
     setTheme(t){ this.state.theme = t; localStorage.setItem('theme', t); }
     addToCart(p){ this.state.cart.push(p); this.api.track('add', p.id); }
     removeFromCart(id){ this.state.cart = this.state.cart.filter(p => p.id !== id); }
     async sync(){ await this.api.post('/sync', this.state); }
     // ...more unrelated responsibilities...
     }
   - Refactor the code :
     // ThemeService.js
     export const Theme = {
     get: () => localStorage.getItem('theme') ?? 'light',
     set: (t) => localStorage.setItem('theme', t),
     };

     // CartService.js
     export const Cart = {
     add: (cart, p) => [...cart, p],
     remove: (cart, id) => cart.filter(p => p.id !== id),
     };

     // SyncService.js
     export const Sync = (api) => ({
     push: (state) => api.post('/sync', state),
     });

5. Deeply Nested Conditionals – Complex if/else trees that make code harder to follow.
   - Code smell :
     // access.js
     function canAccess(user, doc) {
     if (user) {
     if (user.role === 'admin') return true;
     if (doc) {
     if (doc.ownerId === user.id) return true;
     if (doc.isPublic) return true;
     }
     }
     return false;
     }
   - Refactor the code :
     // access.js
     const isAdmin = (u) => u?.role === 'admin';
     const isOwner = (u, d) => !!u && !!d && d.ownerId === u.id;
     const isPublic = (d) => !!d?.isPublic;

     export const canAccess = (u, d) => isAdmin(u) || isOwner(u, d) || isPublic(d);

6. Commented-Out Code – Unused code that clutters the codebase.
   - Code smell :
     // api.js
     export async function fetchUser(id) {
     // const cached = localStorage.getItem('user:'+id); // old cache
     // if (cached) return JSON.parse(cached);
     const res = await fetch(`/api/users/${id}`);
     return res.json();
     }
   - Refactor the code :
     // api.js
     export async function fetchUser(id) {
     const res = await fetch(`/api/users/${id}`);
     return res.json();
     }
7. Inconsistent Naming – Variable names that don't clearly describe their purpose.
   - Code smell :
     // cartHelpers.js
     function add_item(a, p) { return [...a, p]; }
     function removeItemFromArr(arr, productID) { return arr.filter(x => x.id !== productID); }
   - Refactor the code :
     // cartHelpers.js
     function add_item(a, p) { return [...a, p]; }
     function removeItemFromArr(arr, productID) { return arr.filter(x => x.id !== productID); }

## Reflection

1. What code smells did you find in your code?
   I found magic numbers/strings (hardcoded rates), long functions (checkout flow doing validation, totals, payment, fulfillment), duplicate filtering logic, a “God” class, nested conditionals for access control, commented‑out code, and inconsistent naming.
2. How did refactoring improve the readability and maintainability of the code?
   - Withdrawal of constants eliminated lurking assumptions.
   - Rocking the long one into small units rendered each of those concerns to be testable and reusable.
   - The elimination of the duplication using a single abstraction avoids drift and cuts down repairs to a single location.
   - A division of the large class into services reduced coupling.
   - The small-predicate flattening of conditionals made them more legible.
   - Removal of commented-out lines revealed the behavior at hand.
   - Making APIs predictable was achieved by normalizing the names (verb - object).
3. How can avoiding code smells make future debugging easier ?
   A clear demarcation and smaller independent functionalities enables me to have logs or even unit tests in any particular location. In case something is broken, then it is quicker to determine the failing component ( e.g. calcTotal vs. takePayment). Resolving duplication and naming things consistently decrease the probability of overcoming one location and making out the twin.
