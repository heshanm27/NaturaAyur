import CustomError from "./customError";
import status from "http-status-codes";

class Unauthorized extends CustomError {
  constructor(message: string) {
    super(message, status.UNAUTHORIZED);
  }
}

export default Unauthorized;
