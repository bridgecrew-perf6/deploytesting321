import User from "../../models/UserModel";
import Image from "../../models/ImageModel";
import { transformUser, transformImg } from "./shared";
import { ResolverMap } from "../../components/appTypes/appType";
import IUser from "../../models/interfaces/user";
import Iimage from "../../models/interfaces/image";

export const imageResolvers: ResolverMap = {
  Query: {
    images: async (parent, args, { dataLoaders }) => {
      try {
        const images = await Image.find();
        const imageData = images.map((img) =>
          transformImg(img, dataLoaders(["user"]))
        );
        return imageData;
      } catch (error) {
        throw new Error(error);
      }
    },
    imagesByType: async (parent, { imgType }, { dataLoaders }) => {
      try {
        const images = await Image.find({ imgType });
        const imageData = images.map((img) =>
          transformImg(img, dataLoaders(["user"]))
        );
        return imageData;
      } catch (error) {
        throw new Error(error);
      }
    },

    userImages: async (parent, { userId }, { dataLoaders }) => {
      try {
        const userImgs = await Image.find({ creator: userId });
        const userImgData = userImgs.map((userImg) =>
          transformImg(userImg, dataLoaders(["user"]))
        );

        return userImgData;
      } catch (err) {
        throw new Error(err);
      }
    },
    userImagesByType: async (parent, { userId, imgType }, { dataLoaders }) => {
      try {
        const userImgsByType = await Image.find({ creator: userId, imgType });
        const userImgTypeData = userImgsByType.map((imgItem) =>
          transformImg(imgItem, dataLoaders["user"])
        );
        return userImgTypeData;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    uploadImage: async (_, { details }, ctx) => {
      const { isAuth, req, res, dataLoaders } = ctx;
      const { auth, id } = isAuth;

      if (!auth) {
        throw new Error("Not Authenticated.  Please Log In!");
      }

      const detailObj = JSON.parse(details);

      const image = new Image({
        ...detailObj,
        creator: id,
      });

      try {
        const savedImage = await image.save();
        const createdImg = transformImg(savedImage, dataLoaders(["user"]));

        const creator = await User.findById(id);

        if (!creator) {
          throw new Error("User not found");
        }

        if (creator.imgHistory) {
          creator.imgHistory.push(image._id);
        } else creator.imgHistory = [image._id];

        await creator.save();
        return createdImg;
      } catch (err) {
        throw err;
      }
    },
  },
};
