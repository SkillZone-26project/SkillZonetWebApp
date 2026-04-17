import { Outlet, useNavigate } from "react-router-dom"; 


const UserSignIn = () => {
  const navigate = useNavigate(); // ✅ FIX: add navigate

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
          <div className="hidden lg:block">
            <img
              src="https://res.cloudinary.com/dipdvqnin/image/upload/q_auto,f_auto/v1775861214/ffa819df0065d68f68973a80ce39438603c76be9_tccy8q.png"
              alt="login"
              className="w-full max-w-[700px] h-full object-cover object-center rounded-r-[16px]"
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserSignIn;