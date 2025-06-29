import { useNavigate } from "react-router-dom"
import { Logo } from "../../icons/Logo"
import { Button } from "./Button"
import { useTheme } from "../../context/theme-context"
import { SunIcon } from "../../icons/SunIcon";
import { MoonIcon } from "../../icons/MoonIcon";

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full px-12 py-4 items-center shadow-md z-50 dark:text-white text-black">
      <div className="flex justify-center items-center">
        <div className="text-[#5046e4] pr-3">
          <Logo />
        </div>
        <div className="text-3xl font-bold">BrainShelf</div>
      </div>
      <div className="flex gap-6 font-semibold text-sm">
        <a className="hover:text-[#5046e4] transition" href="#">Features</a>
        <a className="hover:text-[#5046e4] transition" href="#">How It Works</a>
        <a className="hover:text-[#5046e4] transition" href="#">Testimonials</a>
        <a className="hover:text-[#5046e4] transition" href="#">Pricing</a>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-full text-xl text-gray-700 dark:text-white transition mr-3"
        >
          {isDark ? <SunIcon size="lg"/> : <MoonIcon size="lg"/>}
        </button>
        <Button
          size="md"
          text="Sign in"
          variant="secondary"
          onClick={() => navigate("/signin")}
        />
        <Button
          size="md"
          text="Sign up"
          variant="tertiary"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};
