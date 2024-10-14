import { User, Thought } from '../models/index.js';
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
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

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
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            });
        }

        res.json('Created the Thought 🎉');
        return;

    } catch (error) {
        console.log(error);
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

//Delete Thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        if (!user) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully deleted!' });
        return;

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
