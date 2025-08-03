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
    - Even very minor changes, such as a memory leak fix, can be quite important though and are then reviewed.
    - The reason was it was well understood: explained by the author as: “I forgot to clean up the VirtualInstances from the id map so the Server Component instances always leaked in DEV.” 
    - PRs usually have an automated screening (CI/CD) and labels, such as CLA Signed or React Core Team to trace the acceptance mechanisms. 
    - A well-written PR is a collaboration-friendly process and this one asked to have opinionated reviewers (eps1lon and hoxyq) to provide professional input.Added an overly detailed commit example.
