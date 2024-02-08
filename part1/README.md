execises 1.1. - 1.14.

The application called part1, navigate to its directory and install the libraries: 
# npm 6.x (outdated, but still used by some):
npm create vite@latest part1 --template react

# npm 7+, extra double-dash is needed:
npm create vite@latest part1 -- --template react

The application runs:
    npm run dev

The application runs on localhost 3000:
    http://localhost:5173/ or next

The files App.css, App.test.js, index.css, logo.svg, setupTests.js and reportWebVitals.js may be deleted as they are not needed in our application right now.

In some situations you may also have to run the command below from the root of the project:
    rm -rf node_modules/ && npm i
(If and when you encounter an error message
    Objects are not valid as a React child)

Notes for me:
Create an application:
    npx create-react-app name_for_folder

    cd name_for_folder