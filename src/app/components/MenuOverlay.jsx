
import Link from "next/link";
import { useState } from "react";

const MenuOverlay = ({ links }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full px-4 pt-2 pb-4 bg-neutral-900 text-white md:hidden">
      <ul className="flex flex-col space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            {link.dropdown ? (
              <>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left font-semibold hover:text-yellow-400"
                >
                  {link.title}
                </button>
                {openIndex === index && (
                  <ul className="mt-2 space-y-2 pl-4">
                    {link.dropdown.map((sublink, idx) => (
                      <li key={idx}>
                        <Link
                          href={sublink.path}
                          className="block hover:text-sky-400"
                        >
                          {sublink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={link.path}
                className="block hover:text-sky-400"
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuOverlay;
