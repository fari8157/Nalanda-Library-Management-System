const express = require("express");
const router = express.Router();
const {
  createBorrowBook,
  returnBook,
  getBorrowHistory,
} = require("../controller/borrowController");
const { protect } = require("../middlewares/authMiddleware");

// Routes for borrowing system

// Borrow a book (Members only)
router.post("/create", protect, createBorrowBook);

// Return a borrowed book (Members only)
router.patch("/return/:id", protect, returnBook);

// Get borrow history (Members only)
router.get("/history", protect, getBorrowHistory);

module.exports = router;
