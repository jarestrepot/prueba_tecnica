import FormRegister from "../components/Register"

export const Register = () => {
  return (
    <section className="w-8/12 grid place-items-center gap-10">
      <h1 className="text-gray-600 text-4xl font-bold">Register form</h1>
      <FormRegister />
    </section>
  )
}