// import {createError} from "../error.js";
import User from "../models/users.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {new: true}
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(res.json({error: 403, message: "You can update only your account!"}));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(res.json({error:403, message:"You can delete only your account!"}));
  }
};

export const getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: 1},
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUser: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: {subscribers: -1},
      });
      res.status(200).json("Unsubscription successfull.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      // to no repeat likes addtoset
      $addToSet: {like: id},
      $pull: {dislike: id},
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislike: id},
      $pull: {like: id},
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
