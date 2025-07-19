const Expense = require('../models/ExpenseModel');
const mongoose = require('mongoose');

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, type, date, category, description } = req.body;
        
        //validation
        if(!title || !amount || !type || !date || !category || !description){
            return res.status(400).json({message: "All fields are required"});
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json({message: "Amount must be a positive number"});
        }

        const expense = new Expense({
            title,
            amount,
            type,
            date,
            category,
            description
        });

        await expense.save();
        res.status(201).json({message: "Expense added successfully", expense});
        console.log(expense);
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}


exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.status(200).json({ message: "Expenses retrieved successfully", expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteExpense = async (req, res) =>{
    try {
        const {id} = req.params;
        
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid expense ID format"});
        }

        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).json({message: "Expense not found"});
        }

        res.status(200).json({message:"Expense deleted successfully", expense});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }                   
}
