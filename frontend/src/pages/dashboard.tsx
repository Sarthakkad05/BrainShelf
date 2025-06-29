import { useEffect, useState } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Cards"
import { CreateModal } from "../components/ui/CreateModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/ui/Sidebar"
import { useContents } from "../hooks/useContents"
import axios from "axios"
import { BACKEND_URL } from "../config"

import { useTheme } from "../context/theme-context"
import { useNavigate } from "react-router-dom"
import { MoonIcon } from "../icons/MoonIcon"
import { SunIcon } from "../icons/SunIcon"


const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [filterType, setFilterType] = useState<"twitter" | "youtube" | "document" | "image" | "link">("youtube");
  const { contents, refresh } = useContents();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refresh();
  }, []);
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);



  const filteredContents = contents.filter(content => content.type === filterType);

  return (
    <div>
      <Sidebar setFilterType={setFilterType} />
      <div className="min-h-screen bg-gray-100 ml-68 dark:bg-black">
        <CreateModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-end gap-4 p-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-full text-xl text-gray-700 dark:text-white transition mr-3"
        >
          {isDark ? <SunIcon size="lg"/> : <MoonIcon size="lg"/>}
        </button>
          <Button
            startIcon={<PlusIcon size={"md"} />}
            variant="tertiary"
            size="md"
            text={"Add content"}
            onClick={() => setModalOpen(true)}
          />
          <Button
            startIcon={<ShareIcon size={"md"} />}
            variant="secondary"
            size="md"
            text={"Share Brain"}
            onClick={async () => {
              const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true,
              }, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              });
              const ShareUrl = `http://localhost:5173/share/${res.data.hash}`;
              await navigator.clipboard.writeText(ShareUrl);
              alert("Link Copied to clipboard!");
            }}
          />
        </div>
          <div className="pl-6 pb-2">
            <input
              type="text"
              placeholder="Search by title or tags..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                refresh(value); 
              }}
              className="px-4 py-2 w-80 border dark:border-gray-100/60 rounded dark:bg-black dark:text-white"
            />
          </div>

        <div className="flex flex-wrap gap-2 p-4">
          {filteredContents.map(({ title, link, type, _id, tags }) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              contentId={_id}
              tags={tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;