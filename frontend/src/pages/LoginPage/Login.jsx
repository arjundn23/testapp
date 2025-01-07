import Logo from "../../assets/Layer_1.png";
import Leftside from "../../components/Leftside";
import Rightside from "./Rightside";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins relative">
      {/* Left Side */}
      <Leftside />

      {/* Right Side */}
      <Rightside />

      {/* Logo */}
      <div className="absolute top-[111px] inset-x-0 flex justify-center z-10">
        <img
          src={Logo}
          alt="Logo"
          className="w-[133px] h-[133px] object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
