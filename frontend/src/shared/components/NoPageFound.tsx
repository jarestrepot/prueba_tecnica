import { Link } from "react-router-dom";

interface NoPageFoundProps {
  errorPath: string;
}


const NoPageFound = ({ errorPath }: NoPageFoundProps) => {
  return (
    <section>
      <h1 className="text-black text-xl">{ errorPath }</h1>
      <Link className="text-blue-600 text-xl" to="/">
        Return 
      </Link>
    </section>
  )
}

export default NoPageFound;