import { userModel } from "../../../Database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents client-side access to the cookie
  secure: process.env.NODE_ENV === 'production', // Only sends cookie over HTTPS in production
  sameSite: 'strict', // Protects against CSRF
  maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

const signUp = catchAsyncError(async (req, res, next) => {
  // console.log(req.body.email);
  let isUserExist = await userModel.findOne({ email: req.body.email });
  if (isUserExist) {
    return next(new AppError("Account is already exist!", 409));
  }
  const user = new userModel(req.body);
  await user.save();

  let token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    "JR"
  );
  res.status(201).json({ message: "success", user, token });
});

const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("Invalid email or password", 401));
  }
  let token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    "JR"
  );
  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(201).json({ message: "success", user: user, token });
});

const protectedRoutes = catchAsyncError(async (req, res, next) => {
  console.log("cookie: " + req.cookies.token);
  console.log("headers: " + req.headers);
  const token = req.headers.token || req.cookies.token;
  if (!token) return next(new AppError("Token was not provided!", 401));

  let decoded = await jwt.verify(token, "JR");

  // console.log(decoded);
  // console.log(decoded.iat);

  let user = await userModel.findById(decoded.id);
  if (!user) return next(new AppError("Invalid user", 404));
  // console.log(user);
  // console.log(user.passwordChangedAt);

  if (user.passwordChangedAt) {
    let passwordChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (passwordChangedAt > decoded.iat)
      return next(new AppError("Invalid token", 401));
  }
  // console.log(decoded.iat, "-------------->",passwordChangedAt);

  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          `You are not authorized to access this route. Your are ${req.user.role}`,
          401
        )
      );
    next();
  });
};
export { signUp, signIn, protectedRoutes, allowedTo };
