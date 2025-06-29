import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Tag {
  _id: string;
  title: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube"| "document" | "image" | "link";
  tags: Tag[];
}


export function useContents() {
    const [contents, setContents] = useState<Content[]>([]);
    const token = localStorage.getItem('token')

    function refresh(searchQuery = "") {
    const url = `${BACKEND_URL}/api/v1/content${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`;
    axios.get(url, {
        headers: {
        "Authorization": `Bearer ${token}`,
        }
    }).then(res => {
        setContents(res.data.content);
    });
    }

    useEffect(() => {
        refresh()
        let interval =  setInterval(() => {
            refresh();
        }, 1000);

        return(() => {
            clearInterval(interval); 
        })

    }, []);
    return {contents , refresh}; 
}