import User from "../../models/UserModel";
import {
  getAppTokens,
  clearAppCookie,
  transformUser,
  transformPoll,
  decodeJWToken,
} from "./shared";
import batchLoaders from "../loaders/dataLoaders";
import bcrypt from "bcryptjs";
import {
  Follower,
  PollHistory,
  ResolverMap,
} from "../../components/appTypes/appType";
import IUser from "../../models/interfaces/user";
import { dateToString } from "../../components/globalFuncs";
import IPoll from "../../models/interfaces/poll";
import IAnswer from "../../models/interfaces/answer";

const { batchAnswers, batchPolls } = batchLoaders;

export const userResolvers: ResolverMap = {
  Query: {
    users: async (parent, args, { dataLoaders }) => {
      try {
        const users = await User.find();
        const userData = users.map((user) =>
          transformUser(user, dataLoaders(["poll"]))
        );

        return userData;
      } catch (error) {
        throw new Error(error);
      }
    },
    logout: async (parent, args, context) => {
      const { req, res } = context;

      if (req?.headers?.cookie) {
        clearAppCookie(res);
        return "User is logged out!";
      }
      return "Not logged in";
    },
    getUserData: async (parent, args, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user = await User.findById(id);

        if (user) {
          const userData = transformUser(user, dataLoaders(["poll"]));
          const appToken = getAppTokens(userData._id, res);
          return { appToken, user: userData };
        }
      } catch (err) {
        throw err;
      }
    },
    getUserDataForPoll: async (parent, args, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }
      try {
        const user = await User.findById(id);

        return user._doc;
      } catch (err) {
        throw err;
      }
    },
    showFavorites: async (parent, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(userId);

        if (user && user.favorites && user.favorites.length === 0) {
          throw new Error(
            "No Favorites Found.  Click on the heart icon on any poll to add your favorite polls and answers."
          );
        }

        if (user && user.favorites.length > 0) {
          let pollIdList: string[] = [];
          let answersList: string[] = [];
          user.favorites.forEach((item) => {
            if (item.favoriteType === "Poll") {
              pollIdList.push(item.favoriteId);
            } else if (item.favoriteType === "Answer") {
              answersList.push(item.favoriteId);
            }
          });

          const pollDetails: IPoll[] = await batchPolls(pollIdList);
          const pollFinalDetails: PollHistory[] = pollDetails.map((item) =>
            transformPoll(
              item,
              dataLoaders(["user", "topic", "subTopic", "answer", "chat"])
            )
          );
          const answerDetails: IAnswer[] = await batchAnswers(answersList);

          return {
            favoritePolls: pollFinalDetails,
            favoriteAnswers: answerDetails,
          };
        }
      } catch (err) {
        throw err;
      }
    },
    isFavorite: async (parent, { favType, favId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(id);

        if (user && user.favorites && user.favorites.length > 0) {
          return user.favorites.some(
            (item) =>
              item.favoriteType === favType && String(item.favoriteId) === favId
          );
        }
      } catch (err) {
        throw err;
      }
    },
    getAppUserData: async (parent, { userId }, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;

      const user = await User.findOne({ appid: userId });

      if (user) {
        const userData = transformUser(user, dataLoaders(["poll"]));
        userData.isAppUser = id === String(user._id);
        return userData;
      }
    },
    getFollows: async (parent, args, context) => {
      const { isAuth, req, res, dataLoaders } = context;
      const { auth, id } = isAuth;

      try {
        const user: IUser = await User.findById(id);
        return user.following;
      } catch (err) {
        throw err;
      }
    },
    // getUserMetrics: async (parent, { userId }, context) => {},
  },
  Mutation: {
    login: async (parent, { credentials }, context) => {
      const { email, password } = JSON.parse(credentials);

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User does not exist. Please register");
      }

      if (user.password) {
        const pwMatch = await bcrypt.compare(password, user.password);

        if (!pwMatch) {
          throw new Error("Password is incorrect");
        }

        const appToken = getAppTokens(user.id, context.res);

        return appToken;
      }
    },
    createNewUser: async (parent, { formInputs }, context) => {
      const formObj = JSON.parse(formInputs);
      let existingUser: IUser;

      try {
        existingUser = await User.findOne({ email: formObj.email });

        if (existingUser) {
          throw new Error("Email already exists! Please log in.");
        }

        const hashedPW = await bcrypt.hash(formObj.password, 12);

        const user: IUser = new User({
          ...formObj,
          password: hashedPW,
        });

        const userSaveResult = await user.save();

        return {
          ...userSaveResult._doc,
          id: userSaveResult.id,
          password: null,
          registerDate: dateToString(userSaveResult._doc.registerDate),
        };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (parent, { formInputs }, ctx) => {
      const formObj = JSON.parse(formInputs);
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        await User.findByIdAndUpdate(
          id,
          { ...formObj },
          { new: true, upsert: true }
        );

        return "User updated";
      } catch (err) {
        throw err;
      }
    },
    addFollow: async (parent, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(id);

        const followMatch = user.following?.some(
          (item) => item.appId === userId
        );

        if (followMatch) {
          throw new Error("User is already being followed.");
        }

        const appUser: IUser = await User.findOne({ appid: userId });

        if (!appUser) {
          throw new Error("User does not exist!");
        }

        const followedUser = {
          appId: userId,
          profilePic: appUser.profilePic,
        };

        !user.following || user.following.length == 0
          ? (user.following = [followedUser])
          : user.following.push(followedUser);

        await user.save();
        return user.following[user.following.length - 1];
      } catch (err) {
        throw err;
      }
    },
    removeFollow: async (parent, { userId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(id);

        const itemToBeRemoved = user.following?.filter(
          (item) => item.appId === userId
        );

        const updatedFollows = user.following?.filter(
          (item) => item.appId !== userId
        );

        user.following = updatedFollows;

        await user.save();
        return itemToBeRemoved && itemToBeRemoved[0];
      } catch (err) {
        throw err;
      }
    },
    addFavorite: async (parent, { favoriteType, favoriteId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(id);
        if (user && user.favorites) {
          const favMatch = user.favorites.some(
            (item) => String(item.favoriteId) === favoriteId
          );

          if (favMatch) {
            throw new Error(`${favoriteType} is already saved as a favorite`);
          }

          user.favorites.push({ favoriteId, favoriteType });
          const savedUser = await user.save();
          return savedUser.favorites[savedUser.favorites.length - 1];
        }
      } catch (err) {
        throw err;
      }
    },
    removeFavorite: async (parent, { favoriteType, favoriteId }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      try {
        const user: IUser = await User.findById(id);
        if (user && user.favorites) {
          const removedFavorite = user.favorites.find(
            (item) => String(item.favoriteId) === favoriteId
          );

          user.favorites = user.favorites.filter(
            (item) => String(item.favoriteId) !== favoriteId
          );

          await user.save();
          return removedFavorite;
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
