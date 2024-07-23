import { useEffect, useRef, useState } from "react";
import ListItem from "../../components/ListItem";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const handleClickOutside = (event:Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('token_user');
    localStorage.removeItem('user_data');
    if (setOpen) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className={`flex w-full items-center bg-slate-300 dark:bg-dark text-gray-900 px-4`}>
      <div className="w-full">
        <div className="relative flex items-center justify-between w-full">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                alt="logo"
                className="dark:hidden"
              />
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                alt="logo"
                className="hidden dark:block"
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-end px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
              </button>
              <nav
                ref={menuRef}
                id="navbarCollapse"
                className={`absolute z-100 right-4 top-full w-full max-w-[250px] rounded-lg  px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"
                  } `}
              >
                <ul className="block lg:flex">
                  <ListItem navLink="/home" onClick={ () => setOpen(false) }>Home</ListItem>
                  <ListItem navLink="/about" onClick={ () => setOpen(false) }>About</ListItem>
                  <ListItem navLink="./login" onClick={() => clearLocalStorage() }>Logt out</ListItem>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;