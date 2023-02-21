import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
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

interface IUSerMethod {
  login: (email: string, password: string) => Promise<IUser>;
}

interface UserModel extends Model<IUser> {
  login: (email: string, password: string) => Promise<IUser>;
}

const UserSchema = new Schema<IUser, UserModel, IUSerMethod>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    }
    throw Error("Incorrect password");
  }
  throw Error("User does not exist with this email");
};

export default mongoose.model<IUser, UserModel>("User", UserSchema);
