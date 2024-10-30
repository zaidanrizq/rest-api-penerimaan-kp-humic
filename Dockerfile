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

# Download and set up Cloud SQL Proxy
RUN curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 && chmod +x cloud_sql_proxy

# Start Cloud SQL Proxy and run migrations and application
CMD ./cloud_sql_proxy -instances=penerimaan-kp-humic:asia-southeast2:penerimaankphumicdb=tcp:3306 & \
    npx prisma migrate deploy && npm start
