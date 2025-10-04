
"use client";
import { useState } from "react";
import ProjectTag from "@/app/components/ProjectTag";

const AdminTags = ({ tags = ["All"], onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState("All");

  const handleClick = (tag) => {
    setSelectedTag(tag);
    onTagSelect(tag);
  };

  return (
    <section className="p-4">
      <h3 className="text-2xl font-bold text-slate-100 mb-4">All Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <ProjectTag
              key={index}
              name={tag}
              isSelected={selectedTag === tag}
              onClick={() => handleClick(tag)}
            />
          ))
        ) : (
          <p className="text-textmain-100">No tags available.</p>
        )}
      </div>
    </section>
  );
};

export default AdminTags;