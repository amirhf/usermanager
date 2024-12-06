# Stage 1: Build the React frontend 
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY UserManagerClient/package*.json ./
RUN npm install
COPY UserManagerClient/ ./
RUN npm run build

# Stage 2: Build the backend (Django + Python)
FROM python:3.11-slim AS backend
WORKDIR /app

# Install Python dependencies
COPY UserManagerAPI/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY UserManagerAPI/ .

# Copy React build (static files) into a place where Django can serve them
COPY --from=frontend-builder /app/dist ./frontend_build

# Copy the built index.html to the Django templates directory
# Ensure that UserManagerAPI/templates directory exists in your repo
COPY --from=frontend-builder /app/dist/index.html ./templates/index.html

# Collect static files so that all static assets are available
RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8000

# Start the application with gunicorn
CMD ["gunicorn", "UserManagerAPI.wsgi:application", "--bind", "0.0.0.0:8000"]
