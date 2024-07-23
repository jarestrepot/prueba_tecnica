import { useLocalStorage } from "react-use";
import { User } from "../interfaces/IResponseCreate";
import SingleCard from "../components/Card";
export interface DataUser {
  data:User |undefined;
}

const AboutUs = () => {
  const [user] = useLocalStorage<DataUser>('user_data');
  const data = user?.data;

  return (
    <section className="mt-5">
      <h1 className="text-black text-center text-3xl">
        User data
      </h1>
      <div className="text-black w-full grid place-items-center ">
        {
          data ? <SingleCard data={data}/> : null
        }
      </div>
    </section>
  )
}


export default AboutUs;

