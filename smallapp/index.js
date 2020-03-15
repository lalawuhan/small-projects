const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { body, check } = require("express-validator");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());
/* 
const isProduction = process.env.NODE_ENV === "production";
const origin = {
    origin: isProduction ? "https://thabis-api.herokuapp.com/" : "*"
};
app.use(cors(origin));
 */
//To help protect against brute force/DDoS attacks, we can limit the amount of requests using express-rate-limit.
limiter = rateLimit({
    windowsMs: 1 * 60 * 1000, // 1 minute
    max: 5 //5 requests
});
//With app.use(), it will apply to every endpoint, but we can also make certain endpoints stricter with another rateLimit.
app.use(limiter);

const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1
});

//We can use express-validator to ensure any incoming request is valid, otherwise display an error.
const getBooks = (request, response) => {
    pool.query("SELECT * FROM books", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addBook = (request, response) => {
    const { author, title } = request.body;

    pool.query(
        "INSERT INTO books (author, title) VALUES ($1, $2)",
        [author, title],
        error => {
            if (error) {
                throw error;
            }
            response
                .status(201)
                .json({ status: "success", message: "Book added." });
        }
    );
};

app.route("/books")
    //GET endpoint
    .get(getBooks)
    //POST endpoint
    .post(postLimiter, addBook);

//Lets start this server!
app.listen(process.env.PORT || 3002, () => {
    console.log("Server is listening");
});
