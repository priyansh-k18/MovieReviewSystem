import express from 'express';
import { 
  createMovie, 
  deleteMovieById, 
  getAllMovies, 
  getMovieById, 
  updateMovieById 
} from '../controllers/movies-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();


router.get('/', authMiddleware,  getAllMovies);    
router.get('/:id', authMiddleware, getMovieById);   
router.post('/', authMiddleware, isAdmin, createMovie);
router.put('/:id', authMiddleware, isAdmin, updateMovieById);
router.delete('/:id', authMiddleware, isAdmin, deleteMovieById);

export default router;

