import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/database";
import bcrypt  from "bcrypt";
import User from "@/models/User";

export const POST = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(
        "Username, email and password are required", 
        { status: 400 }
      );
    }

    const isExistingUser = await User.findOne({ email })
    if (isExistingUser) {
      return new Response("User with this email already exists", {
        status: 409,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response("User created successfully", {
      status: 201,
    });

  } catch (error) {
    console.error(error);
    return new Response("Failed to create a  new user", {
      status: 500,
    })
  }
}