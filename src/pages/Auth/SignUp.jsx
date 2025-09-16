import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector"
import { Input } from "../../components/Inputs/Input"
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import UserContext from '../../context/userContext1';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

   const {updateUser} = useContext(UserContext);
   const navigate = useNavigate();

  // Handle signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = ''

    if (!fullName) {
      setError("Please enter fullname.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // SignUp API call
    try {
      //Upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data); 

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mb-6'>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignup} className='md:mr-[100px]'>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="text"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />

              <Input
                value={adminInviteToken} 
                onChange={({ target }) => setAdminInviteToken(target.value)}
                label="Admin Invite Token"
                placeholder="6 digit code"
                type="text"
              />
            </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary'> 
              SIGN UP
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Already have an account?{" "}
              <Link className='font-medium text-white underline ml-3' to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  )
}

export default SignUp
