import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isVerified: boolean;
  isAdmin: boolean;
  isSeller: boolean;
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
    country: string;
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
}

interface UserModel extends Model<IUser, {}, IUserMethod> {
  login: (email: string, password: string) => Promise<string>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethod>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
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
      country: { type: String },
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
  return JWT.sign({ id: this._id, isAdmin: this.isAdmin, isSeller: this.isSeller }, process.env.JWT_SECRET!, { expiresIn: "10d" });
};

UserSchema.statics.login = async function (email, password): Promise<string> {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user.generateJWTToken();
    }
    throw Error("Incorrect Credentials");
  }
  throw Error("User does not exist with this email");
};

export default mongoose.model<IUser, UserModel>("User", UserSchema);
