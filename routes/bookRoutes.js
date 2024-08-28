const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  getBookAvailability,
} = require("../controller/bookController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

// Routes for books

// List all books with pagination and filtering
router.get("/", protect, getAllBooks);

// Get a specific book by ID
router.get("/:id", protect, getBook);

// Add a new book (Admins only)
router.post("/createBook", protect, restrictTo("Admin"), createBook);

// Update a book by ID (Admins only)
router.patch("/updateBook/:id", protect, restrictTo("Admin"), updateBook);

// Delete a book by ID (Admins only)
router.delete("/deleteBook/:id", protect, restrictTo("Admin"), deleteBook);

// Get availability of all books
router.get("/availability", protect, getBookAvailability);

module.exports = router;
