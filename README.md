# Trajectory Entertainment

https://trajectoryentertainment.com


This website is built using Runable, for help with coding, original build, and large changes. GitHub (Obviously) for version control and repository hosting. Windsurf/Devin as my IDE and for help diagnosing issues, and changing code. Vercel for deployment. And of course, Mason Power (myself) for design and content. 

Built on: Vite + React + Tailwind CSS


**AI DISCLOSURE:**

AI was used in the initial build (coding) and for some design suggestions, but I built and designed the majority of the website myself.

I don't really know how to write code, but I can understand it enough to make changes and improvements. Therefore AI was used to help me code (Runable, Windsurf/Devin). I'm sure there are better ways to do things, but it works.

`Mason Power`\
**Founder & Lead Producer**\
**Trajectory Entertainment**



# Development Information/Notes

Original Build: October 2026

Original Design: Mason Power (October 2026)

Original Color Scheme: (Saved for reference)\
--bg: #090a09;
--panel: #111210;
--ink: #f3f2e9;
--muted: #9a9d94;
--orange: #ff6a24;
--yellow: #dfdb86;
--line: #2a2c27;

This Project is Copyright\
© 2026 Trajectory Entertainment

# Runable App template
(Automatically copied by Runable)

Runable copies this Bun and Turborepo project into each new sandbox.

The root package commands are the external contract:

- `bun run dev` starts the web app.
- `bun run dev:desktop` and `bun run dev:mobile` start platform clients.
- `bun run build` builds every package.
- `bun run start` starts or restarts the production server.
- `bun run stop` stops the production server.
- `bun run lint` and `bun run typecheck` validate the project.
- The `db:generate`, `db:migrate`, and `db:push` commands manage the database.

Deployment tools depend on these command names. Their implementations may change, but the names must remain stable.

The web package owns the API, database, and shared web interface. The mobile package is an Expo client. The desktop package is an Electron shell around the web app. Services use the fixed ports defined in `__ports.cjs`, and the web health endpoint is `/api/health`.

Secrets belong in the root `.env` file. Browser values must use the `VITE_` prefix. Commands prefixed with `internal:` are for template maintenance.
