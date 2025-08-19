# React Fundamental

## Navigation with React Router

### Task - react router

1. Install React Router and set up a basic routing system.
![Setup Router](setup_router.png)

2. Create two pages: Home.js and Profile.js.
![Setup Router](setup_router3.png)
![Setup Router](setup_router4.png)

3. Add navigation between the two pages (e.g., using Link or useNavigate).
![Setup Router](setup_router2.png)
![result router](test_router1.png)
![result router](test_router2.png)

### Reflection - react router

1. What are the advantages of client-side routing?

With client-side routing, the changes in UI do not have to reload the entire page on the server side. This enhances performance in that only the dynamic portions of the page are re-rendered. It makes the user experience smoother, as well, because the navigation is instant and closer to a desktop application. The other advantage is state persistence state data in memory (such as form input or react state) is never reset as one switches pages (as it would happen in conventional server-side navigation where an additional request to the server asks it to reset the page). Advanced routing also includes additional route navigation logic (e.g., access protection, conditionals) that can be implemented within a programming language, and is no longer forced to depend only on server routes.
