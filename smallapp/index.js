const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getBooks = (req, res) => {
    pool.query("SELECT * FROM books", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
const addBook = (req, res) => {
    const { author, title } = req.body;

    pool.query(
        "INSERT INTO books(author, title) VALUES ($1, $2)",
        [author, title],
        error => {
            if (error) {
                throw error;
            }
            res.status(201).json({ status: "success", message: "Book added" });
        }
    );
};

app.route("/books")
    //GET endpoint
    .get(getBooks)
    //POST endpoint
    .post(addBook);

//Lets start this server!
app.listen(process.env.PORT || 3002, () => {
    console.log("Server is listening");
});
