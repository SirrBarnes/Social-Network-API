import { Thought } from '../models/index.js';
import { Request, Response } from 'express';

//Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);

    } catch (error) {
        res.status(500).json(error);
    }

}

//Get a single thought
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById( thoughtId )

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

//Create a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

//Update Thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return; 
    }
}

//Delete Thought and associated reactions
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });

        } else {
            await Thought.deleteMany({ _id: { $in: thought.reactions} });
            res.json({ message: 'Thought and Reaction deleted' });
        }

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

//Adds a reaction to a thought
export const addThoughtReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

// Remove thought reaction
export const deleteThoughtReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}
