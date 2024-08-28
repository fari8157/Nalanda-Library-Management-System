Here’s the updated README without the API documentation section:

---

# 📚 Nalanda Library Management System

## Overview
The Nalanda Library Management System is a backend solution designed to streamline library operations, including user management, book management, borrowing processes, and report generation. It provides a suite of RESTful APIs for handling various functionalities and is built with Node.js, Express, and MongoDB. The system incorporates JWT-based authentication and role-based access control for secure and efficient management.

## Features

### 🧑‍💻 User Management
- **User Registration:** Register users with their name, email, and password.
- **User Login:** Authenticate users using email and password.
- **User Roles:** Supports Admin and Member roles. Admins have full system access, while Members have limited permissions.

### 📚 Book Management
- **Add Book:** Admins can add new books, including details like title, author, ISBN, publication date, genre, and number of copies.
- **Update Book:** Admins can update book details as needed.
- **Delete Book:** Admins can remove books from the library.
- **List Books:** Users can view a list of books with pagination and filtering options.

### 📖 Borrowing System
- **Borrow Book:** Members can borrow available books.
- **Return Book:** Members can return borrowed books.
- **Borrow History:** Members can view their borrowing history.

### 📊 Reports and Aggregations
- **Most Borrowed Books:** Report on the most borrowed books.
- **Active Members:** List of the most active members based on borrowing history.
- **Book Availability:** Summary of book availability, including total, borrowed, and available counts.

## 🛠 Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **APIs:** RESTful API
- **Authentication:** JWT-based authentication with role-based access control

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- Git

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/fari8157/Nalanda-Library-Management-System.git
   cd nalanda-library-management
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following content:
   ```
   PORT=5000
   MONGO_URL=your-mongodb-url
   JWT_SECRET=your_secret
   JWT_EXPIRES_IN=7d
   ```

4. **Run the Application**
   ```bash
   node index.js
   ```
   The application will be accessible at [http://localhost:5000](http://localhost:5000).

   📄 API Documentation

   For detailed API documentation, please refer to [this document](https://docs.google.com/document/d/18qAQbFdQB1pT45MBxVZKtpWLQruz-CTbI7RpMDGeJLY/edit?usp=sharing).
