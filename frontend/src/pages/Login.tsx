
import FormLogin from "../components/Login"

export const Login = () => {
  return (
    <section className="w-8/12 grid place-items-center gap-10">
      <h1 className="text-gray-600 text-4xl font-bold">Login form</h1>
      <FormLogin />
    </section>
  )
}