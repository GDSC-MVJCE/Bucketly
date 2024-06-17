# Bucketly Backend - A Travel Bucket List Web App

## Overview

The backend for **Bucketly** supports a travel bucket list web app that allows users to create, edit, and delete their travel goals. This backend is built using Node.js, Express.js, Prisma ORM, and Neon DB with PostgreSQL. It provides robust and scalable server-side functionality to ensure a smooth and responsive user experience.

## Features

- **Node.js:** For running the backend server.
- **Express.js:** For building the server-side application.
- **Prisma ORM:** For database operations.
- **Neon DB with PostgreSQL:** For the database management system.
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations on travel bucket list items.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **Prisma ORM:** An open-source database toolkit.
- **Neon DB:** A cloud-native serverless PostgreSQL.
- **PostgreSQL:** A powerful, open-source object-relational database system.

## Project Details

This backend is part of the full stack Bucketly web app developed by the GDSC MVJCE Tech Team. It handles all server-side operations and interacts with the database to provide a seamless experience for the frontend.

## Folder Structure

- **server/**: Contains all the backend code and related files.

## Installation and Usage

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/GDSC-MVJCE/Bucketly.git
   ```
2. **Navigate to the server directory:**
   ```sh
   cd bucketly/server
   ```
3. **Install the dependencies:**
   ```sh
   npm install
   ```
4. **Set up the database using Prisma:**
   ```sh
   npx prisma generate
   npx prisma db push
   ```
5. **Run the backend server:**
   ```sh
   npm run dev
   ```

## API Endpoints

- **GET /api/v1/items:** Retrieve all bucket list items.
- **POST /api/v1/items:** Create a new bucket list item.
- **PUT /api/v1/items/:id:** Update an existing bucket list item.
- **DELETE /api/v1/items/:id:** Delete a bucket list item.

## Authors

- [@Shivam-Sharma-1](https://github.com/Shivam-Sharma-1)
- [@Vector-ops](https://github.com/Vector-ops)

## Contribution

We welcome contributions to improve this project. If you have suggestions or find any issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Developed by the **GDSC MVJCE Tech Team**.

## Contact

For more information, please reach out to us at [gdscmvjce@gmail.com](mailto:gdscmvjce@gmail.com).
