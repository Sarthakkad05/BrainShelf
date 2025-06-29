import { Features } from "../components/ui/Features"
import { Button } from "../components/ui/Button"
import { HomeCard } from "../components/ui/HomeCard"
import { Navbar } from "../components/ui/Navbar"
import { useNavigate } from "react-router-dom"
import { Footer } from "../components/ui/Footer"


export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-black dark:bg-gradient-to-r dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
      <Navbar />

      <div className="flex flex-col items-center py-12">
        <div className="flex flex-col items-center text-6xl font-bold pb-4 pt-14 dark:text-white">
          <div>Your Personal <span className="text-purple-400">Knowledge</span></div>
          <div>Assistant</div>
        </div>
        <div className="flex flex-col items-center text-xl text-gray-500 dark:text-gray-400 pb-8">
          <div> Organize, share, and discover knowledge with Brainly. Connect with </div>
          <div>experts and learn from the best.</div>
        </div>
        <div className="flex gap-8">
          <Button
            size="lg"
            text="Sign up for free ..."
            variant="tertiary"
            onClick={() => navigate("/signup")}
          />
          <Button
            size="lg"
            text="Learn more"
            variant="secondary"
            onClick={() => {}}
          />
        </div>
      </div>

      <HomeCard />
      <Features />
      <Footer />
    </div>
  );
};



