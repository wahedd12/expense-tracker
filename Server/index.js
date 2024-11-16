const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const bodyParser = require ("body-parser")

const app = express()

const port = 3000

// to connect with mongoose
mongoose.connect("mongodb+srv://lmipo861:wBtEYe4RAjbPAVLw@cluster0.09dy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("mongodb connected");
    }
)

const expenseSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    description: String,
})

app.use(cors())
app.use(bodyParser.json())

const Expense  = mongoose.model("Expense", expenseSchema)

// get all expenses from database
app.get("/expenses", async (req, res)=>{
    try {
        const expenses = await Expense.find()
        res.json(expenses)
    } catch (error) {
        console.error(error)
        res.status(500).jsom("could not get expenses from database")
    }
})

// add a new expense
app.post("/expenses", async (req, res)=>{
    try {
        const expense = new Expense(req.body)
        const savedExpense = await expense.save()
        res.json(savedExpense)
    } catch (error) {
        console.error(error)
        res.status(500).jsom("could not save expenses to database")
    }
})

// delete an expense
app.delete("/expense/:id", async (req, res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id)
    res.json({message:"expense has been deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(404).jsom("could not delete expenses from database")
    }
})

// start server and listen for connection
app.listen(port, ()=>{
    console.log("server is running on port 3000")
});