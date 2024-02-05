import express from 'express';
import mongoose from 'mongoose';

import SongMessage from '../models/SongMessage.js';

const router = express.Router();

export const getSongs = async (req, res) => { 
    try {
        const SongMessages = await SongMessage.find();
                
        res.status(200).json(SongMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSong = async (req, res) => { 
    const { id } = req.params;

    try {
        const Song = await SongMessage.findById(id);
        
        res.status(200).json(Song);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSong = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newSongMessage = new SongMessage({ title, message, selectedFile, creator, tags })

    try {
        await newSongMessage.save();

        res.status(201).json(newSongMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Song with id: ${id}`);

    const updatedSong = { creator, title, message, tags, selectedFile, _id: id };

    await SongMessage.findByIdAndUpdate(id, updatedSong, { new: true });

    res.json(updatedSong);
}

export const deleteSong = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Song with id: ${id}`);

    await SongMessage.findByIdAndRemove(id);

    res.json({ message: "Song deleted successfully." });
}

export const likeSong = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Song with id: ${id}`);
    
    const Song = await SongMessage.findById(id);

    const updatedSong = await SongMessage.findByIdAndUpdate(id, { likeCount: Song.likeCount + 1 }, { new: true });
    
    res.json(updatedSong);
}


export default router;