import { useLocalStorage } from "react-use";
import { User } from "../interfaces/IResponseCreate";
import SingleCard from "../components/Card";
interface DataUser {
  data:User |undefined;
}

const AboutUs = () => {
  const [user] = useLocalStorage<DataUser>('user_data');
  const data = user?.data;

  return (
    <section>
      <h1 className="text-black">
        About us
      </h1>
      <div className="text-black w-full grid place-items-center">
        {
          data ? <SingleCard 

          /> : null
        }
      </div>
    </section>
  )
}


export default AboutUs;

