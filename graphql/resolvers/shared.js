import jwt from "jsonwebtoken";
import DataLoader from "dataloader";
// import { parse } from "cookie";
import { dateToString } from "../../components/globalFuncs";
import User from "../../models/UserModel";
import Poll from "../../models/PollModel";

const {
  JWT_KEY,
  REFRESH_TOKEN_EXPIRES,
  JWT_TOKEN_EXPIRES,
  REFRESH_KEY,
} = process.env;

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * parseInt(REFRESH_TOKEN_EXPIRES);

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  // domain: process.env.BASE_URL.split("//")[1].split(":")[0],
  httpOnly: true,
  // secure: true,
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
  // sameSite: "none",
  // secure: !!process.env.BASE_URL.includes("https"),
};

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const pollLoader = new DataLoader((pollIds) => {
  return prepPollHistory(pollIds);
});

const prepPollHistory = async (pollIds) => {
  try {
    const polls = await Poll.find({ _id: { $in: pollIds } });
    polls.sort((a, b) => {
      return (
        pollIds.indexOf(a._id.toString()) - pollIds.indexOf(b._id.toString())
      );
    });

    return polls.map((poll) => {
      return transformPoll(poll);
    });
  } catch (err) {
    throw err;
  }
};

const generateAccessToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, { expiresIn: `${JWT_TOKEN_EXPIRES}min` });
};

const generateRefreshToken = (id) => {
  const tokenExpiry = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE);

  const refreshToken = jwt.sign({ id }, REFRESH_KEY, {
    expiresIn: `${REFRESH_TOKEN_EXPIRES}d`,
  });

  return {
    refreshToken,
    expiry: tokenExpiry,
    options: REFRESH_TOKEN_COOKIE_OPTIONS,
  };
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      pollHistory: () => pollLoader.loadMany(user._doc.pollHistory),
    };
  } catch (err) {
    throw err;
  }
};

const transformUser = (user) => {
  const { password, ...rest } = user;

  return {
    ...rest._doc,
    registerDate: dateToString(rest._doc.registerDate),
    pollHistory: () => pollLoader.loadMany(rest._doc.pollHistory),
  };
};

const transformPoll = (poll) => {
  return {
    ...poll._doc,
    _id: poll.id,
    creationDate: dateToString(poll._doc.creationDate),
    creator: user.bind(this, poll.creator),
  };
};

module.exports = {
  getAppTokens: (id, res) => {
    const accessToken = generateAccessToken(id);
    const appCookie = generateRefreshToken(id);
    const { refreshToken, options } = appCookie;

    res.cookie("poldIt-Session", refreshToken, options); //Store refresh token cookie on browser

    return accessToken;
  },
  clearAppCookie: (res) => {
    //Clear current cookie from browser
    res.cookie("poldIt-Session", "", {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
      maxAge: -1,
    });
  },
  transformPoll,
  transformUser,
};
