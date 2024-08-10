# Blog-Editor-Locking-Mechanism

This is a full-stack web application that allows users to log in, view a list of blogs, and edit a blog post. The application ensures that only one user can edit a blog at a time using a locking mechanism. The lock is automatically released after a period of inactivity of 10 minutes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/shivam-sketch/Blog-Editor-Locking-Mechanism.git
    cd Blog-Editor-Locking-Mechanism
    ```

2.  Install dependencies:

    ```bash
    cd Blog-Editor-Locking-Mechanism/frontend
    npm install or npm install --force

    cd Blog-Editor-Locking-Mechanism/server
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the server directory and add the following or copy the contents

        ```env
        PORT=5000
        JWT_SECRET=BOOKAUTHORREADER
        MONGODB_URI=mongodb+srv://test_project:ShivamDB2601@cluster0.3nfqkym.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0
        LOCK_TIMEOUT=10

        ```

4.  Run the application both frontend and backend :

```bash
npm start
```

## Usage

You can Login with these test credentials to test the application

```
1. {
email : sstest1@yopmail.com,
password : 12345

}

2. {
email : sstest2@yopmail.com,
password : 12345

}

```
 ### Access the Application
Once both the backend and frontend are running:

Open your browser and navigate to http://localhost:3000 to access the frontend.
You can log in, view blogs, and edit them as per the application functionality.


### Additional Information
The blog locking mechanism is implemented using a timestamp that checks for inactivity. The lock is automatically released after the specified LOCK_TIMEOUT duration.
The project uses node-cron to periodically unlock blogs that have been locked due to inactivity.