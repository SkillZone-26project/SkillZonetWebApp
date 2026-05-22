
import { Outlet } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";


const SignIn = () => {

  const navigate = useNavigate();
  return (

    <div className="bg-white min-h-screen flex items-center justify-center p-4 lg:p-[55px]">
 <div className="w-full max-w-[1100px] bg-white rounded-[16px] shadow-lg">

     <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[600px] lg:min-h-[750px]">

      {/* LEFT */}
       <div className="bg-[#ffffff] flex justify-center items-center px-6 lg:px-8 py-8">

       <div className="w-full max-w-[420px]">

          <Outlet />

        </div>

      </div>


      {/* RIGHT */}
      <div className="hidden lg:block ">

        <img src="https://res.cloudinary.com/dipdvqnin/image/upload/q_auto,f_auto/v1775818930/12c20cb0fa94fa3578b59538d911107564aee7a5_j1zwyc.png" alt="login" className="w-full h-full object-cover object-center rounded-r-[16px]" />

      </div>
    </div>

  </div>

</div>

  );
};

export default SignIn;