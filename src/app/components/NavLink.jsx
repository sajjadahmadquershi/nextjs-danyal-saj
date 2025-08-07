
import Link from "next/link";

const NavLink = ({ href, title }) => {
  if (!href) return null;
  return (
    <Link
      href={href}
      aria-label={`View ${title} section`}
      className="block py-2 pl-3 pr-4 text-textmain-100 sm:text-base md:text-lg rounded md:p-0 hover:text-sky-400 transition-colors duration-200"
    >
      {title}
    </Link>
  );
};

export default NavLink;
