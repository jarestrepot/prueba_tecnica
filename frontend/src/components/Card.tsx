import { Link } from "react-router-dom";
import { DataUser } from "../pages/AboutUs";


const SingleCard = ({ data }: DataUser) => {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg mt-4 shadow dark:bg-gray-800 dark:border-gray-700">
        <figure className="w-full grid place-items-center">
          <svg className="icon icon-tabler icon-tabler-user-circle" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
          </svg>
        </figure>
        <div className="p-5 flex flex-col gap-2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">{data?.name} {data?.surname} {data?.secondSurname} </h5>
          <p className="font-normal text-gray-700">{data?.email}</p>
          <p className="font-normal text-gray-700">{data?.nick_name}</p>
          {
            data?.address ? 
              <div className="border-t">
                <h3 className="font-bold text-gray-400 text-lg">Address</h3>
                {
                  data.address.city ? 
                  <>
                    <p>{data.address.city.name}</p> 
                    <p>{data.address.city.country.name}</p>
                  </>
                  : null
                }
                <p>{data.address.apartment}</p>
                <p>{data.address.street}</p>
                <p>{data.address.number_street}</p>
                <p>{data.address.post_code}</p>
              </div>
            : null
          }

          <Link to="/update" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>

    </>
  );
};

export default SingleCard;