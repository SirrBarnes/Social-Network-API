import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * GET Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })

        if (!thought) {
        return res.status(404).json({ message: 'No video with that ID' });
        }

        res.json(thought);
        return; 
    } catch (err) {
        res.status(500).json(err);
    }

    return;
}

  /**
 * POST Thought /thoughts
 * @param object username
 * @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thought: thought._id } },
        { new: true }
        );

        if (!user) {
        return res.status(404).json({
            message: 'Thought created, but found no user with that ID',
        });
        }

        res.json('Created the Thought 🎉');
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    return;
}

/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
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
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return; 
    }
}

/**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
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
        return res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }

    return; 
}

// Add a thought reaction
/**
 * PUT Thought reaction based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
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
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Remove thought reaction
/**
 * DELETE Thought reacion based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
export const deleteThoughtReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )

        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
