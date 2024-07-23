import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <>
      <section className="p-4">
        <h1 className="text-black text-4xl font-bold text-center">Home Page</h1>
        <div className="grid w-full place-items-center text-gray-500 my-10">
          <p>
            User management website for technical testing in react and node
          </p>
          <div className="grid grid-flow-col place-items-center w-full shadow-lg rounded-md my-5 p-5">
            <svg className="icon icon-tabler icon-tabler-brand-nodejs" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7bc62d" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" />
              <path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" />
            </svg>
            <svg className="icon icon-tabler icon-tabler-brand-npm" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M1 8h22v7h-12v2h-4v-2h-6z" />
              <path d="M7 8v7" />
              <path d="M14 8v7" />
              <path d="M17 11v4" />
              <path d="M4 11v4" />
              <path d="M11 11v1" />
              <path d="M20 11v4" />
            </svg>
            <svg  className="icon icon-tabler icon-tabler-brand-react" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
              <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
              <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
              <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
              <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
              <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
              <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
            </svg>
          </div>

          <Link to="/about" className="text-blue-400 text-lg hover:underline hover:scale-105 transition-all duration-200">
            About us
          </Link>
        </div>
      </section>
    </>
  )
}

