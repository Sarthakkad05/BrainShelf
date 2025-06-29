import { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function signup(){
        await axios.post(BACKEND_URL + "/api/v1/signup" , {
            username,
            password
        });
        navigate("/dashboard") 
        
    }
    return(
         <div className="h-screen w-screen bg-gray-100 fixed top-0 left-0 flex justify-between">
          <div className="w-[40%] flex items-center justify-center">
            <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="light-mode"
              className="w-full h-full object-cover block dark:hidden"
            />
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="dark-mode"
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>
          <div className="w-[60%] flex justify-center items-center dark:bg-gradient-to-r dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="text-4xl text-center dark:text-white mb-12">
                Signup to Brainly
              </div>
              <div className="text-lg text-center dark:text-gray-300">
                Please note your username and password to signin
              </div>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="tertiary"
                  size="lg"
                  text="Sign up"
                  onClick={signup}
                />
                <div className="text-sm text-red-400 dark:text-red-300">
                Strong password required eg.Example#123
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
    );
}