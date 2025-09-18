import AuthLayout from "../../components/layouts/AuthLayout";
import { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {validateEmail} from '../../utils/helper';
import {Input} from "../../components/Inputs/Input"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import UserContext  from "../../context/userContext1";

const  Login = () =>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle login form submit
  const handleLogin = async(e)=>{
    e.preventDefault();
    
    if(!validateEmail(email)){
      setError("Enter a valid email address.")
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("")

    //Login API call
     try{
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,
          password
        });

        const {token, role } = response.data;
        if(token){
          localStorage.setItem("token", token);
          updateUser(response.data)

          //Redirect based on role
          if(role==="admin"){
            navigate("/admin/dashboard");
          }else{
            navigate("/user/dashboard");
          }
        }
      }catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }else{
          setError("Something went wrong, please try again")
        }
      }
  };


  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mt-18'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value = {email}
            onChange={({target}) => setEmail(target.value)}
            label = "Email Address"
            placeholder = "Enter your email"
            type="text"
            />

             <Input
            value = {password}
            onChange={({target}) => setPassword(target.value)}
            label = "Password"
            placeholder = "Enter your password"
            type="password"
            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='bg-blue-800 md:bg-purple-800 w-full text-white p-2 rounded-md' >
              LOGIN
            </button>

            <p className='text-[13px] text-slate-800 mt-3'>
              Don't have an account ?  {" "}
              <Link className='font-medium text-white underline ml-3' to="/signup">
                SignUp
              </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
