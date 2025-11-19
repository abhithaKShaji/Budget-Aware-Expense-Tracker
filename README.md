# Budget-Aware-Expense-Tracker
Features (Completed So Far)
 Authentication (Login / Signup / Logout)

Secure authentication using JWT. Includes OTP verification during signup (backend ready).

 Categories & Budgets

Create categories such as Food, Travel, Rent, etc.

Assign a monthly budget to each category.

Edit or delete categories.

All data stored in MongoDB.

 Add Expense (Backend Only & UI Trigger)

Expense creation API implemented using Express + TypeScript + MongoDB.

A floating plus icon (FAB) is added on the dashboard UI to open the Add Expense modal.

 Note: The Expense Page itself is not fully implemented on the frontend yet.

 Dashboard (Partially Completed)

Displays categories and budgets.

UI foundation is done but not fully built out yet.

Integration with expense data is in progress.

 Tech Stack
Frontend

React + TypeScript

Vite

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

TypeScript

MongoDB (native driver / Mongoose — based on your implementation)

Tools

Render (Backend Deployment) and Netlify (Frontend Deployment 

Postman (API testing)

Project Structure
/frontend
  /src
    /features
    /components
    /hooks
    /pages
   
/backend
  /src
    /controllers
    /routes
    /middlewares
    /models
    index.ts

    for locally run the project , both frontend and backend : npm run dev

    backend live url : https://backend-q5x6.onrender.com/
    frontend live url : https://budgetaware.netlify.app/
