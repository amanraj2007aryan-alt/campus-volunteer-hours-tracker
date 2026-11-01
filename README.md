# Campus Volunteer Hours Tracker

A responsive front-end academic project for registering campus volunteering activities and recording/approving service hours.

## Tech stack
- HTML5: semantic page structure, forms, labels, inputs and tables
- CSS3: responsive layouts, Flexbox, Grid, variables, transitions and media queries
- JavaScript: variables, functions, conditionals, arrays, objects, event handling and DOM updates
- Browser `localStorage`: demo persistence on the same browser/device

No frameworks or build step are required.

## Run locally
1. Download/clone this repository.
2. Open `index.html` in a browser, or open the folder in VS Code and use Live Server.

## Publish with Vercel
1. Push this folder to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Choose **Other** as the framework preset if asked.
5. Leave Build Command and Output Directory empty/default (the site is static and `index.html` is at the repository root).
6. Deploy. Vercel will provide a public URL and can redeploy on future GitHub pushes.

`vercel.json` is included for static hosting configuration.

## Important project limitation
This is a front-end classroom prototype, not a production multi-user system. `localStorage` data is stored only in the current browser profile and is not shared between students or organizers. The organizer panel is a simulated demonstration; it has no real authentication, role-based authorization, server-side validation, shared database, or secure audit trail. Do not enter real personal or sensitive information.

## Group
- RK4P26XPA22
- RK4P26XPA23
- RK4P26XPA24