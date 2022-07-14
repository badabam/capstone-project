import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env

if(!JWT_SECRET){
  throw new Error("JWT_SECRET not set")
}

export function createToken(user){
  return jwt.sign({
    sub: user._id,
    name: user.username
  }, JWT_SECRET)
}
