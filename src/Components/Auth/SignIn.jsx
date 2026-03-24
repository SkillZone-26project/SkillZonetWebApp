
import { Outlet } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";


const SignIn = () => {

  const navigate = useNavigate();
  return (

    <div className="bg-white min-h-screen p-[5px]">
<div className="relative ml-[20px] group">
          <IoCloseCircle
            onClick={() => navigate(-1)}
            className="text-[25px] text-textGray hover:text-textColor"
          />
          <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded">
            Close
          </span>
        </div>
  <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] shadow-lg">

    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen lg:gap-8 lg:min-h-[750px]">

      {/* LEFT */}
      <div className="bg-[#ffffff] flex justify-center items-center mx-auto px-8 ">

        <div className="w-full max-w-[420px] px-6 ">

          <Outlet />

        </div>

      </div>


      {/* RIGHT */}
      <div className="hidden lg:flex justify-center ">

        <img src="https://res.cloudinary.com/dipdvqnin/image/upload/q_auto,f_auto/v1771995255/931f3a0f14c1defe284e2cdaadc35b27bbcc45f2_qsz0s4.jpg" alt="login" className="w-full h-full object-cover object-center rounded-r-[16px]" />

      </div>

    </div>

  </div>

</div>

  );
};

export default SignIn;