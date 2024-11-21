# Use the official Node.js image
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 8080

# Run the application
CMD npm start