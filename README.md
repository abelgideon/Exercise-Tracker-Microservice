# Exercise Tracker Microservice

This is a Node.js application that implements an exercise tracker microservice. Users can create accounts, log their exercises, and retrieve logs with optional filtering.

## Features

- **Root Route:** Serves a static HTML page for user interaction.
- **CORS Enabled:** Ensures the API is remotely testable.
- **Database Integration:** Uses MongoDB for storing user and exercise data.
- **API Endpoints:**
  - `/api/users`: Manage user creation and retrieval.
  - `/api/users/:_id/exercises`: Log exercises for a specific user.
  - `/api/users/:_id/logs`: Retrieve exercise logs with optional filters.

## Usage

### API Endpoints

1. **POST `/api/users`**  
   Creates a new user and returns the username and `_id`.  
   Example request:  
   Body: `{ "username": "john_doe" }`  
   Example response:  
   {  
     "username": "john_doe",  
     "_id": "64c1d7b4a3b1b4e4"  
   }

2. **GET `/api/users`**  
   Retrieves a list of all users.  
   Example response:  
   [  
     { "username": "john_doe", "_id": "64c1d7b4a3b1b4e4" },  
     { "username": "jane_doe", "_id": "64c1d7c6a3b1b4e5" }  
   ]

3. **POST `/api/users/:_id/exercises`**  
   Logs an exercise for a specific user and returns the logged exercise.  
   Example request:  
   Body: `{ "description": "Running", "duration": 30, "date": "2025-01-20" }`  
   Example response:  
   {  
     "_id": "64c1d7b4a3b1b4e4",  
     "username": "john_doe",  
     "date": "Mon Jan 20 2025",  
     "duration": 30,  
     "description": "Running"  
   }

4. **GET `/api/users/:_id/logs`**  
   Retrieves a user's exercise log with optional query parameters:  
   - `from`: Filter logs from this date (inclusive).  
   - `to`: Filter logs up to this date (inclusive).  
   - `limit`: Limit the number of returned logs.  
   Example response:  
   {  
     "username": "john_doe",  
     "count": 2,  
     "_id": "64c1d7b4a3b1b4e4",  
     "log": [  
       { "description": "Running", "duration": 30, "date": "Mon Jan 20 2025" },  
       { "description": "Swimming", "duration": 45, "date": "Tue Jan 21 2025" }  
     ]  
   }

## Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/abelgideon/Exercise-Tracker-Microservice.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd Exercise-Tracker-Microservice
   ```
3. Install dependencies:
   ```bash  
   npm install
   ```
4. Set up the environment variables (create a `.env` file): 
   ```bash 
   MONGO_URI=your_mongodb_connection_string PORT=3000
   ```
5. Start the application: 
   ```bash
   npm start
   ```

## Contributions

Contributions are welcome! Fork the repository and submit a Pull Request with your improvements.