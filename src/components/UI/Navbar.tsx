import { CircleUser } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Navber = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center w-full shadow-sm bg-blue-500">
        <div className=" max-w-6xl w-full navbar   ">
          <div className="flex-1">
            <Link to={"/"}>
              <div className="btn btn-ghost text-xl text-white">daisyUI</div>
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full flex justify-center items-center">
                  <CircleUser
                    size={90}
                    className="text-white hover:text-gray-700"
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"}>
                    <div>Profile</div>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navber;
