import { Request, Response } from "express";
import * as UserServices from "../service/user.service";

export const getAllUsertList = async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  res.status(200).json({ users });
};

export const getOneUser = async (req: Request, res: Response) => {
  const user = await UserServices.findUserById(req.params.id);
  res.status(200).json({ user });
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const user = await UserServices.UpdateUser(req.params.id, req.body);
  res.status(200).json({ user });
};

export const addItemsToCart = async (req: Request, res: Response) => {};

export const removeItemsFromCart = async (req: Request, res: Response) => {};

export const updateItemsInCart = async (req: Request, res: Response) => {};
