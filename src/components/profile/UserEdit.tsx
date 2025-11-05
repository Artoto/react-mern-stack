import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navber from "../UI/Navbar";
import {
  Mail,
  MailOpen,
  Eye,
  EyeOff,
  Lock,
  LockOpen,
  Phone,
  PhoneCall,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import { TextPattern, EmailPattern } from "../../helpers/textPattern";
import Loadding from "../UI/Loadding";
import Swal from "sweetalert2";
import { FetchData } from "../../helpers/fetchData";

interface formDataProps {
  email: string;
  name: string;
  phone: string;
  role: string;
  password?: string | undefined;
}
interface formErrorDataProps {
  email: boolean;
  name: boolean;
  phone: boolean;
  role: boolean;
  password?: boolean;
}

const UserEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    name: "",
    phone: "",
    role: "",
    password: "",
  });
  const [formErrorData, setFormErrorData] = useState<formErrorDataProps>({
    email: false,
    name: false,
    phone: false,
    role: false,
    password: false,
  });
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isMailOpen, setIsMailOpen] = useState<boolean>(false);
  const [isNameOpen, setIsNameOpen] = useState<boolean>(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState<boolean>(false);
  const [isLockOpen, setIsLockOpen] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const inputPassword: string = isShowPassword ? "text" : "password";
  const navigate = useNavigate();
  const apiPath = "http://54.253.77.120:5000/api/user";

  useEffect(() => {
    if (id) {
      setIsLoadding(true);
      const fetchData = async () => {
        try {
          const fetchs = await new FetchData(apiPath);
          const response = await fetchs.getById(id);
          setFormData({ ...formData, ...response?.data });
        } catch (error: Error | any) {
          setIsLoadding(false);
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
          setIsLoadding(false);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (
        !formErrorData?.email &&
        !formErrorData?.name &&
        !formErrorData?.phone &&
        formData?.email?.length > 8 &&
        formData?.name?.length > 5 &&
        formData?.phone?.length > 5
      ) {
        setIsdisabled(true);
      } else {
        setIsdisabled(false);
      }
    } else if (formData?.password) {
      if (
        !formErrorData?.email &&
        !formErrorData?.name &&
        !formErrorData?.phone &&
        !formErrorData?.password &&
        formData?.email?.length > 8 &&
        formData?.name?.length > 5 &&
        formData?.password?.length > 5 &&
        formData?.phone?.length > 5
      ) {
        setIsdisabled(true);
      } else {
        setIsdisabled(false);
      }
    }
  }, [formErrorData, formData, id]);

  const handleSubmitEdit = async () => {
    try {
      setIsLoadding(true);
      const fetchs = await new FetchData(apiPath);
      const response = await fetchs.put(
        {
          body: {
            email: formData?.email,
            name: formData?.name,
            role: formData?.role,
            phone: formData?.phone,
          },
        },
        id
      );
      if (response?.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, an error occurred. Please try again.",
        });
        return null;
      }
      navigate("/users");
    } catch (error: Error | any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, an error occurred. Please try again!",
      }).then(() => {
        if (error?.response?.status === 401) {
          navigate("/");
        }
      });
      setIsLoadding(false);
    } finally {
      setIsLoadding(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoadding(true);
      const fetchs = await new FetchData(apiPath);
      const response = await fetchs.post({
        body: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
        },
      });
      if (response?.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, an error occurred. Please try again.",
        });
        return null;
      }
      navigate("/users");
    } catch (error: Error | any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, an error occurred. Please try again!",
      }).then(() => {
        if (error?.response?.status === 401) {
          navigate("/");
        }
      });
      setIsLoadding(false);
    } finally {
      setIsLoadding(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const englishOnlyPattern = new TextPattern(value).textPatternEnglish();
    const emailOnlyPattern = new EmailPattern(value).isValidate();
    if (!englishOnlyPattern) {
      setFormErrorData((prev) => ({ ...prev, [name]: true }));
    } else {
      if (name === "email") {
        setFormErrorData((prev) => ({ ...prev, [name]: emailOnlyPattern }));
      } else {
        setFormErrorData((prev) => ({ ...prev, [name]: false }));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      {isLoadding && <Loadding isLoading={isLoadding} />}
      <Navber />
      <div className="flex justify-center items-start mt-5 w-full h-screen ">
        <div className=" max-w-6xl w-full h-auto p-4 md:p-9">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link
                  to={"/users"}
                  className="text-xl font-semibold text-gray-900"
                >
                  User Lists
                </Link>
              </li>
              <li>
                <a className="text-xl font-semibold text-gray-900">
                  {id ? "Edit" : "Create"}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 gap-4  items-center max-w-2xl w-full px-0 sm:px-10 mt-4">
              <div className="w-full relative">
                <p>
                  Email <span className="text-red-500">*</span>
                </p>
                {isMailOpen ? (
                  <MailOpen
                    size={18}
                    className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                  />
                ) : (
                  <Mail
                    size={18}
                    className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                  />
                )}

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onFocus={() => setIsMailOpen(!isMailOpen)}
                  onBlur={() => setIsMailOpen(!isMailOpen)}
                  onChange={handleChange}
                  className={`px-10 w-full h-[45px] rounded-lg border border-gray-300 focus:outline-1 focus:outline-gray-500 ${
                    formErrorData.email
                      ? "border-red-500 focus:outline-red-500"
                      : "border-gray-300 focus:outline-gray-500"
                  }`}
                  placeholder="Please enter your email."
                />
                {formErrorData.email && (
                  <small className="text-red-500">
                    {`Please enter a valid email.`}
                  </small>
                )}
              </div>
              <div className="w-full relative">
                <p>
                  Name <span className="text-red-500">*</span>
                </p>
                {isNameOpen ? (
                  <UserRoundPen
                    size={18}
                    className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                  />
                ) : (
                  <UserRound
                    size={18}
                    className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                  />
                )}

                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onFocus={() => setIsNameOpen(!isNameOpen)}
                  onBlur={() => setIsNameOpen(!isNameOpen)}
                  onChange={handleChange}
                  className={`px-10 w-full h-[45px] rounded-lg border border-gray-300 focus:outline-1 focus:outline-gray-500 ${
                    formErrorData.name
                      ? "border-red-500 focus:outline-red-500"
                      : "border-gray-300 focus:outline-gray-500"
                  }`}
                  placeholder="Please enter your name."
                />
                {formErrorData.name && (
                  <small className="text-red-500">
                    {`Please enter a valid name.`}
                  </small>
                )}
              </div>
              <div className="w-full relative">
                <p>
                  Phone <span className="text-red-500">*</span>
                </p>
                {isPhoneOpen ? (
                  <PhoneCall
                    size={18}
                    className={`cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2`}
                  />
                ) : (
                  <Phone
                    size={18}
                    className={`cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2`}
                  />
                )}

                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onFocus={() => setIsPhoneOpen(!isPhoneOpen)}
                  onBlur={() => setIsPhoneOpen(!isPhoneOpen)}
                  onChange={handleChange}
                  className={`px-10 w-full h-[45px] rounded-lg border border-gray-300 focus:outline-1 focus:outline-gray-500 ${
                    formErrorData.phone
                      ? "border-red-500 focus:outline-red-500"
                      : "border-gray-300 focus:outline-gray-500"
                  }`}
                  placeholder="Please enter your phone."
                />
                {formErrorData.phone && (
                  <small className="text-red-500">
                    {`Please enter a valid phone.`}
                  </small>
                )}
              </div>
              {!id && (
                <div className="w-full relative">
                  <p>
                    Password <span className="text-red-500">*</span>
                  </p>
                  {isLockOpen ? (
                    <LockOpen
                      size={18}
                      className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                    />
                  ) : (
                    <Lock
                      size={18}
                      className="cursor-text absolute top-0 left-2 translate-y-[38px] translate-x-2"
                    />
                  )}

                  <input
                    type={inputPassword}
                    name="password"
                    id="password"
                    value={formData.password}
                    onFocus={() => setIsLockOpen(!isLockOpen)}
                    onBlur={() => setIsLockOpen(!isLockOpen)}
                    onChange={handleChange}
                    className={`px-10 w-full h-[45px] rounded-lg border focus:outline-1  ${
                      formErrorData.password
                        ? "border-red-500 focus:outline-red-500"
                        : "border-gray-300 focus:outline-gray-500"
                    }`}
                    placeholder="Please enter your password."
                  />
                  {isShowPassword ? (
                    <Eye
                      onClick={() => {
                        setIsShowPassword(!isShowPassword);
                      }}
                      size={18}
                      className="cursor-pointer absolute top-0 right-2 translate-y-[38px] translate-x-[-10px]"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setIsShowPassword(!isShowPassword);
                      }}
                      size={18}
                      className="cursor-pointer absolute top-0 right-2 translate-y-[38px] translate-x-[-10px]"
                    />
                  )}

                  {formErrorData.password && (
                    <small className="text-red-500">{`Please enter a valid password.`}</small>
                  )}
                </div>
              )}

              {isDisabled ? (
                <button
                  type="button"
                  className="mt-3 w-full bg-blue-500 text-white p-3 rounded-lg"
                  onClick={id ? handleSubmitEdit : handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="mt-3 w-full bg-blue-300 text-white p-3 rounded-lg"
                  disabled
                  onClick={id ? handleSubmitEdit : handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
