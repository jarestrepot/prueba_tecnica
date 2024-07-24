import { useFormik } from 'formik';
import { formFieldRegister, ILogin } from '../interfaces/IResgiter';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import ComboForm from './ComboForm';
import IResponseModel from '../interfaces/IresponseAction';
import { BodyPost } from '../interfaces/BodyPostRegister';
import fetchData from '../api/postCreateUser';
import { UserData } from '../interfaces/IResponseCreate';
import { useSnackbar } from 'notistack';
import CONSTANTES from '../global/constantes';


const FormLogin = () => {

  const initialValues: ILogin = {
    nick_name: '',
    password: '',
  }

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = object({
    nick_name: string().min(5, 'The nickName field requires a minimum of 5 characters').required(),
    password: string().required('This field is required').min(7, 'The password field requires a minimum of 7 characters').max(20, 'The maximum of this field is 20 characters'),
  })

  const onSubmitData = async (values: ILogin) => {
    const { nick_name, password } = values;
    const body: BodyPost = {
      nick_name,
      password,
    };

    try {
      const response = await fetchData<BodyPost, IResponseModel<UserData>>({
        method: 'POST',
        url: `/user/login`,
        body,
      });
      resetForm();
      if( !response.success ){
        enqueueSnackbar(response.msg, { variant: 'warning' }); 
        navigate('/');
        return;
      }
      enqueueSnackbar(response.msg, { variant: 'success' }); 
      // Save localStorage
      const userData = response.data ;
      if (typeof userData === 'object' && userData !== null && 'id' in userData  && 'token' in userData) {
        localStorage.setItem('token_user', JSON.stringify({
          id: userData.id,
          token: userData.token,
        }));
      }
      navigate('/home');
      return;
    } catch (error) {
      if(error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }else{
        enqueueSnackbar(CONSTANTES.ERROR_UNKNOWN('Login'), { variant: 'error' });
      }
      navigate('/');
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
    { label: 'Password', name: 'password', typeInput: 'password', placeholder: 'Your password' },
  ];


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full shadow-lg p-3 rounded-lg">
        {formFields.map((field) => (
          <ComboForm
            key={field.name}
            label={field.label}
            type={field.name}
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
        <button
          type='submit'
          className=
          {`w-full ${isSubmitting || !isValid ? 'cursor-not-allowed' : 'cursor-pointer'} bg-slate-500 text-white bg-primary-600 hover:bg-slate-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        >
          Login
        </button>
        <p className="text-sm text-center font-light text-gray-500 ">
          You do not have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </>
  )

}

export default FormLogin;