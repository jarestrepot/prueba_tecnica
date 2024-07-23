import { useNavigate } from "react-router-dom";
import FormLogin from "../components/Login"
import { IAuth } from "../interfaces/IAuth"
import { useEffect } from "react";


export const Login = ({ isAuth }: IAuth) => {

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);
  return (
    <section className="w-8/12 grid place-items-center gap-10">
      <h1 className="text-gray-600 text-4xl font-bold">Login form</h1>
      <FormLogin />
    </section>
  )
}