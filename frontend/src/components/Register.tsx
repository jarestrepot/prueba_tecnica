import { useFormik } from 'formik';
import { formFieldRegister, IRegister } from '../interfaces/IResgiter';
import { Link, useNavigate } from 'react-router-dom';
import { object, ref, string, number } from 'yup';
import ComboForm from './ComboForm';
import fetchCities from '../api/getCities';
import { useEffect, useState } from 'react';
import IResponseModel from '../interfaces/IresponseAction';
import { ICityResponseArray } from '../interfaces/CityResponse';
import { BodyPostCreate } from '../interfaces/BodyPostRegister';
import fetchData from '../api/postCreateUser';
import { UserData } from '../interfaces/IResponseCreate';
import { useSnackbar } from 'notistack';
import CONSTANTES from '../global/constantes';


const FormRegister = () => {

  const initialValues: IRegister = {
    nick_name: '',
    name: '',
    surname: '',
    secondSurname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    post_code: undefined,
    street: undefined,
    number_street: undefined,
    apartment: undefined,
    city: undefined,
  }

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [cities, setCities] = useState <IResponseModel<ICityResponseArray>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCities()
        setCities(response)
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        } else {
          enqueueSnackbar(CONSTANTES.ERROR_UNKNOWN('Cities'), { variant: 'error' });
        }
      }
    }
    fetchData()
  }, [enqueueSnackbar])


  const validationSchema = object({
    nick_name: string().min(5, 'The nickName field requires a minimum of 5 characters').required(),
    email: string().email('Email not valid').required('This field is required'),
    name: string().required('This field is required').min(4, 'The name field requires a minimum of 4 character'),
    surname: string().required('This field is required').min(5, 'The surname field requires a minimum of 5 character'),
    secondSurname: string(),
    password: string().required('This field is required').min(7, 'The password field requires a minimum of 7 characters').max(20, 'The maximum of this field is 20 characters'),
    passwordConfirmation: string().required('This field is required').oneOf([ref('password')], 'Passwords are not the same'),
    post_code: number().min(5, 'The post code field requires a minimum of 5 characters'),
    street: string(),
    number_street: number().min(1, 'The street field requires a minimum of 1 character'),
    apartment: string(),
    city: number()
  })

  const onSubmitData = async (values: IRegister) => {
    const { nick_name, name, password, surname, secondSurname, email, token, post_code, street, number_street, apartment, city } = values;
    const body: BodyPostCreate = {
      nick_name,
      name,
      password,
      surname,
      secondSurname,
      email,
      token,
      address: {
        post_code,
        street,
        number_street,
        apartment,
        city: Number(city),
      },
    };

    try {
      const response = await fetchData<BodyPostCreate, IResponseModel<UserData>>({
        method: 'POST',
        url: `/user/register`,
        body,
      });
      resetForm();
      if (!response.success) {
        enqueueSnackbar(response.msg, { variant: 'warning' });
        navigate('/register');
        return
      }
      enqueueSnackbar(response.msg, { variant: 'success' });
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        enqueueSnackbar(CONSTANTES.ERROR_UNKNOWN('Login'), { variant: 'error' });
      }
      navigate('/register');
    }
  };


  const { handleChange, handleSubmit, errors, isSubmitting, resetForm, isValid } = useFormik({
    initialValues,
    onSubmit: onSubmitData,
    validationSchema,
    enableReinitialize: true,
  })


  const formFields: formFieldRegister[] = [
    { label: 'Nickname', name: 'nick_name', typeInput: 'text', placeholder: 'Your nickname' },
    { label: 'Name', name: 'name', typeInput: 'text', placeholder: 'Your name' },
    { label: 'Surname', name: 'surname', typeInput: 'text', placeholder: 'Your surname' },
    { label: 'Second Surname', name: 'secondSurname', typeInput: 'text', placeholder: 'Your second surname' },
    { label: 'Email', name: 'email', typeInput: 'email', placeholder: 'Your email' },
    { label: 'Password', name: 'password', typeInput: 'password', placeholder: 'Your password' },
    { label: 'Password Confirmation', name: 'passwordConfirmation', typeInput: 'password', placeholder: 'Password Confirmation' },
    { label: 'Your post code', name: 'post_code', typeInput: 'number', placeholder: '080902' },
    { label: 'Your street', name: 'street', typeInput: 'text', placeholder: 'street 134' },
    { label: 'Your number street', name: 'number_street', typeInput: 'number', placeholder: '210' },
    { label: 'Your apartament', name: 'apartment', typeInput: 'text', placeholder: 'Bajos 1' },
  ];


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full shadow-lg p-3 rounded-lg">
        {formFields.map((field) => (
          <ComboForm
            key={field.name}
            label={field.label}
            type={ field.name }
            typeInput={field.typeInput}
            placeholder={field.placeholder}
            onChange={handleChange}
          >
            {
              errors[field.name as keyof typeof errors] 
                ? <small className='text-red-500'>{errors[field.name as keyof typeof errors]}</small>
                : null
            }
          </ComboForm>
        ))}

        {cities ? (
          <div className="max-w-">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your City
            </label>
            <select
              name="city"
              id="city"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {/* <option value="" disabled selected>--- Chose one city ---</option> */}
              {cities.data && Array.isArray(cities.data) && cities.data.length > 0 ? (
                cities.data.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option value="">No cities available</option>
              )}
            </select>
          </div>
        ) : (
          <div>Loading cities...</div>
        )}
        <button
          type='submit'
          className=
          {`w-full ${isSubmitting || !isValid ? 'cursor-not-allowed' : 'cursor-pointer'} bg-slate-500 text-white bg-primary-600 hover:bg-slate-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          Create account
        </button>
        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
          Do you already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  )

}

export default FormRegister;