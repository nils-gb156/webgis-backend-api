FROM node:22

# Set the /app directory as working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose app on given port
EXPOSE 4431

# Start app
CMD ["npm", "start"]
