import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { genrateRefreshToken } from "../util/genrate-jwt-keys";
import { UnAuthorized, BadRequestError } from "../errors";

export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  SELLER = "seller",
}
export interface IToken {
  accessToken: string;
  role: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isVerified: boolean;
}
export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isVerified: boolean;
  role: string;
  contactNo: string;
  seller: {
    storeName: string;
    logo: string;
    description: string;
    rating: number;
    numReviews: number;
  };
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId;
          ref: "Product";
        };
      }
    ];
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    provience: string;
  };
  paymentMethod: string;
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: "Order";
    }
  ];
}

interface IUserMethod {
  generateJWTToken: () => string;
  resetPassword: (password: string) => Promise<string>;
}

interface UserModel extends Model<IUser, {}, IUserMethod> {
  login: (email: string, password: string) => Promise<IToken>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethod>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String },
    role: { type: String, enum: ROLES, default: ROLES.USER },
    contactNo: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
    seller: {
      name: { type: String },
      logo: { type: String },
      description: { type: String },
      rating: { type: Number, default: 0 },
      numReviews: { type: Number, default: 0 },
    },
    cart: {
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: String },
      provience: { type: String },
    },
    paymentMethod: { type: String },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.generateJWTToken = function () {
  return JWT.sign({ id: this._id, role: this.role, firstName: this.firstName, lastName: this.lastName, avatar: this.avatar }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

UserSchema.methods.resetPassword = async function (password: string) {
  const salt = await bcrypt.genSalt();
  console.log("salt", password);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.login = async function (email, password): Promise<IToken> {
  const user = await this.findOne({ email });
  if (user) {
    console.log("userpassword", user.password);
    console.log("password", password);
    const IsPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(IsPasswordMatched);
    if (IsPasswordMatched) {
      return {
        accessToken: user.generateJWTToken(),
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isVerified: user.isVerified,
      };
    }
    throw new UnAuthorized("Incorrect Credentials");
  }
  throw new BadRequestError("User does not exist with this email");
};

export default mongoose.model<IUser, UserModel>("User", UserSchema);
