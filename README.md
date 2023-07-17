# Xen Coding Challenge Base

Thanks for taking the time to complete our coding challenge.
Use this template as your starting point.

We are always trying to improve our candidate experience, so if you have any ideas on how to improve this template, please share them with your recruiter.

We've organized the code into two apps:
1. A Backend API built with Ruby on Rails
2. A Frontend App built with ReactJS

## 1. Backend
The backend folder contains a Ruby on Rails service you can query with your frontend app.

Instructions for running the service are in the [README.md](./backend/README.md)

## 2. Frontend
The frontend folder contains a vite app with react and vitest pre configured. 
We have included MaterialUI to speed development, but feel free to use any other framework, libraries, or tooling that you prefer.

The app will list several invoices by default, edit or improve the code as needed for your solution.
Any other views interactivity will need to be added by you.

Tested Node versions:
- 18.16.1
- 20.2.0

### Getting Started
1. Clone this repo our use the 'Use this template' button in Github
2. Install node using the package manager/node version manager of your choice.
3. Change to the `frontend` folder
4. Install dependencies:
    ```sh
    npm install
    ```
5. Run the app:
    ```sh
    npm run dev
    ```

### Testing
Tests are written vitest and react-testing-library, but feel free to install jest or any other framework you prefer.
You should test any new code you create.

Run all tests:
```sh
npm run test
```
