import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "you r not authenticated"));
  }
  jwt.verify(token,process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is invalid"));
    req.user = user;
    next();
  });
};
