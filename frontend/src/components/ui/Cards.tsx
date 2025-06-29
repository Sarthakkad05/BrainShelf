
import axios from "axios";
import { DeleteIcon } from "../../icons/Deleteicon";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { BACKEND_URL } from "../../config";
import { LinkIcon } from "../../icons/LinkIcon";
import { useTheme } from "../../context/theme-context";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "document" | "image" | "link",
    contentId: string,
    tags: { _id: string; title: string }[];
}

// Helper to extract tweet ID
const extractTweetId = (url: string): string | null => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
};
    const getFileExtension = (url: string): string => {
    return url.split('.').pop()?.toLowerCase() || '';
    };

export const Card = ({ title, link, type, contentId, tags}: CardProps) => {

    const tweetId = type === "twitter" ? extractTweetId(link) : null;
    const { isDark } = useTheme();

    const handleDelte = () => {
       try {const token = localStorage.getItem("token");
        axios.delete(BACKEND_URL + "/api/v1/content",{
            data: { contentId },
            headers:{Authorization: `Bearer ${token}`}
        });
       } catch (error) {
        console.error("Delete failed:", error);
       } 
    }

    return (
        
         <div className="p-1">
            <div className="max-w-72 bg-white dark:text-white rounded-lg border border-gray-300 dark:border-gray-200/40 dark:bg-black">
                <div className="p-2">
                    {type === "youtube" && (
                        <iframe
                            className="w-full rounded-lg"
                            src={link.replace("watch", "embed").replace("?v=","/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {type === "twitter" && tweetId && (
                            <TwitterTweetEmbed
                            key={isDark ? "dark" : "light"}
                                tweetId={tweetId} 
                                options={{
                                theme: isDark ? "dark" : "light",
                        }}/>
                    )}
                    {type === "document" && (() => {
                        const ext = getFileExtension(link);
                        
                        if (ext === "pdf") {
                            return (
                            <iframe
                                src={link}
                                className="w-full h-64 rounded"
                                title={title}
                                frameBorder="0"
                            />
                            );
                        }

                        const officeExtensions = ["doc", "docx", "ppt", "pptx", "xls", "xlsx"];
                        if (officeExtensions.includes(ext)) {
                            return (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(link)}`}
                                className="w-full h-64 rounded"
                                title={title}
                                frameBorder="0"
                            />
                            );
                        }
                        return (
                            <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                            >
                            View Document
                            </a>
                        );
                        })()}
                    {type === "image" && (
                        <img
                            src={link}
                            alt={title}
                            className="w-full h-64 object-cover rounded"
                            onError={(e) => (e.currentTarget.src = "/fallback.png")}
                        />
                    )}
                    {type === "link" && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-words"
                        >
                            {link}
                        </a>
                    )}
                </div>
                <div className="flex justify-between px-4 py-3">
                    <div className="flex text-lg items-center">
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-600 dark:text-gray-300">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <LinkIcon size="md"/>
                            </a>
                        </div>
                        <div onClick={handleDelte} className="text-red-500 cursor-pointer" >
                            <DeleteIcon size={"lg"} />
                        </div>
                    </div>
                </div>
                {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
                    Tags:
                    {tags.map(tag => (
                    <span
                        key={tag._id}
                        className="bg-gray-200 text-sm px-2 py-1 rounded-full dark:bg-gray-700 dark:text-white"
                    >
                        {tag.title}
                    </span>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};
