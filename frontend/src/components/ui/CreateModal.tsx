import {  useRef, useState } from "react";
import { Button } from "./Button"
import { useOnClickOutside } from "../../hooks/OnClickOutside";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

      enum ContentType {
        Youtube = "youtube",
        Twitter = "twitter",
        Document = "document",
        Image = "image",
        Link = "link"
      }

export const CreateModal = ({ open, onClose }) => {
      const[link, setLink] = useState("");
      const[title, setTitle] = useState("");
      const [type,setType] = useState(ContentType.Youtube);
      const [tags, setTags] = useState("");
      const [tagTitles, setTagTitles] = useState<string[]>([])

      const modalRef = useRef<HTMLDivElement | null>(null);
      useOnClickOutside(modalRef, onClose);
      if (!open) return null;

      if (!open) return null;

      async function addContent(){
        await axios.post(BACKEND_URL + "/api/v1/content" ,{
          link,
          title,
          type,
          tagTitles
        },{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      setTitle("");
      setLink("");
      setTagTitles([]);
      setTags("")
        onClose();
      }
  return (
    <>
      {open && (
        <div className="h-screen w-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center">
          <div ref={modalRef} className="bg-white px-6 py-8 border rounded-xl shadow-lg w-[25%] max-w-md dark:bg-[#282828]">
            <div className="flex flex-col gap-4">

                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              <div>
                <h1 className="dark:text-gray-200">Type:</h1>
                <div className="flex flex-wrap gap-2 py-3">
                  <Button 
                    size="sm"
                    text="youtube" 
                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                    onClick={() => {setType(ContentType.Youtube)}} 
                  />
                  <Button 
                    size="sm"
                    text="twitter" 
                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                    onClick={() => {setType(ContentType.Twitter)}} 
                  />
                  <Button 
                    size="sm"
                    text="document" 
                    variant={type === ContentType.Document ? "primary" : "secondary"}
                    onClick={() => {setType(ContentType.Document)}} 
                  />
                  <Button 
                    size="sm"
                    text="image" 
                    variant={type === ContentType.Image ? "primary" : "secondary"}
                    onClick={() => {setType(ContentType.Image)}} 
                  />
                  <Button 
                    size="sm"
                    text="link" 
                    variant={type === ContentType.Link ? "primary" : "secondary"}
                    onClick={() => {setType(ContentType.Link)}} 
                  />
                </div>
              </div>
                <div>
                  <h1 className="dark:text-gray-200 mb-1">Tags</h1>
                  <div className="flex flex-wrap gap-2 mb-2" >
                    {tagTitles.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded-full flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() =>
                            setTagTitles(tagTitles.filter((t) => t !== tag))
                          }
                          className="ml-2 text-red-500 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    placeholder="Enter tag and press Enter or ,"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const trimmed = tags.trim();
                        if (trimmed && !tagTitles.includes(trimmed)) {
                          setTagTitles([...tagTitles, trimmed]);
                        }
                        setTags("");
                      }
                    }}
                    className="border rounded w-full px-3 py-2 dark:border-gray-100/70 dark:placeholder-gray-100/60"
                  />
                </div>
              <Button
                variant="secondary"
                size="md"
                text={"Submit"}
                onClick={addContent}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

