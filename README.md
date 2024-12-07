# User Manager Application

This application provides a REST API (built with Django and Django REST Framework) to manage user data, and a React-based frontend UI to perform CRUD operations (create, read, update, delete) on users. Pagination, search by ID, and date-of-birth filtering are handled by the Django API. The React frontend consumes the API and displays the data in a user-friendly interface.

## Features

- **Backend (Django REST API)**:
  - `GET /users`: Retrieve a list of users with pagination.
  - `GET /users/:id`: Retrieve a specific user by ID.
  - `POST /users`: Create a new user.
  - `PUT /users/:id`: Update an existing user.
  - `DELETE /users/:id`: Delete a user.
  - Search by user ID by visiting `/users/:id`.

- **Frontend (React)**:
  - View all users with pagination.
  - Search users by ID.
  - Add a new user (Name and Date of Birth).
  - Update existing user details.
  - Delete a user.
  
- **Serving Frontend from Django**:
  The React app is built into static files and served by Django using Whitenoise. The root URL (`/`) serves the React `index.html`, providing a single-page application experience.

## Technology Stack

- **Backend**: Python 3.11, Django, Django REST Framework, Gunicorn, Whitenoise
- **Frontend**: React (built with Vite)
- **Database**: SQLite (default), can be changed if needed.

## Requirements

- **Local (non-Docker)**:
  - Python 3.10+ (Recommended Python 3.11)
  - Node.js and npm (for frontend build)
  - (Optional) A virtual environment tool like `venv`.

- **Docker**:
  - Docker Engine installed and running.

## Installation and Running Locally

### Step 1: Backend Setup

1. **Create and Activate Virtual Environment (Recommended)**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   # On Windows: venv\Scripts\activate
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd UserManagerAPI
   pip install -r requirements.txt
   ```

3. **Apply Migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Run the Backend Server**:
   ```bash
   python manage.py runserver
   ```
   By default, this runs on `http://localhost:8000`.

### Step 2: Frontend Setup

In a separate terminal:

1. **Install Frontend Dependencies**:
   ```bash
   cd UserManagerClient
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   This typically runs on `http://localhost:5173`.

### Accessing the App Locally

- **Backend API**: `http://localhost:8000/users`
- **Frontend**: `http://localhost:5173/` to view the React UI.

**Note**: The React frontend in development mode uses a different port and may require a proxy configuration to call the backend API if you have CORS issues. During development, ensure the frontend makes requests to `http://localhost:8000`.

### Building Frontend for Production and Serving via Django

1. **Build React App**:
   ```bash
   cd UserManagerClient
   npm run build
   ```
   This generates a `dist` directory containing the production-ready React app. copy the contents of the `dist` to `UserManagerAPI/frontend_build`

2. **Collect Static Files in Django**:
   Ensure `STATICFILES_DIRS` and `templates` settings are configured. Once done:
   ```bash
   cd UserManagerAPI
   python manage.py collectstatic --noinput
   ```
   
3. **Run with Gunicorn (Optional)**:
   ```bash
   gunicorn UserManagerAPI.wsgi:application --bind 0.0.0.0:8000
   ```
   
4. Access the app at `http://localhost:8000/`.

## Running via Docker

A `Dockerfile` is provided to run both the backend and frontend in a single container image.

### Steps:

1. **Build the Docker Image**:
   From the project root directory (the directory containing the `Dockerfile`):
   ```bash
   docker build -t usermanager:latest .
   ```

   This will:
   - Build the React frontend.
   - Copy the built React files into the Django app.
   - Collect static files.
   - Install and configure the backend.
   - Set up the image to run using Gunicorn.

2. **Run the Docker Container**:
   ```bash
   docker run -p 8000:8000 usermanager:latest
   ```
   
3. **Access the App**:
   Open `http://localhost:8000/` in your browser to see the React app. The API endpoints (e.g. `http://localhost:8000/users`) are also available.

### Stopping the Container

Press `Ctrl+C` in the terminal running `docker run`, or run `docker stop` on the container ID obtained from `docker ps`.

## Configuration

- **`DEBUG`**: Ensure `DEBUG=False` in production (e.g., when running via Docker) for Whitenoise static serving.
- **`ALLOWED_HOSTS`**: Set `ALLOWED_HOSTS = ['*']` or a specific domain/IP in `UserManagerAPI/settings.py` for production mode.
- **Database**: By default uses SQLite. For production, consider configuring PostgreSQL or another robust DB.

## License

This project is open-source. Feel free to modify or enhance as needed.

