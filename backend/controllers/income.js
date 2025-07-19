const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const { title, amount, type, date, category, description } = req.body;
    const income=IncomeSchema({
        title,
        amount,
        type,
        date,
        category,
        description
    })
    try{
        //validation
        if(!title || !amount || !type || !date || !category || !description){
            return res.status(400).json({message: "All fields are required"});
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json({message: "Amount must be a positive number"});
        }
        await income.save();
        res.status(201).json({message: "Income added successfully", income});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
    console.log(income);
}


exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ date: -1 });
        res.status(200).json({ message: "Incomes retrieved successfully", incomes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id}=req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"Income deleted Successfully",income});
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    })           
}
