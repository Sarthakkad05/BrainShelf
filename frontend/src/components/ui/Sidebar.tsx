import { useNavigate } from "react-router-dom";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { ImageIcon } from "../../icons/ImageIcon";
import { Link2Icon } from "../../icons/Link2Icon";
import { Logo } from "../../icons/Logo"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

interface SidebarProps {
  setFilterType: (type: "twitter" | "youtube"| "document" | "image" | "link") => void;
}

export const Sidebar = ({ setFilterType }: SidebarProps) => {
    const navigate = useNavigate();
  
function logout() {
  localStorage.removeItem("token");
  navigate("/signin");              
}

 return (
    <div className="h-screen bg-white dark:border-gray-100/50 border-r border-gray-300 w-68 fixed left-0 top-0 pl-6 dark:bg-[#181818] flex flex-col justify-between">
      <div>
        <div className="flex text-3xl pt-8 items-center">
          <div className="pr-2 text-[#5046e4] dark:text-white">
            <Logo />
          </div>
          <div className="dark:text-white text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>BrainShelf</div>
        </div>
        <div className="pt-8 pl-4">
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => setFilterType("youtube")} />
          <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilterType("twitter")} />
          <SidebarItem text="Documents" icon={<DocumentIcon />} onClick={() => setFilterType("document")} />
          <SidebarItem text="Images" icon={<ImageIcon />} onClick={() => setFilterType("image")} />
          <SidebarItem text="Links" icon={<Link2Icon />} onClick={() => setFilterType("link")} />
        </div>
      </div>
      <div className="mb-6 pl-4">
        <button 
          className="rounded-lg cursor-pointer bg-red-500 px-7 text-white py-2 text-md"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};
