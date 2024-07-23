import { ReactNode } from "react";

interface IcomboForm {
  label: string;
  type: string;
  typeInput:string;
  placeholder: string;
  children: ReactNode | null,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}


const ComboForm = ({ label, type, placeholder, onChange, typeInput, children }: IcomboForm) => {

  return (
    <div className="max-w-">
      <label
        htmlFor={ type }
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        { label }
      </label>
      <input
        type={ typeInput }
        name={ type }
        id={ type }
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={ placeholder }
        onChange={ onChange }
      />
      { children }
    </div>
  )
}

export default ComboForm

