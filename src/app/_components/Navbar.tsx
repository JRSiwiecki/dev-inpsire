import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex-shrink-0">
          <Link href="/">
            <span className="cursor-pointer text-2xl font-bold text-white">
              Dev Inspire
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <span className="cursor-pointer text-white hover:text-gray-300">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/inspiration">
                <span className="cursor-pointer text-white hover:text-gray-300">
                  Inspiration
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
