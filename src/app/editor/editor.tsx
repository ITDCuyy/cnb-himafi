"use client";

import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  onSave: (data: OutputData) => void; // callback for saving
}

export default function Editor({ onSave }: EditorProps) {
  const editorRef = useRef<EditorJS>();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your post...",
        tools: {
          header: require("@editorjs/header"),
          list: require("@editorjs/list"),
        },
      });
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = undefined;
    };
  }, []);

  async function handleSave() {
    const savedData = await editorRef.current?.save();
    if (savedData) onSave(savedData);
  }

  return (
    <div>
      <div id="editorjs" className="min-h-[400px] border p-2" />
      <button
        onClick={handleSave}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Save Post
      </button>
    </div>
  );
}
