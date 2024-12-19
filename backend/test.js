import bcrypt from "bcrypt";
// import User from "../models/User.js";

const hashedPassword = await bcrypt.hash("testtest", 10);

console.log(hashedPassword);