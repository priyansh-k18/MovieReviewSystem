import express from 'express';
import { 
  createMovie, 
  deleteMovieById, 
  getAllMovies, 
  getMovieById, 
  updateMovieById 
} from '../controllers/movies-controller.js';

const router = express.Router();


router.get('/', getAllMovies);    
router.get('/:id', getMovieById);   
router.post('/', createMovie);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

export default router;
