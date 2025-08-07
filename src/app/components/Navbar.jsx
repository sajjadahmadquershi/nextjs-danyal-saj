'use client';

import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import GlobalShareButtons from "./GlobalShareButtons";

const navLinks = [
  { title: "About", path: "/#about" },
  { title: "Projects", path: "#projects" },
  {
    title: "Blog",
    dropdown: [
      { title: "CNC Blog", path: "/blog/blog-cnc" },
      { title: "Web Blog", path: "/blog/blog-web" },
      { title: "Web Portfolio", path: "/web" },
      { title: "2D,CNC Portfolio", path: "/" },
    ]
  },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700 text-textmain-100 shadow-lg">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href="/"
          aria-label="Sajjad Ahmad Portfolio 2D,3D CNC"
          className="text-2xl md:text-4xl font-bold text-white  transition-colors duration-300"
        >
          Sajjad Ahmad
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="mobile-menu block md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 border rounded-lg border-neutral-600 text-textmain-100 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-5">
              <XMarkIcon
                className={`absolute h-5 w-5 transition-all duration-300 ${navbarOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
              />
              <Bars3Icon
                className={`absolute h-5 w-5 transition-all duration-300 ${navbarOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
              />
            </div>
          </button>
        </div>

        {/* Desktop Nav Menu */}
        <div className="menu hidden md:flex md:items-center md:gap-8">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index} className="relative group text-white">
                {link.dropdown ? (
                  <>
                    <button
                      className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-neutral-800/50"
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <span>{link.title}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-300 ${
                          openDropdown === index ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                    <ul
                      className={`absolute left-0 bg-neutral-800/95 backdrop-blur-sm mt-1 rounded-lg shadow-xl z-50 min-w-[180px] border border-neutral-700 transition-all duration-300 ${
                        openDropdown === index
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      onMouseEnter={() => setOpenDropdown(index)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.dropdown.map((sublink, idx) => (
                        <li key={idx}>
                          <Link
                            href={sublink.path}
                            className="block px-4 py-3 text-sm hover:bg-neutral-700/80 hover:text-blue-400 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {sublink.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : link.path ? (
                  <div className="py-2 px-3 rounded-lg hover:bg-neutral-800/50 transition-colors duration-300">
                    <NavLink href={link.path} title={link.title} />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          {/* Share Button for Desktop */}
          <div className="ml-4 hidden md:block">
            <GlobalShareButtons title="Check out this amazing portfolio!" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        navbarOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {navbarOpen && (
          <>
            <MenuOverlay links={navLinks} />

            {/* Share Button for Mobile */}
            <div className="flex justify-center mt-4 mb-4 px-4 z-50">
              <GlobalShareButtons
                title="Share this portfolio!"
                label="Share this page:"
                popupDirection="top"
                positionClass="left-1/2 transform -translate-x-1/2"
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;