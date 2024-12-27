# Use official Node.js image as the base image
FROM node:alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Command to run the Next.js application
CMD ["yarn", "dev"]