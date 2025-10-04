"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Default Quill styling

export default function RichTextEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],  // H1 to H6
        ["bold", "italic", "underline", "strike"], // text formatting
        [{ color: [] }, { background: [] }],     // text + background color
        [{ list: "ordered" }, { list: "bullet" }], // lists
        [{ indent: "-1" }, { indent: "+1" }],    // indentation
        [{ align: [] }],                         // text alignment
        ["link"],                                // links
        ["image"],                               // images
        ["clean"],                               // clear all formatting
      ],
    },
    formats: [
      'header', 'bold', 'italic', 'underline', 'strike',
      'color', 'background', 'list', 'bullet', 'indent',
      'align', 'link', 'image'
    ]
  });

  // Set initial content & update on change
  useEffect(() => {
    if (quill) {
      // Set initial content if different
      if (value !== quill.root.innerHTML) {
        quill.root.innerHTML = value || "";
      }

      // Listen for text changes
      const handleTextChange = () => {
        onChange(quill.root.innerHTML);
      };

      quill.on("text-change", handleTextChange);

      // Cleanup function
      return () => {
        quill.off("text-change", handleTextChange);
      };
    }
  }, [quill, value, onChange]);

  return (
    <div className="w-full border rounded overflow-hidden bg-white shadow">
      <div
        ref={quillRef}
        className="min-h-[300px] max-h-[500px] overflow-auto"
      />
    </div>
  );
}
