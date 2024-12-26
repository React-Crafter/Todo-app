const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

// app
const app = express();
 
// app use
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

// create schema
const testSchema = mongoose.Schema({
    title: {
        type: String,
    }
});

// create model
const Test = new mongoose.model('tasting', testSchema);

// connect mongoose
const conectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('bd is connect');
    } catch (error) {
        console.log(error)
    }
}

// routs
// return all todos
app.get('/get', async (req, res) => {
    Test.find()
    .then(rea => res.json(rea))
    .catch(err => res.json(err))
});

app.post('/products', (req, res) => {
    const newTest = new Test({title: req.body.title});
    newTest.save()
    if(newTest) {
        res.status(201).json(newTest);
    } else {
        res.status(500).json({message: 'error'})
    }
});

// delete a todo
app.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Test.findByIdAndDelete({_id: req.params.id});
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({error: "this product is not found"});
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
});
 
conectDB()

// start the server
app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 80');
})