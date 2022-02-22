# Production steps: We have two options:

1. Deploy to vercel service: Create a vercel account, do match with the project on the repo (github or gitlab) and configurate the branch for do deploy. (Master o Main for example)

2. Create the build: 
    run `ng build --prod`
    the result will be a `dist/` folder
    up the `dist/` folder to the server

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
