import { Movie } from "../models/movie.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({
      success: true,
      message:
        movies.length === 0
          ? "Movies Not Found"
          : "Movies fetched successfully",
      data: movies,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, Please try again!!",
      error: e.message,
    });
  }
};

export const createMovie = async (req, res) => {
  try {
    const newMovieData = req.body;
    const newlyCreatedMovie = await Movie.create(newMovieData);

    res.status(201).json({
      success: true,
      message: "Successfully created a movie",
      data: newlyCreatedMovie,
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid movie data",
        error: e.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error, Please try again!!",
      error: e.message,
    });
  }
};

export const getMovieById = async (req,res) => {
     try{
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if(!movie){
            return res.status(404).json({
                success : false,
                message : 'Requested movie not found'
            })
        }
        res.status(200).json({
             success : true,
             message : 'Movie Found Successfully',
             data : movie
        })

     }catch (e) {
      return res.status(500).json({
      success: false,
      message: "Internal server error, Please try again!!",
      error: e.message,
    });
  }
};

export const updateMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieNewData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieNewData, {
      new: true,  
      runValidators: true
    });

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Requested movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, Please try again!!",
      error: e.message
    });
  }
};

export const deleteMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Requested movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully"
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, Please try again!!",
      error: e.message
    });
  }
};
