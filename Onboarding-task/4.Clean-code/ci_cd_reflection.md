# CI CD Reflection

## Research

1. What is CI/CD?
    - CI/CD, which stands for continuous integration and continuous delivery/deployment, aims to streamline and accelerate the software development lifecycle.  
    - Continuous integration (CI) refers to the practice of automatically and frequently integrating code changes into a shared source code repository. Continuous delivery and/or deployment (CD) is a 2 part process that refers to the integration, testing, and delivery of code changes. Continuous delivery stops short of automatic production deployment, while continuous deployment automatically releases the updates into the production environment.
    - Taken together, these connected practices are often referred to as a "CI/CD pipeline" and are supported by development and operations teams working together in an agile way with either a DevOps or site reliability engineering (SRE) approach.
2. Why it's used in software development?
    - CI/CD helps organizations avoid bugs and code failures while maintaining a continuous cycle of software development and updates.
    - As apps grow larger, features of CI/CD can help decrease complexity, increase efficiency, and streamline workflows.
    - Because CI/CD automates the manual human intervention traditionally needed to get new code from a commit into production, downtime is minimized and code releases happen faster. And with the ability to more quickly integrate updates and changes to code, user feedback can be incorporated more frequently and effectively, meaning positive outcomes for end users and more satisfied customers overall.

## Tasks

1. Set up a CI workflow that run markdown linting and spell checks on PRs in your repo
    1. Check out to new branch and initialize tooling :
    git checkout -b chore/ci-setup
    Create package.json:
    npm init -y
    ![Step 1 for creating CI workflow](step1.png)
    1. Install the tool that will be use
    - markdownlint-cli → checks .md formatting
    - cspell → finds typos across files
    - husky → lets us run scripts on git hooks (e.g., pre‑commit)
    - lint-staged → runs linters only on staged files (fast commits)
    npm i -D markdownlint-cli cspell husky lint-staged
    ![Step 2 for creating CI workflow](step2.png)
    1. Add script so we can run the tools
    - lint:md → run markdownlint on every .md (ignoring heavy folders)
    - lint:spell → run cspell across the repo (uses .gitignore to skip stuff)
    - lint → convenience command that runs both
    - prepare → special npm script: runs after install to set up Husky
    - lint-staged → tells Husky what to check only for staged files at commit time
    ![Step 3 for creating CI workflow](step3.png)
    1. Configure the linters
    - Create .markdownlint.json in my repo root :
    ![Step 4.1 for creating CI workflow](step4.1.png)
    - Create cspell.json in my repo root :
    ![Step 4.2 for creating CI workflow](step4.2.png)
    1. Add a local pre-commit hook (Husky):
    npx husky init
    ![Step 5 for creating CI workflow](step5.png)
    - Replace the content inside pre-commit with :
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    npx lint-staged
    ![Step 5.1 for creating CI workflow](step5.1.png)
    1. Create the CI workflow:
    - Making the folder :
    mkdir -p .github/workflows
    ![Step 6 for creating CI workflow](step6.png)
    - Create .github/workflows/ci.yml with the content inside :
    ![Step 6.1 for creating CI workflow](step6.1.png)
    1. Make a branch, commit and push the setup :
