import { User } from "../interfaces/IResponseCreate";
import SingleCard from "../components/Card";
import { useContext } from "react";
import { UserContext } from "../utils/ProtectedRoute";
export interface DataUser {
  data:User |undefined;
}

const AboutUs = () => {
  const { user } = useContext(UserContext)

  return (
    <section className="mt-4">
      <h1 className="text-black text-center text-4xl font-bold">
        User data
      </h1>
      <div className="text-black w-full grid place-items-center ">
        {
          user ? <SingleCard data={user}/> : null
        }
      </div>
    </section>
  )
}


export default AboutUs;

