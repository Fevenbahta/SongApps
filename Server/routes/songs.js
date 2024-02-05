import express from 'express';

import { getSongs, getSong, createSong, updateSong, likeSong, deleteSong } from '../controllers/songs.js';

const router = express.Router();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:id', getSong);
router.patch('/:id', updateSong);
router.delete('/:id', deleteSong);
router.patch('/:id/likeSong', likeSong);

export default router;