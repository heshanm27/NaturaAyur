import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e: any) {
    return res.status(400).json(
      e.errors.map((err: any) => {
        if (err.code === "custom") {
          return { ["custom"]: err.message };
        } else {
          return { [err.path[1]]: err.message };
        }
      })
    );
  }
};

export default validate;
