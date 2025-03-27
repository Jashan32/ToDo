import {Router} from "express";
import { z } from "zod";


const signupRouter = Router();
signupRouter.post("/", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const toParse={
        email:email,
        password:password
    }

    const credentailsSchema = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
          .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
          .regex(/\d/, { message: "Password must contain at least one number" })
          .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" })
      });
      
      const result = credentailsSchema.safeParse(toParse);
      if(!result.success){
        res.json({
            message:result.error.format()
        })
      }
      else{
        
      }



})

export {
    signupRouter
}