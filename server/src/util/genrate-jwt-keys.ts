import { IUser } from "../models/user.model";
import JWT from "jsonwebtoken";

const genrateAccessToken = (user: IUser) => {
  return JWT.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "10m" }
  );
};

const genrateRefreshToken = (user: IUser) => {
  return JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_TOKEN!,
    { expiresIn: "7d" }
  );
};

export { genrateAccessToken, genrateRefreshToken };
