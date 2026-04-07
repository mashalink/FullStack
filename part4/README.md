# Part 4 - Testing Express Servers, User Administration

This part contains the backend work for the bloglist application.

## Projects

| Path | Description |
| --- | --- |
| [bloglist](./bloglist) | Express + MongoDB API with JWT authentication, blog and user resources, seed scripts, and automated tests |

## Covered Work

- unit tests for list helper functions
- integration tests for the blog API and user creation flows
- JWT-based login and authorization
- ownership-aware delete behavior
- test-only reset route for clean frontend and E2E runs

## Run Locally

```bash
cd part4/bloglist
npm install
npm run dev
```

## Notes

- Detailed setup, environment variables, routes, and test commands are documented in [part4/bloglist/README.md](./bloglist/README.md).
- This part currently contains a single backend project that is reused by the frontend work in Parts 5 and 7.
