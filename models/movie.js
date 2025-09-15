import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1888
  },
  genre: {
    type: [String],
    required: true
  },
  country: {
       type : String,
       required : true
  },
  language: {
    type: String,
    required: true
  },
  runtime: {
    type: Number,
    required: true,
    min: 1
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  ageRating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R", "NC-17", "Unrated"]
  },
  boxOffice: {
    type: String,
    enum: ["Disaster", "Flop", "Hit", "Blockbuster"]
  }
}, { timestamps: true });

export const Movie = mongoose.model("Movie", movieSchema);

