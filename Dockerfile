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

# Expose the application port
EXPOSE 8080

# Run the application
RUN curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 && chmod +x cloud_sql_proxy

CMD ./cloud_sql_proxy -instances=penerimaan-kp-humic:asia-southeast2:penerimaankphumicdb=tcp:3306 & npm start