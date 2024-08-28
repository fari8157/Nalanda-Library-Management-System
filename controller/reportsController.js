const Book = require("../models/book");
const BorrowRecord = require("../models/borrowRecord");


const getMostBorrowedBooks = async (req, res, next) => {
  try {
    
    const mostBorrowedBooks = await Book.aggregate([
      {
        
        $project: {
          title: 1,
          author: 1,
          borrowedCount: 1,
        },
      },
      {
        
        $sort: { borrowedCount: -1 },
      },
      {
        
        $limit: 10,
        $limit: 10, 
      },
    ]);

    
    res.status(200).json({
      status: "success",
      data: mostBorrowedBooks,
    });
  } catch (err) {
   
    next(err);
  }
};
const getActiveMembers = async (req, res, next) => {
  try {
   
    const activeMembers = await BorrowRecord.aggregate([
      {
         $group: {
          _id: "$user",
          borrowCount: { $sum: 1 },
        },
      },
      {
        
        $sort: { borrowCount: -1 },
      },
      {
        
        $limit: 10,
      },
      {
        
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        
        $unwind: "$userDetails",
      },
      {
        
        $project: {
          name: "$userDetails.name",
          email: "$userDetails.email",
          borrowCount: 1,
        },
      },
    ]);

    
    res.status(200).json({
      status: "success",
      data: activeMembers,
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
          author: 1,
          totalCopies: "$numberOfCopies",
          borrowedCount: 1,
          availableCopies: { $subtract: ["$numberOfCopies", "$borrowedCount"] },
        },
      },
      {
        
        $sort: { availableCopies: -1 },
      },
    ]);

    
    res.status(200).json({
      status: "success",
      data: bookAvailability,
    });
  } catch (err) {
   
    next(err);
  }
};

module.exports = {
  getBookAvailability,
  getActiveMembers,
  getMostBorrowedBooks,
};