# Online Learning Platform

This project is a fully responsive web application for students and instructors, built using the MERN (MongoDB, Express, React, Node.js) stack with Tailwind CSS. It allows instructors to create and manage courses, and students to enroll in and learn from these courses. The platform also features a resource hub for students to explore different engineering career paths along with dedicated resources to go ahead in their journey.

## Features

### For Instructors:
- **Instructor Dashboard**: Manage all courses and enrolled students.
- **Course Creation**: Create courses with detailed information (title, description, price, category, tags, requirements, whatYouWillLearn etc.).
- **Course Management**: Publish or save courses as drafts. Instructors decide the course status.
- **Payment Integration**: Set course prices, and students can purchase courses.
- **Track Students**: View students enrolled in courses and monitor progress.

### For Students:
- **Course Enrollment**: Browse courses and enroll after purchasing.
- **Learning**: Access course content, lectures, and other materials.
- **Reviews**: Submit reviews for courses after completion.
- **Career Resources**: Explore the Resources tab to find descriptions of various engineering fields, helping students choose their career paths.

### General Features:
- **Fully Responsive**: Works on all devices (desktop, tablet, and mobile).
- **Authentication**: Secure login/signup for both students and instructors.
- **Payment Gateway**: Integrated payment system for seamless transactions.
- **Resources Section**: Detailed career guides and links to valuable resources for  students.
  
## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Razorpay
- **Development**: MERN Stack (MongoDB, Express, React, Node.js)

## Installation

To get a local copy of this project up and running, follow these steps:

1. **Clone the repo:**
    ```bash
    git clone https://github.com/karangupta982/ApniCoaching
    ```
2. **Install dependencies:**
    Navigate to the project folder and run:
    ```bash
    npm install
    ```
3. **Environment variables:**
   Create a `.env` file in the root directory and add the following environment variables:
    - `MONGO_URL`: MONGODB_CONNECTION_STRING
    - `JWT_SECRET`: JWT_SECRET_KEY
    - `Razorpay_Secret_key`: KEY
    - `Razorpay_Id`: Id
    - `Cloudinary_folder_name`: FOLDER_NAME
    - `MAIL_HOST`: HOST_NAME
    - `MAIL_USER`: NAME
    - `MAIL_PASS`: PASS
    - `CLOUD_NAME`: NAME
    - `API_SECRET`: KEY
    - `API_KEY`: KEY


  
4. **Run the app:**
    Start the development server with:
    ```bash
    npm run dev
    ```

The app will be running on `http://localhost:3000`.


## Live Demo

You can view the live version of the project here:  
[Visit the live site](https://online-learning-zeta-dun.vercel.app/)

## Frontend Repo

You can view the frontend Repo here: [frontend repo](https://github.com/karangupta982/online-learning)

## File Structure

```plaintext
Apni-Coaching/
│
├── frontend/
│   ├── Build                 # Compiled and bundled frontend code (e.g., minified JavaScript, CSS)
│   ├── public/               # Static assets and HTML files served directly by the web server
│   ├── src/                  # Source code for the frontend (React components, hooks, context,data, pages,reducers, slice, Util, connection to backend apis, etc.)
│   ├── .env                  # Environment variables for the frontend (e.g., API keys, URLs) 
│   ├── .gitignore            # Files and directories to be ignored by Git (e.g., node_modules, build output.
│   ├── package.json          # Frontend package dependencies and scripts (e.g., npm start, npm test)
│   ├── package-lock.json     # Lockfile for frontend dependencies (ensures consistent package versions)
│   ├── tailwind.config.js    # Tailwind CSS configuration file (customizes Tailwind settings) 
│   ├── postcss.config.js     # PostCSS configuration file for Tailwind (configures PostCSS plugins)
│
├── backend/
│   ├── Configuration/              # Backend server configuration files (database connection, Cloudinary connection, Payment setup )
│   ├── Controller/                 # Backend controller logic (handles API requests, interacts with models)
│   ├── Mail/                       # Email-related functionality (e.g., sending emails, email templates)
│   ├── Middleware/                 # Backend middleware functions (e.g., authentication, rate limiting)
│   ├── Model/                      # Backend data models (e.g., database schema, data access objects)
│   ├── node_modules                # Backend package dependencies (installed using npm )
│   ├── Route/                      # Backend route definitions (maps URLs to controller actions)
│   ├── Util/                       # Utility functions for the backend (average calculations functions, date formatting) 
│   ├── Index                       # Backend entry point (e.g., main application file, server setup)
│   ├── package-lock.json           # Lockfile for backend dependencies (ensures consistent package versions)
│   ├── package.json                # Backend package dependencies and scripts (e.g., npm start, npm test)
│   ├── .gitignore                  # Files and directories to be ignored by Git (e.g., node_modules, logs)
│
├── README.md                       # Project documentation


