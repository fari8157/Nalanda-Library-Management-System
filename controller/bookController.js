const Book=require("../models/book")
const mongoose = require("mongoose");

const createBook = async (req, res, next) => {
    try {
      const { title, author, ISBN, publicationDate, numberOfCopies } = req.body;
  
     
      if (!title || !author || !ISBN || !publicationDate || !numberOfCopies) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }
      const existingBook = await Book.findOne({
        $or: [{ title }, { ISBN }]
      });
  
      if (existingBook) {
        return res.status(400).json({
          message: "A book with the same title or ISBN already exists",
        });
      }
  
     
      const book = await Book.create({
        title,
        author,
        ISBN,
        publicationDate,
        genre: req.body.genre,
        numberOfCopies,
      
      });
  
     
      res.status(201).json({ status: "success", data: book });
    } catch (err) {
        next(err);
      }
      
    
    }
    
    const getAllBooks = async (req, res, next) => {
        try {
          const { page = 1, limit = 10, genre, author } = req.query;
      
         
          const pageNumber = Math.max(1, parseInt(page));
          const limitNumber = Math.max(1, parseInt(limit));
      
         
          const filter = {};
          if (genre) filter.genre = genre;
          if (author) filter.author = author;
      
          
          const books = await Book.find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
      
         
          const totalBooks = await Book.countDocuments(filter);
      
          res.status(200).json({
            status: "success",
            data: {
              books,
              totalPages: Math.ceil(totalBooks / limitNumber),
              currentPage: pageNumber,
              totalBooks,
            },
          });
        } catch (err) {
          next(err); 
        }
      };

      const getBook = async (req, res, next) => {
        try {
          // Validate the provided ID to ensure it's a valid MongoDB ObjectId.
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid book ID" });
          }
          const book = await Book.findById(req.params.id);
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }
          res.status(200).json({ status: "success", data: book });
        } catch (err) {
          
          next(err);
        }
      };

      const updateBook = async (req, res, next) => {
        try {
          
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid book ID" });
          }
      
          const currentBook = await Book.findById(req.params.id);
          if (!currentBook) {
            return res.status(404).json({ message: "Book not found" });
          }
      
          // If the title is being updated and the new title is different from the current one
          if (req.body.title && req.body.title !== currentBook.title) {
            const existingBookByTitle = await Book.findOne({ title: req.body.title });
      
           
            if (existingBookByTitle) {
              return res.status(400).json({ message: "Title already exists" });
            }
          }
      
          // If the ISBN is being updated and the new ISBN is different from the current one
          if (req.body.ISBN && req.body.ISBN !== currentBook.ISBN) {
            const existingBookByISBN = await Book.findOne({ ISBN: req.body.ISBN });
      
            
            if (existingBookByISBN) {
              return res.status(400).json({ message: "ISBN already exists" });
            }
          }
      
          // Find the book by its ID and update it with the new data from the request body.
          const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,            // Returns the updated document.
            runValidators: true,  // Ensures that validation is run on the update operation.
          });
      
        
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }
      
         
          res.status(200).json({ status: "success", data: book });
        } catch (err) {
         
          next(err);
        }
      };

      const deleteBook = async (req, res, next) => {
        try {
          
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid book ID" });
          }
      
         
          const book = await Book.findByIdAndDelete(req.params.id);
      
          
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }
      
          
          res.status(204).json({
            status: "success",
            data: null,
          });
        } catch (err) {
         
          next(err);
        }
      };

      const getBookAvailability = async (req, res, next) => {
        try {
         
          const bookAvailability = await Book.aggregate([
            {
             
              $project: {
                title: 1,
                totalCopies: "$numberOfCopies",
                availableCopies: { $subtract: ["$numberOfCopies", "$borrowedCount"] },
              },
            },
          ]);
      
         
          if (!bookAvailability || bookAvailability.length === 0) {
            return res.status(404).json({
              status: "fail",
              message: "No books available",
            });
          }
      
          
          res.status(200).json({
            status: "success",
            data: bookAvailability,
          });
        } catch (err) {
        
          next(err);
        }
      };
      
      
      
  
  module.exports ={ 
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    getBookAvailability,
    deleteBook

  }
  