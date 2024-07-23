import { Link } from "react-router-dom";
import { INavItems } from "../interfaces/IitemsNav";

const ListItem = ({ children, navLink, onClick }: INavItems) => {
  return (
    <>
      <li
        onClick={onClick}
      >
        <Link className="flex py-2 font-medium text-lg text-body-color hover:text-gray-400 lg:ml-12 lg:inline-flex transition-all duration-150" to={ navLink }>
          {children}
        </Link>
      </li>
    </>
  );
};

export default ListItem;