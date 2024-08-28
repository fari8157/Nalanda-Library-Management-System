const Borrow = require("../models/borrowRecord");
const Book = require("../models/book");


const createBorrowBook = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookId = req.body.bookId;
    const book = await Book.findById(bookId);
    if (!book || book.numberOfCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    const existingBorrow = await Borrow.findOne({
      user: userId,
      book: bookId,
      returnedAt: null,
    });

    if (existingBorrow) {
      return res.status(400).json({
        message:
          "You have already borrowed this book, you cannot borrow it without returning it.",
      });
    }

    book.numberOfCopies -= 1;
    book.borrowedCount += 1;
    await book.save();

    
    const borrowRecord = await Borrow.create({
      user: userId, 
      book: bookId, 
    });

    res.status(201).json({ status: "success", data: borrowRecord });
  } catch (err) {
   
    next(err);
  }
};


const returnBook = async (req, res, next) => {
  try {
    
    const borrowRecord = await Borrow.findOneAndUpdate(
      { book: req.params.id, returnedAt: null }, 
      { returnedAt: new Date() },
      { new: true } 
    );

   if (!borrowRecord)
      return res.status(400).json({ message: "Invalid borrow record" });
     const book = await Book.findById(borrowRecord.book);
    book.numberOfCopies += 1;
    book.borrowedCount -= 1;
    await book.save();
    res.status(200).json({ status: "success", data: borrowRecord });
  } catch (err) {
    
    next(err);
  }
};


const getBorrowHistory = async (req, res, next) => {
  try {
    
    const borrowRecords = await BorrowRecord.find({
      user: req.user._id,
    })
      .select("-__v")
      .populate({
        path: "book",
        select: "-numberOfCopies -borrowedCount -ISBN -publicationDate -__v",
      });

   
    res.status(200).json({ status: "success", data: borrowRecords });
  } catch (err) {
    
    next(err);
  }
};

module.exports = {
createBorrowBook,
  getBorrowHistory,
  returnBook,
};