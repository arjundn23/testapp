import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useLoginMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";

import logo from "../../assets/Vectors/logo1.png";

const inputFieldStyle =
  "w-full px-3 py-2 h-[41px] border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-500";

const Rightside = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const hasRun = useRef(true);

  useEffect(() => {
    if (userInfo && hasRun.current) {
      hasRun.current = false;
      const timer = setTimeout(() => {
        navigate("/filebrowse");
      }, 5);

      return () => clearTimeout(timer);
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successful!", { autoClose: 2000 });
      hasRun.current = true;
      window.location.href = "/filebrowse";
    } catch (err) {
      toast.error(err?.data?.message || err.error, { autoClose: 2000 });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-1/2 min-h-screen bg-[#C95C34] p-6">
      <div className="w-[530px] h-[421px] rounded-[26px] bg-[#F7F2EC] p-8 flex flex-col justify-center items-center">
        {/* <h2 className="text-xl md:text-2xl font-semibold text-center tracking-wide">
          INDEPENDENTS
        </h2>
        <h4 className="text-sm md:text-base text-center tracking-wide font-light mb-[30px]">
          BY SODEXO
        </h4> */}
        <img
          src={logo}
          alt="INDEPENDENTS BY SODEXO"
          className="w-[246px] h-[45px] mb-[30px]"
        />

        <form className="space-y-6 w-full" onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              className={inputFieldStyle}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={inputFieldStyle}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm text-[#222221] text-[12px]">
                  Remember me
                </span>
              </label>
              <button
                type="submit"
                className="bg-black text-white py-[10px] px-[66px] rounded-[6px] hover:bg-gray-800 w-[164px] h-[43px] text-[15px]"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
            <div className="text-end">
              <a href="#" className="text-[12px] text-[#222221]">
                Forget Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rightside;
