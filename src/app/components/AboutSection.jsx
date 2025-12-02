"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "@/app/components/TabButton";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>SolidWorks</li>
        <li>Revit</li>
        <li>Aspire</li>
        <li>Lumion</li>
        <li>Sketch Up</li>
        <li>Adobe</li>
        <li>AutoCAD</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>Bs Computer science</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>CERTIFICATE IN 2D & 3D ANIMATION</li>
        <li>Adobe Certified Expert (ACE)</li>
      </ul>
    ),
  },
];

const TAB_DATA2 = [
  {
    title: "skills",
    id: "skills",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>HTML / CSS / JS</li>
        <li>React</li>
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li>Firebase</li>
        <li>Supabase</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>MySQL</li>
        <li>Laravel</li>
        <li>REST API</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>Bs Computer science</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      // Changed to 'list-inside' and 'text-left' for better alignment
      <ul className="list-disc list-inside text-left">
        <li>Web and Mobile App</li>
      </ul>
    ),
  },
];

const AboutSection = ({ aboutvideo }) => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const selectedVideo = aboutvideo;

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      className="text-textmain-100 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Video and About Us Section - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Video Section */}
          {/* <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-xl p-1 shadow-xl">
              {selectedVideo ? (
                <video
                  className="w-full rounded-lg shadow-lg"
                  width="500"
                  height="315"
                  src={selectedVideo}
                  controls
                  autoPlay={false}
                  muted
                  loop
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-red-500 font-medium">Video not available</p>
                </div>
              )}
            </div>
          </div> */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

            <div className="relative bg-white dark:bg-slate-800 rounded-xl p-1 shadow-xl">

              {!selectedVideo ? (
                // Nothing selected
                <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-red-500 font-medium">File not available</p>
                </div>
              ) : selectedVideo.match(/\.(mp4|webm|mov|mkv)$/i) ? (
                // Video Preview
                <video
                  className="w-full rounded-lg shadow-lg"
                  width="500"
                  height="315"
                  src={selectedVideo}
                  controls
                  muted
                  loop
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : selectedVideo.match(/\.(jpg|jpeg|png|webp|svg)$/i) ? (
                // Image Preview
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={selectedVideo}
                  alt="Preview"
                />
              ) : (
                // Unsupported file type
                <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-red-500 font-medium">Unsupported file type</p>
                </div>
              )}

            </div>
          </div>


          {/* About Us Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              About Us
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {pathname.includes("web")
                ? "We specialize in modern web development, combining clean code with user-focused design to create fast, responsive, and visually engaging websites. With hands-on expertise in React, Next.js, Laravel, and modern CSS frameworks like Tailwind, we build everything from sleek portfolios to dynamic web apps. Whether it's integrating databases like Firebase or Supabase, crafting RESTful APIs, or developing full-stack solutions — we bring ideas to life on the web. Let's build digital experiences that leave a lasting impression."
                : "We provide both 2D and 3D design services along with laser cutting-ready DXF files. Our work includes mechanical parts, architectural layouts, and detailed models using tools like SolidWorks, Revit, and Lumion. We also prepare files for CNC and laser cutting with precision and accuracy. Whether it's for printing, modeling, or production — we help turn your ideas into reliable and usable formats."}
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 max-w-4xl w-full">
            <div className="flex flex-wrap justify-center gap-2 mb-6 p-1 bg-black dark:bg-slate-900 rounded-xl">
              {["skills", "education", "certifications"].map((id) => (
                <div
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className="cursor-pointer"
                >
                  <TabButton selectTab={() => { }} active={tab === id}>
                    {id === "skills"
                      ? "We Use"
                      : id.charAt(0).toUpperCase() + id.slice(1)}
                  </TabButton>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 min-h-[200px]">
              <div className=" max-w-none">
                <div className="text-slate-700 dark:text-slate-300 text-center">
                  {pathname.includes("web")
                    ? TAB_DATA2.find((t) => t.id === tab)?.content
                    : TAB_DATA.find((t) => t.id === tab)?.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;