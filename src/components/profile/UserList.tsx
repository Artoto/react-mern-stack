import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loadding from "../UI/Loadding";
import Navber from "../UI/Navbar";
import { FetchData } from "../../helpers/fetchData";

interface DataProps {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
}

const UserList = () => {
  const [isLoadding, setLoadding] = useState<boolean>(false);
  const [users, setUsers] = useState<DataProps[]>([]);
  const apiPath = "http://54.253.77.120:5000/api/user";
  const fetchs = new FetchData(apiPath);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Do you want to delete the data?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchs.delete(id);
        if (response?.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sorry, an error occurred. Please try again!",
          });
          return null;
        }
        Swal.fire({
          showConfirmButton: false,
          icon: "success",
          title: "Deleted",
        });
        window.location.reload();
      }
    });
  };
  const fetchData = async () => {
    try {
      setLoadding(true);
      const response = await fetchs.getAll();
      setUsers(response?.data ?? []);
    } catch (error: Error | any) {
      setLoadding(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, an error occurred. Please try again!",
      }).then(() => {
        if (error?.response?.status === 401) {
          navigate("/");
        }
      });
    } finally {
      setLoadding(false);
    }
  };

  return (
    <>
      {isLoadding && <Loadding isLoading={isLoadding} />}
      <Navber />
      <div className="flex justify-center items-start mt-5 w-full h-screen ">
        <div className=" max-w-6xl w-full h-auto p-4 md:p-9">
          <div className="flex justify-between">
            <span className="text-xl font-semibold text-gray-900">
              User Lists
            </span>
            <Link to={"/users/create"}>
              <button className="btn btn-info  text-white font-semibold">
                Create User
              </button>
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto rounded-box shadow border border-base-content/5 bg-base-100 ">
            <table className="table w-2xl md:w-5xl">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={`tr-${index + 1}`}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span className="border border-green-500 bg-green-50 text-green-700 font-semibold px-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                      <td className="flex justify-center items-center gap-3">
                        <Link to={`/users/edit/${user._id}`}>
                          <button className="btn btn-outline btn-warning">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No user data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
