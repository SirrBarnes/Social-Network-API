import { Request, Response } from 'express';
import { User, Thought} from '../models/index.js';

//Get all users
export const getAllUsers = async(_req: Request, res: Response) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch(error: any){
      res.status(500).json(error);
  }
}

//Get a single user
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if(!user) {
      return res.status(404).json({ message: 'No user with that ID'});
    } 

    res.json(user);
    return;

  } catch (error) {
    res.status(500).json(error);
    return;
  }
}

//Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    const user = await User.create({
      username,
      email
    });

    res.status(201).json(user);
    
  } catch (error: any) {
    res.status(400).json(error);
  }
}

//Update User
/**
 * PUT User based on id /user/:id
 * @param object id, username
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

//Delete user and associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    
    if (!user) {
      res.status(404).json({
        message: 'No user with that ID'
      });
    } else {
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'Users and Thoughts deleted!' });
    }

  } catch (error: any) {
    res.status(500).json(error);
    return;
  }
};

//Add user friend
export const addUserFriend = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { friendId } = req.body;
  try {
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({message: 'No user with this ID!' });
    }

    res.json(user);
    return;

  } catch (error) {
    res.status(500).json(error);
    return;
  }
}

//Delete user friend
export const deleteUserFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
    return;

  } catch (error) {
    res.status(500).json(error);
    return;
  }
}