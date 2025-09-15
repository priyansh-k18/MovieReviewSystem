import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectionToDb } from './database/db.js';
const app = express();
import moviesRouter from './routes/movie-routes.js';



//connection to the database
connectionToDb();

//middleware
app.use(express.json());


//routes
app.use('/api/movies', moviesRouter);


//live server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is live on port ${PORT}`)
})