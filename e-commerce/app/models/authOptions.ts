import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userInfo } from "os";
import { error } from "console";
import { Login } from "./db/services/users";

//! This used to override the next-auth default types
declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    firstName: string;
    id: number |string;
    email: string;
    token: string;
    role_id:number
    
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    id: number | string;
    token: string;
    email: string;
    serverProperty: string;
    role_id:number
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" } ,
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result:any = await Login(email,
          password,);      
          console.log("result: ",result);
          if (result) {
            return (result);
          }else {
            return null
          }
        
      },
    }),

  ],

  callbacks: {
    
    async jwt({ token, user , account, profile }) {
      
      if (user) {
        console.log("from  if (user) : ", user);
        
        token.id = user.id;
        token.role_id = user.role_id;
        token.email = user.email;
        token.token = user.token;
        token.serverProperty = "Server";
        token.firstName= user.firstName
       
        
      }
       if (account && profile) {

        
        console.log("account && profile: ",profile );

  
        
      token.accessToken = account.access_token as string;
        token.id = (profile as any).sub;
        token.email = (profile as any).email;
        token.firstName = (profile as any).given_name;
        token.token = account.access_token as string;
        token.role_id = 2;
        
        token.accessToken = account.access_token as string;
      }
   // console.log("token from auth : ",token);
      return token;
    },
  
    async session({ session, token }) {
      //! session: will contains the data that returned either via getServerSession() or via useSession()
      session.user = {
        id: +token.id,
        firstName: token.firstName,
        email: token.email,
        token: token.token,
        role_id:token.role_id
        
      };
console.log("session from auth : ",session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
   
    signOut: "home"
  },
   secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;