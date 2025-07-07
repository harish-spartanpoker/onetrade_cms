import Image from "next/image";
import GreenBtn from "../GreenBtn";
import { strapiImage } from "../../../../../lib/strapi/strapiImage";
import Link from "next/link";

interface NavItem {
  id?: number;
  title: string;
  link: string;
  target: string;
}

const Navbar = ({
  logo,
  items,
  navRHS,
}: {
  logo: any;
  items: NavItem[];
  navRHS: NavItem;
}) => {
  return (
    <header className="poppins-normal sticky top-0 z-40 h-full w-full p-2 md:px-20">
      <nav className="flex w-full items-center space-x-4">
        <div className="navbar-brand mx-auto md:me-auto md:ms-0">
          <Link href="/">
            <Image
              width={260}
              height={60}
              src={strapiImage(logo.url)}
              alt="OneTrade Logo"
              className="h-auto max-w-48 md:max-w-64"
            />
          </Link>
        </div>
        {items && (
          <div className="nav-list hidden h-full md:block">
            <ul className="flex h-full content-center items-center space-x-5 p-5">
              {items.map((el: NavItem, ind: number) => (
                <li key={ind}>
                  <Link
                    className="poppins-normal"
                    target={el.target}
                    href={el.link}
                  >
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="nav-trait hidden md:block">
          <p className="text-lg font-bold">18+ only</p>
        </div>
        {navRHS && (
          <div className="nav-cta hidden md:block">
            <ul>
              <li>
                <GreenBtn title={navRHS.title} url={navRHS.link} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
