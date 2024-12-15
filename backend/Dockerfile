FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to leverage caching
COPY ./app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./app ./

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
