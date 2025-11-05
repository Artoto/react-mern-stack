import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MailOpen, Eye, EyeOff, Lock, LockOpen } from "lucide-react";
import { TextPattern, EmailPattern } from "../../helpers/textPattern";
import Loadding from "../UI/Loadding";
import Swal from "sweetalert2";
import { FetchData } from "../../helpers/fetchData";

interface formDataProps {
  email: string;
  password: string;
}
interface formErrorDataProps {
  email: boolean;
  password: boolean;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
  });
  const [formErrorData, setFormErrorData] = useState<formErrorDataProps>({
    email: false,
    password: false,
  });
  const [isLoadding, setIsLoadding] = useState<boolean>(false);
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isMailOpen, setIsMailOpen] = useState<boolean>(false);
  const [isLockOpen, setIsLockOpen] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const inputPassword: string = isShowPassword ? "text" : "password";
  const navigate = useNavigate();
  const apiPath = "http://54.253.77.120:5000/api/auth/login";

  useEffect(() => {
    if (
      !formErrorData.email &&
      !formErrorData.password &&
      formData.email.length > 8 &&
      formData.password.length >= 8
    ) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
  }, [formData, formErrorData]);

  const handleSubmit = async () => {
    try {
      setIsLoadding(true);
      const fetchs = await new FetchData(apiPath);
      const response = await fetchs.post({
        body: {
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(response);
      if (!response?.access_token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, an error occurred. Please try again.",
        });
        return null;
      }
      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("refresh_token", response?.refresh_token);
      navigate("/users");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, an error occurred. Please try again!",
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
      <div className="h-screen w-full bg-linear-[135deg,dodgerblue_10%,cornflowerblue_30%,lime_90%] flex justify-center items-center p-4 md:p-9">
        <div className="flex flex-col items-center gap-8 bg-white rounded-xl shadow max-w-6xl w-full sm:w-[500px] md:w-[500px%] lg:w-[500px] xl:w-[500px] py-8 px-10 h-auto">
          <div className="text-5xl text-blue-500 font-bold">Login</div>
          <div className="grid grid-cols-1 gap-4 items-center w-full px-0 sm:px-10">
            <div className="w-full relative">
              <p>Email</p>
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
              <p>Password</p>
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
            {isDisabled ? (
              <button
                type="button"
                className="mt-3 w-full bg-blue-500 text-white p-3 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="mt-3 w-full bg-blue-300 text-white p-3 rounded-lg"
                disabled
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
