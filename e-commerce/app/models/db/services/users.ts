import { pool } from "@/db";
import { request } from "http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

export type LoginUser = {
  email: string;
  password: string;
};



const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const Login = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * from users WHERE email = $1`, [
    email.toLocaleLowerCase(),
  ]);

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  if (result) {
    const hashedPassword = result.rows[0].password;
    const isMatch = await comparePassword(password, hashedPassword);
    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, email: user.email, roleId: user.role_id },
      process.env.NEXTAUTH_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );
    if (isMatch) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        country: user.country,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: user.password,
        role_id: user.role_id,
        is_deleted: 0,
        token: token,
      };
    } else {
      throw new Error(" Please check the password");
    }
  } else {
    throw new Error("Invalid credentials");
  }
};
