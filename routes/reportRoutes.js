const express = require("express");
const router = express.Router();
const {
  getMostBorrowedBooks,
  getActiveMembers,
  getBookAvailability,
} = require("../controller/reportsController");
const { protect } = require("../middlewares/authMiddleware");

// Routes for reports and aggregations

// Get the most borrowed books
router.get("/most-borrowed-books", protect, getMostBorrowedBooks);

// Get the most active members
router.get("/active-members", protect, getActiveMembers);

// Get book availability report
router.get("/book-availability", protect, getBookAvailability);

module.exports = router;
