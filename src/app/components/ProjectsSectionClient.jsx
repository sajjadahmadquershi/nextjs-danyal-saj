"use client";
import { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";
const ProjectsSectionClient = ({ initialProjects = [], initialTags = [], category }) => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const filteredProjects = initialProjects.filter((project) =>
    tag === "All" ? true : project.tag?.includes(tag)
  );

  return (
    <section id="projects" style={{ opacity: 1 }}>
      {filteredProjects.length === 0 && (
        <p className="text-center text-textmain-100" style={{ opacity: 1 }}>
          No projects available for this category.
        </p>
      )}
      <div className="flex flex-row justify-center items-center gap-2 py-6 flex-wrap" style={{ opacity: 1 }}>
        {initialTags.map((t, index) => (
          <ProjectTag
            key={index}
            onClick={() => setTag(t)}
            name={t}
            isSelected={tag === t}
          />
        ))}
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8" style={{ opacity: 1 }}>
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: index * 0.2 }}
            style={{ opacity: 1 }}
          >
            <ProjectCard
              title={project.title}
              image_url={project.image_url}
              gitUrl={project.gitUrl}
              previewUrl={project.web_link}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
export default ProjectsSectionClient;