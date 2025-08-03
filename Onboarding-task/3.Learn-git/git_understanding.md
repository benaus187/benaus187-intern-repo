# Git Understanding 
## Pull Request 
1. Research what a Pull Request (PR) is and why it’s used ?
    A Pull Request (PR) is a mechanism in version control systems, like Git, that allows developers to propose changes to a codebase and have those changes reviewed before they are integrated into the main branch. It's essentially a formal request to "pull" changes from one branch into another, typically from a feature branch into the main or develop branch. 
2. Why are PRs important in a team workflow?
    The importance of Pull Requests (PRs) is that they:  
    - Before merging to the main branch, the team members should be allowed to review changes. 
    - Peers review to help identify bugs or errors at an early stage. 
    - Have a documented discussion on what the change is, make comments, suggestions and approvals. 
    - This keeps the main branch clean and stable by containing features or bug fixes in their own branches.
3. What makes a well-structured PR?
    An effective PR will have:  
    - Descriptive title that explains what the expected outcome is e.g., “Clean up Virtual Instances from id map” is a title in the React PR. 
    - Minute level of details description- what the PR is doing and why the change is required. 
    - Minor, narrowed down updates, which are also simpler to check and chances of disagreeing are also low.
    - Related offers or actions related or attached to the PR with other tickets or bugs. 
    - Requested reviewers- it makes sure that it is the right team members who could provide feedback.
4. What did you learn from reviewing an open-source PR?
    As demonstrated in reading the React PR (#34063):  
    - Even every minor changes, such as a memory leak fix, can be quite important though and are then reviewed.
    - The reason was it was well understood: explained by the author as: “I forgot to clean up the VirtualInstances from the id map so the Server Component instances always leaked in DEV.” 
    - PRs usually have an automated screening (CI/CD) and labels, such as CLA Signed or React Core Team to trace the acceptance mechanisms. 
    - A well-written PR is a collaboration-friendly process and this one asked to have opinionated reviewers (eps1lon and hoxyq) to provide professional input.
## Writing Meaningful Commit Message 
1. Observatiobns from React's Commit History :
    Here is some example commit from React's GitHub:
    - [Flight] Allow Temporary References to be awaited (#34084)
    - [compiler] Improve merging of scopes that invalidate together (#34049)
    - [DevTools] Clean up Virtual Instances from id map (#34063)
    These are excellent commit messages because:
    - Scoppped and tagged : It starts with a tag (e.g. [Flight], [compiler],..) which shows the part of the project affected.
    - Concise and descriptive : They quickly explain what was done without needing to open the different.
    - Traceable to discussions: It includes a PR number for review and discussion.
2. What makes a good commit message?
    A good commit message should :
    - Explain the change clearly like what was done, optionally why 
    - Be short and structured : a title under 50 characters is good enough and an additionally details in the body id needed.
    - Include context or tags like [Module] or [Feature]to indicate which part of the project is affected.
    - Link to relevant issues or PRs for easy navigation 
    Here is an example of a good commit message:
    [UI] Fix button alignment issue in mobile view (#34100)
    Adjusted CSS flex properties for buttons on small screens to ensure consistent alignment.CLOSE #34098
3. How does a clear commit message help in team collaboration?
    - EVeryone understands the purpose of the change.
    - Reviewers can quickly identify the change's intent
    - Makes git log and git blame more useful 
    - When an issue appears, you can pinpoint the exact chnage that caused it.
4. How can poor commit messages cause issues later?
    - It does not explain the change, slowing down future maintenance.
    - COde reviews take longer since reviewers have no context.
    - Debugging is harder because the commit history doesn't tell the story of why changes were made.