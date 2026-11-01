# Campus Volunteer Hours Tracker

A responsive front-end academic project for registering campus volunteering activities and recording and verifying service hours.

## Live demo

**Website:** https://campus-volunteer-hours-tracker.vercel.app

The project has one shared public deployment. Only the group member managing the deployment needs to configure Vercel; other group members can use the same website URL and do not need separate Vercel deployments.

## Features

- Dashboard showing total, verified and pending volunteer hours
- Browse, search and filter volunteer activities
- Register for activities
- Submit volunteer hours
- Simulated organizer review with approve/reject actions
- View volunteer history and verification status
- Responsive layout for desktop and mobile screens

## Tech stack

- **HTML5:** semantic page structure, forms, labels, inputs and tables
- **CSS3:** responsive layouts, Flexbox, Grid, variables, transitions and media queries
- **JavaScript:** variables, functions, conditionals, arrays, objects, event handling and DOM updates
- **Browser `localStorage`:** demo persistence in the same browser/device

No frameworks or build step are required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Deployment with Vercel

This repository is deployed at:

https://campus-volunteer-hours-tracker.vercel.app

Only one Vercel project/deployment is needed for the whole group. Share the live URL with teammates, evaluators and other users.

To update the live website:
1. Make the required changes in the project files.
2. Commit and push the changes to the connected GitHub repository's `main` branch.
3. Vercel can automatically build and deploy the updated version.

For a fresh deployment, import this GitHub repository in Vercel, select **Other** as the framework preset if prompted, and leave the build command and output directory empty/default because this is a static site with `index.html` at the repository root.

## Important project limitation

This is a front-end classroom prototype, not a production multi-user system. `localStorage` data is stored only in the current browser profile and is not shared between students or organizers. For example, registering on one device will not automatically appear on another device. The organizer panel is a simulated demonstration; there is no real authentication, role-based authorization, server-side validation, shared database or secure audit trail. Do not enter real personal or sensitive information.

## Group

- RK4P26XPA22
- RK4P26XPA23
- RK4P26XPA24
