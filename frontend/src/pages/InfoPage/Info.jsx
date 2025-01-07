import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Info = () => {
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [email] = useState("example@email.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={""} />

      {/* Main Content */}
      <main className="h-screen flex-grow bg-gray-100 py-10 px-6">
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Section */}
            <div className="p-8 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-white text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={profilePic || "default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleProfilePicChange}
                />
              </div>
              <h2 className="text-2xl font-bold">Edit Profile</h2>
            </div>

            {/* Form Section */}
            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                  placeholder="Your email address"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-3 py-2 text-gray-600 hover:text-orange-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 focus:outline-none transition duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Info;
