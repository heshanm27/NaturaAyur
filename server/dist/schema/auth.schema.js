"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = exports.createUserSignInSchema = exports.createUserSignUpSchema = void 0;
const zod_1 = require("zod");
exports.createUserSignUpSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        })
            .min(2, { message: "First name must be at least 2 characters" })
            .max(50, { message: "First name must be at most 50 characters" }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        })
            .min(2, { message: "Last name must be at least 2 characters" })
            .max(50, { message: "Last name must be at most 50 characters" }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email({ message: "Email must be a valid email address" }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        })
            .min(6, { message: "Password must be at least 6 characters" })
            .max(50, { message: "Password must be at most 50 characters" }),
        confirmPassword: (0, zod_1.string)({
            required_error: "Confirm password is required",
        })
            .min(6, { message: "Confirm password must be at least 6 characters" })
            .max(50, { message: "Confirm password must be at most 50 characters" }),
        address: (0, zod_1.object)({
            street: (0, zod_1.string)({}).min(2, { message: "Street must be at least 2 characters" }).max(150, { message: "Street must be at most 50 characters" }),
            city: (0, zod_1.string)({}).min(2, { message: "City must be at least 2 characters" }).max(50, { message: "City must be at most 50 characters" }),
            postalCode: (0, zod_1.string)({}).min(2, { message: "Postal code must be at least 2 characters" }).max(10, { message: "Postal code must be at most 10 characters" }),
            country: (0, zod_1.string)({}).min(2, { message: "Country must be at least 2 characters" }).max(50, { message: "Country must be at most 50 characters" }),
        }).optional(),
        avatar: (0, zod_1.string)({}).optional(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Confirm Password and Password  do not match",
    }),
});
exports.createUserSignInSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email({ message: "Email must be a valid email address" }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        })
            .min(6, { message: "Password must be at least 6 characters" })
            .max(50, { message: "Password must be at most 50 characters" }),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({
        required_error: "Email is required",
    }).email({ message: "Email must be a valid email address" }),
});
//# sourceMappingURL=auth.schema.js.map