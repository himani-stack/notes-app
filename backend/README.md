# Notes app - MERN Stack Project

This is a simple but secure full-stack notes application. Users can create an account, log in, and manage their own private list of notes. I built this to practice connecting a React frontend with a Node/Express backend and a MongoDB database.

## The Tech Stack
* **Frontend**: React (with Axios for API calls)
* **Backend**: Node.js & Express.js
* **Database**: MongoDB Atlas (Cloud)
* **Auth**: JSON Web Tokens (JWT) and Bcrypt for password hashing

## How to run it locally

1. **Clone the project*:
   ```bash
   git clone <your-repository-link>

## Challenges I Faced (and how I fixed them)

Building this app provided some great learning moments. Here are the hurdles I overcame:

**The Path Mismatch (404 Errors)**: Early on, my frontend couldn't reach the login/register routes. I had to debug the Express middleware and realized my URL paths weren't matching. I fixed this by standardizing my API endpoints and adding detailed server-side logging.


Working with JWTs was a bit of a learning curve. I had to figure out how to correctly handshake between the frontend and backend. At first, I didn't realize that the token needs to be sent with the word Bearer in front of it. I had to write a bit of logic in my middleware to split that string so the server could actually read the token and verify the user.".
