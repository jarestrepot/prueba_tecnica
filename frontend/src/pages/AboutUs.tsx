import { useLocalStorage } from "react-use";
import { User } from "../interfaces/IResponseCreate";
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
      <p className="text-black">
        {
          data ? data.name : null
        }
      </p>
    </section>
  )
}


export default AboutUs;

