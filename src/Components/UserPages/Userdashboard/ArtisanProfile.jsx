import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  LuArrowLeft,
  LuCalendar,
  LuHeart,
  LuMessageCircle,
  LuPhone,
} from "react-icons/lu";

import {
  FaStar
} from "react-icons/fa";

import {
  TbRosetteFilled
} from "react-icons/tb";

import {
  GrLocation
} from "react-icons/gr";

import LoadingScreen from "../../LoadingScreen/LoadingScreen"


const API_BASE_URL =
  "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans";


// Default fallback artisan data

const defaultArtisan = {
  _id: "",
  id: "",

  fullName: "Artisan Name",

  profilePic: "",

  bio: "Professional artisan providing quality services.",

  city: "Lagos",

  state: "Nigeria",

  phone: "",

  isAvailable: false,

  averageRating: 0,

  totalJobs: 0,

  yearsExperience: 0,

  coverageRadius: 0,

  createdAt: "",


  skills: [],

  skillsAndSubSkills: [],

  reviews: [],

  portfolioItems: [],

};




const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg";


// const FALLBACK_IMAGE =
//   "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg";


const ArtisanProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [artisan, setArtisan] = useState(defaultArtisan);
  const [activeTab, setActiveTab] = useState("portfolio");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Always use one ID throughout the page
  const artisanId =
  artisan?._id ||
  artisan?.id ||
  id;



  useEffect(() => {

    const fetchArtisanProfile = async () => {

      try {

        setLoading(true);
        setError("");


        // No ID from URL
        if (!id) {
          setArtisan(defaultArtisan);
          return;
        }


        const response = await fetch(
          `${API_BASE_URL}/${id}`
        );


        if (!response.ok) {
          throw new Error(
            "Unable to fetch artisan profile"
          );
        }


        const result = await response.json();


        // Development log only
        if (import.meta.env.DEV) {
          console.log(
            "Artisan API Response:",
            result
          );
        }


        const artisanData =
          result?.data || result;



        setArtisan({

          ...defaultArtisan,

          ...artisanData,


          skills:
            artisanData?.skills ??
            defaultArtisan.skills,


          reviews:
            artisanData?.reviews ??
            defaultArtisan.reviews,


          portfolioItems:
            artisanData?.portfolioItems ??
            defaultArtisan.portfolioItems,

        });


      } catch (err) {


        console.error(
          "FETCH ARTISAN ERROR:",
          err
        );


        setError(
          "Unable to load artisan profile. Showing available information."
        );


        setArtisan(defaultArtisan);



      } finally {

        setLoading(false);

      }

    };


    fetchArtisanProfile();


  }, [id]);




  if (loading) {

    return (
      <LoadingScreen
        text="Loading artisan profile, please wait..."
      />
    );

  }



  return (
    <main className="px-[16px]">

      {error && (

        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mt-5">

          {error}

        </div>

      )}

      {/* Header */}

<header className="border-b w-full">

  <div className="flex items-center gap-[14px] w-full max-w-[854px] mx-auto py-[12px]">

    <button onClick={() => navigate(-1)}>
      <LuArrowLeft />
    </button>

    <p className="text-[18px] font-medium">
      Artisan Profile
    </p>

  </div>

</header>





{/* Section 1 */}

<section className="w-full max-w-[854px] mx-auto border rounded-[14px] mt-[24px] p-[16px] md:p-[24px]">


  {/* Top Card */}

  <div className="flex flex-col md:flex-row justify-between gap-[20px]">


    {/* Left Side */}

    <div className="flex flex-col sm:flex-row gap-[16px]">


      {/* Profile Image */}

      <img
        src={
          artisan.profilePic ||
          artisan.profileImage ||
          artisan.image ||
          FALLBACK_IMAGE
        }

        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}

        alt={artisan.fullName || "Artisan"}

        className="w-[80px] h-[80px] rounded-full object-cover"
      />





      <div className="flex flex-col gap-[6px]">


        {/* Name */}

        <div className="flex items-center gap-[5px] text-[18px] font-semibold">


          <p className="text-textColor">

            {artisan.fullName || "Artisan Name"}

          </p>



          <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />



          {artisan.isAvailable && (

            <button
              className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]"
            >

              Premium

            </button>

          )}


        </div>





        {/* Main Skill */}

        <div className="mt-[15px]">

          <button
            className="bg-[#D8EBFF] text-[#1565C0] text-[12px] font-semibold rounded-[8px] py-[4px] px-[10px]"
          >

            {
              artisan.skillsAndSubSkills?.[0]?.skillName ||
              artisan.skill?.name ||
              artisan.skill ||
              "General Service"
            }

          </button>

        </div>





        {/* Skills */}

        <div className="flex flex-wrap gap-[5px] mt-[10px]">


          {
            artisan.skills?.length > 0 ? (

              artisan.skills.map((skill,index)=>(

                <button

                  key={index}

                  className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"

                >

                  {
                    skill?.subSkill?.name ||
                    skill?.name ||
                    "Service"
                  }

                </button>

              ))

            ) : (

              <>

                <button className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]">
                  Plumbing
                </button>


                <button className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]">
                  Pipe Fitting
                </button>

              </>

            )


          }


        </div>





        {/* Rating */}

        <div className="flex items-center gap-[5px] mt-[6px]">

          <FaStar className="text-[#FDC700] text-[18px]" />


          <p>

            {artisan.averageRating || 0}


            <span className="text-textGray">

              {" "}
              ({artisan.reviews?.length || 0} reviews)

            </span>


          </p>


        </div>





        {/* Location */}

        <div className="flex flex-wrap items-center gap-[16px] mt-[6px] text-textGray text-[14px]">


          <div className="flex items-center gap-[5px]">

            <GrLocation />

            <p>

              {artisan.city || "Lagos"},
              {" "}
              {artisan.state || "Nigeria"}

            </p>

          </div>





          <div className="flex items-center gap-[5px]">

            <LuCalendar />


            <p>

              Joined{" "}


              <span>

                {

                  artisan.createdAt

                  ?

                  new Date(
                    artisan.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month:"long",
                      year:"numeric"
                    }
                  )

                  :

                  "January 2023"

                }

              </span>


            </p>


          </div>


        </div>





        {/* Bio */}

        <div className="w-full text-[#717182] max-w-[500px] text-[14px] md:text-[16px] mt-[6px] max-h-[70px] overflow-y-auto">


          <p>

            {
              artisan.bio ||
              "Professional artisan providing quality services."
            }

          </p>


        </div>



      </div>


    </div>





    {/* Favourite */}

    <div className="self-start">

      <LuHeart className="text-[20px]" />

    </div>


  </div>





  {/* Bottom Card */}

  <div className="border-t mt-[28px] pt-[20px]">


    <div className="flex flex-col sm:flex-row items-center justify-between gap-[20px] w-full max-w-[600px] mx-auto">


      <div className="flex flex-col items-center">

        <p className="text-[24px] font-semibold text-textColor">

          {artisan.totalJobs || 0}

        </p>


        <p className="text-[14px] text-textGray">

          Jobs Completed

        </p>


      </div>





      <div className="flex flex-col items-center">

        <p className="text-[24px] font-semibold text-textColor">

          {artisan.yearsExperience || 0}

        </p>


        <p className="text-[14px] text-textGray">

          Years of Experience

        </p>


      </div>





      <div className="flex flex-col items-center">

        <p className="text-[24px] font-semibold text-textColor">

          {artisan.coverageRadius || 0} km

        </p>


        <p className="text-[14px] text-textGray">

          Coverage Radius

        </p>


      </div>


    </div>


  </div>



</section>





{/* Buttons */}

<section className="w-full max-w-[854px] mx-auto mt-[24px] flex flex-col sm:flex-row gap-[12px]">


<button

onClick={() =>

  navigate(`/bookService/${artisanId}`, {

    state:{
      artisan
    }

  })

}

className="flex items-center justify-center flex-1 bg-black text-white text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px]"

>

<LuCalendar />

Book Now

</button>





<button

onClick={() =>
navigate(`/messages/${artisanId}`)
}

className="flex items-center justify-center flex-1 bg-white text-black text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px] border-2"

>

<LuMessageCircle />

Send Message

</button>





<button

onClick={() =>
window.location.href = `tel:${artisan.phone}`
}

className="flex items-center justify-center flex-1 bg-white text-black text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px] border-2"

>

<LuPhone />

Call

</button>


</section> 

{/* Portfolio & Reviews Section */}

<section className="w-full max-w-[854px] mx-auto mt-[24px]">


  {/* Tabs */}

  <div className="flex gap-[10px] w-full h-[38px] bg-[#ECECF0] rounded-[14px] text-[12px] font-medium p-[4px] overflow-x-auto">


    <button

      onClick={() => setActiveTab("portfolio")}

      className={`flex-1 rounded-[14px] ${
        activeTab === "portfolio"
          ? "bg-white text-textColor"
          : ""
      }`}

    >

      Portfolio

    </button>





    <button

      onClick={() => setActiveTab("reviews")}

      className={`flex-1 rounded-[14px] ${
        activeTab === "reviews"
          ? "bg-white text-textColor"
          : ""
      }`}

    >

      Reviews ({artisan.reviews?.length || 0})

    </button>


  </div>





  <div className="mt-[24px]">


    {/* PORTFOLIO */}

    {
      activeTab === "portfolio" && (

        <div>


          <div className="border rounded-[14px] p-4">


            <p className="text-[18px] font-semibold text-textColor mt-[20px] mb-[30px]">

              Work Gallery

            </p>





            <div className="flex gap-[16px] overflow-x-auto">


              {

                artisan.portfolioItems?.length > 0

                ?

                artisan.portfolioItems.map(
                  (item,index)=>(


                  <img

                    key={index}

                    src={
                      item?.image ||
                      item?.url ||
                      item ||
                      FALLBACK_IMAGE
                    }


                    onError={(e)=>{

                      e.currentTarget.src =
                      FALLBACK_IMAGE;

                    }}


                    alt="Artisan work"


                    className="w-[260px] h-[220px] rounded-[14px] object-cover"

                  />


                ))


                :


                (

                  <p className="text-textGray">

                    No portfolio uploaded yet.

                  </p>

                )


              }


            </div>


          </div>


        </div>

      )

    }







    {/* REVIEWS */}


    {

      activeTab === "reviews" && (


        <div className="space-y-[16px]">


          {


            artisan.reviews?.length > 0


            ?


            artisan.reviews.map(
              (review,index)=>(


              <div

                key={index}

                className="border rounded-[14px] p-4 flex justify-between gap-[20px]"

              >


                <div className="flex gap-[10px]">


                  {/* User Avatar */}

                  <div className="bg-[#ECECF0] w-[40px] h-[40px] rounded-full flex items-center justify-center">


                    <p>

                      {
                        review.initial ||
                        review.userName?.charAt(0) ||
                        "U"
                      }

                    </p>


                  </div>







                  <div className="text-[16px]">


                    <p className="text-textColor">


                      {
                        review.userName ||
                        review.userFullName ||
                        "Customer"
                      }


                    </p>





                    <div className="flex items-center text-[#FDC700] mt-[7px]">


                      {

                        Array.from({

                          length:
                          review.rating || 5

                        }).map(
                          (_,star)=>(

                          <FaStar key={star}/>

                        ))

                      }


                    </div>





                    <p className="mt-[7px] text-textGray">


                      {
                        review.comment ||
                        "Great service delivery."
                      }


                    </p>



                  </div>



                </div>







                <p className="text-textGray text-sm">


                  {

                    review.createdAt

                    ?

                    new Date(
                      review.createdAt
                    ).toLocaleDateString()

                    :

                    ""

                  }


                </p>



              </div>


            ))


            :


            (

              <div className="border rounded-[14px] p-5 text-center text-textGray">

                No reviews available yet.

              </div>

            )


          }


        </div>


      )

    }



  </div>


</section>





{/* Optional Information */}

{/*

<section className="w-full max-w-[854px] mx-auto mt-[24px] border rounded-[14px] p-[16px]">

</section>

*/}





<p className="mt-[20px] text-[18px] text-center">

  Viewing Artisan ID: {artisanId}

</p>



</main>

  );

};


export default ArtisanProfile;