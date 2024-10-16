import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div>
        <img
          className="mx-auto w-3/5 items-center"
          src="https://i.ibb.co.com/hLyN2xH/Article-59-creative-404-pages-Title-card-opt-4.png"
          alt=""
        />
      </div>
      <div className="text-center mt-10 ">
        <NavLink to="/">
          <button className="btn p-3 border-spacing-1 bg-fuchsia-500">
            Please-Home-Page
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
