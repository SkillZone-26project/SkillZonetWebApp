import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  LuArrowLeft,
  LuHeart,
  LuCalendar,
  LuMessageCircle,
  LuPhone,
} from "react-icons/lu";

import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";



const API_BASE_URL =
  "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans";




// FALLBACK DATA
// This shows when API fails

const defaultArtisan = {

  id: "default",

  fullName: "John Mensah",
     skill: "Plumber",

  businessName: "Professional Plumbing Service",

  bio:
    "Professional plumber with 10+ years experience. Specializing in residential and commercial plumbing.", 
  
  


  profilePic:
    "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png",


  city: "Lagos",

  state: "Nigeria",


  createdAt: "2023-01-01",


  phone: "+234000000000",

  email: "artisan@example.com",


  averageRating: 4.8,


  totalJobs: 342,


  yearsExperience: 10,


  isAvailable: true,


  skills: [

    {
      subSkill:{
        name:"Plumbing"
      }
    },

    {
      subSkill:{
        name:"Pipe Fitting"
      }
    }

  ],


  portfolioItems:[

    {
      image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773600402/Container_4_kqat3x.png"
    },

    {
      image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773600402/Image_Portfolio_2_xsk52y.png"
    },

    {
      image:
      "https://res.cloudinary.com/dqtyrpeh/image/upload/v1773600402/Image_Portfolio_3_xbwaev.png"
    }

  ],


  reviews:[
    {
      initial: "M",
      userFullName: "Michael Chen",
    }

  ]

};






const ArtisanProfile = () => {


  const { id } = useParams();


  const navigate = useNavigate();



  const [artisan,setArtisan] = useState(defaultArtisan);


  const [activeTab,setActiveTab] = useState("requests");


  const [loading,setLoading] = useState(true);


  const [error,setError] = useState("");







  useEffect(()=>{


    const fetchArtisanProfile = async()=>{


      try{


        setLoading(true);



        if(!id){

          setArtisan(defaultArtisan);

          return;

        }




        const response = await fetch(

          `${API_BASE_URL}/${id}`

        );




        if(!response.ok){

          throw new Error(
            "Unable to fetch artisan profile"
          );

        }





        const result = await response.json();




        console.log(
          "Artisan API Response:",
          result
        );





        const artisanData =

        result?.data ||

        result;







        setArtisan({

          ...defaultArtisan,

          ...artisanData,


          skills:

          artisanData.skills ||

          defaultArtisan.skills,



          reviews:

          artisanData.reviews ||

          [],



          portfolioItems:

          artisanData.portfolioItems ||

          defaultArtisan.portfolioItems


        });






      }catch(err){



        console.log(
          "FETCH ERROR:",
          err
        );



        // setError(
        //   "Unable to load artisan details. Showing default information."
        // );



        setArtisan(defaultArtisan);



      }finally{


        setLoading(false);


      }



    };



    fetchArtisanProfile();



  },[id]);







  if(loading){


    return (

      <main className="px-[16px]">

        <p className="text-center mt-20">

          Loading Artisan Profile...

        </p>

      </main>

    );

  }






  return (

    <main className="px-[16px]">



      {
        error &&

        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mt-5">

          {error}

        </div>

      }






      {/* Header */}

      <header className="border-b w-full">

        <div className="flex items-center gap-[14px] w-full max-w-[854px] mx-auto py-[12px]">

          <button onClick={()=>navigate(-1)}>

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


            <img
  src={
    artisan.profilePic ||
    "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg"
  }
  alt={artisan.fullName || "Artisan"}
  className="w-[80px] h-[80px] rounded-full object-cover"
/>



                    <div className="flex flex-col gap-[6px]">


              {/* Name */}

              <div className="flex items-center gap-[5px] text-[18px] font-semibold">

                <p className="text-textColor">

                  {artisan.fullName}

                </p>


                {/* Keep verification icon */}

                <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />

 {

                  artisan.isAvailable &&

                  <button

                    className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]"

                  >

                    Premium

                  </button>

                }
              </div>






              {/* Skills */}

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

              <div className="flex flex-wrap gap-[5px] mt-[10px]">


                {

                  artisan.skills?.length > 0

                  ?

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


                  :

                  <>

                    <button

                      className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"

                    >

                      Plumbing

                    </button>


                    <button

                      className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"

                    >

                      Pipe Fitting

                    </button>


                  </>


                }





               


              </div>








              {/* Rating */}

              <div className="flex items-center gap-[5px] mt-[6px]">


                <FaStar className="text-[#FDC700] text-[18px]" />


                <p>

                  {artisan.averageRating || 0}


                  <span className="text-textGray">

                    {" "}({artisan.reviews?.length || 0} reviews)

                  </span>


                </p>


              </div>








              {/* Location */}

              <div className="flex flex-wrap items-center gap-[16px] mt-[6px] text-textGray text-[14px] font-normal">


                <div className="flex items-center gap-[5px]">


                  <GrLocation />


                  <p>

                    {artisan.city || "Lagos"}, {artisan.state || "Nigeria"}

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

<div
  className="w-full text-[#717182] max-w-[500px] text-[14px] md:text-[16px] font-normal mt-[6px] max-h-[70px] overflow-y-auto pr-[5px]"
>

  <p>
    {
      artisan.bio ||
      "Professional plumber with experience. Providing quality services."
    }
  </p>

</div>




            </div>

          </div>








          {/* Heart Icon */}


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


              <p className="text-[14px] font-normal text-textGray">

                Jobs Completed

              </p>


            </div>







            <div className="flex flex-col items-center">


              <p className="text-[24px] font-semibold text-textColor">
                {

                  artisan.yearsExperience ||

                  "10"

                }

              </p>


              <p className="text-[14px] font-normal text-textGray">

                Years of Experience

              </p>


            </div>








            <div className="flex flex-col items-center">


              <p className="text-[24px] font-semibold text-textColor">

                {

                  artisan.coverageRadius ||

                  15

                }

                km

              </p>


              <p className="text-[14px] font-normal text-textGray">

                Coverage Radius

              </p>


            </div>





          </div>


        </div>





      </section>

      {/* Button Section */}

      <section className="w-full max-w-[854px] mx-auto mt-[24px] flex flex-col sm:flex-row gap-[12px]">


        <button

          onClick={() => navigate(`/booking/${artisan.id}`)}

          className="flex items-center justify-center flex-1 bg-black text-white text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px]"

        >

          <LuCalendar />

          Book Now


        </button>






        <button

          onClick={() => navigate(`/messages/${artisan.id}`)}

          className="flex items-center justify-center flex-1 bg-white text-black text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px] border-2"

        >

          <LuMessageCircle />

          Send Message


        </button>


        <button

          onClick={() => window.location.href = `tel:${artisan.phone}`}

          className="flex items-center justify-center flex-1 bg-white text-black text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px] border-2"

        >

          <LuPhone />

          Call


        </button>




      </section>



      <section className="w-full max-w-[854px] mx-auto mt-[24px]">





        {/* Tabs */}


        <div className="flex gap-[10px] w-full h-[38px] bg-[#ECECF0] rounded-[14px] text-[12px] font-medium p-[4px] overflow-x-auto">



          <button

            onClick={() => setActiveTab("requests")}

            className={`flex-1 rounded-[14px] ${
              activeTab === "requests"
              ? "bg-white text-textColor"
              : ""
            }`}

          >

            Portfolio


          </button>







          <button

            onClick={() => setActiveTab("active")}

            className={`flex-1 rounded-[14px] ${
              activeTab === "active"
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
            activeTab === "requests" && (


              <div>


                <div className="border rounded-[14px] p-4">


                  <p className="text-[18px] font-semibold text-textColor mt-[20px] mb-[30px]">

                    Work Gallery

                  </p>





                  <div className="flex gap-[16px] overflow-x-auto">



                    {

                      artisan.portfolioItems?.length > 0

                      ?


                      artisan.portfolioItems.map((item,index)=>(



                        <img

                          key={index}

                          src={

                            item.image ||

                            item.url ||

                            item

                          }


                          alt="Artisan work"


                          className="w-[260px] rounded-[14px] object-cover"

                        />


                      ))



                      :



                      <p className="text-textGray">

                        No portfolio uploaded yet.

                      </p>


                    }



                  </div>



                </div>



              </div>


            )
          }









          {/* REVIEWS */}



          {

            activeTab === "active" && (


              <div className="space-y-[16px]">



                {


                  artisan.reviews?.length > 0


                  ?


                  artisan.reviews.map((review,index)=>(



                    <div

                      key={index}

                      className="border rounded-[14px] p-4 flex justify-between gap-[20px]"

                    >





                      <div className="flex gap-[10px]">



                        <div className="bg-[#ECECF0] w-[40px] h-[40px] rounded-[20px] flex items-center justify-center">


                          <p>


                            {

                              review.userName

                              ?

                              review.userName.charAt(0)

                              :

                              "U"

                            }


                          </p>


                        </div>







                        <div className="text-[16px]">



                          <p className="text-textColor">


                            {

                              review.userName ||

                              "Customer"

                            }


                          </p>






                          <div className="flex items-center text-[#FDC700] mt-[7px]">


                            {

                              Array.from({

                                length:

                                review.rating || 5

                              }).map((_,star)=>(


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








                      <p className="text-textGray">


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



                  <div className="border rounded-[14px] p-5 text-center text-textGray">


                    No reviews available yet.


                  </div>



                }





              </div>


            )

          }






        </div>





      </section>
      
      {/* <section className="w-full max-w-[854px] mx-auto mt-[24px] border rounded-[14px] p-[16px] md:p-[24px]">



        <div className="flex items-center gap-[10px]">


          <IoLocationOutline className="text-[#2B7FFF]" />



          <p className="text-textColor">


            {

              artisan.isAvailable

              ?

              "Artisan is currently available for new jobs"

              :

              "Artisan is currently unavailable"

            }



          </p>



        </div>



      </section> */}

      {/* <section className="w-full max-w-[854px] mx-auto mt-[24px] mb-[30px]">


        <h2 className="text-[18px] font-semibold text-textColor mb-[10px]">


          More Information


        </h2>





        <p className="text-textGray">


          {

            artisan.address ||

            "Contact artisan to discuss project requirements, pricing, and availability."

          }


        </p>



      </section> */}


      <p className="mt-[20px] text-[18px] text-center">


        Viewing Artisan ID: {id}


      </p>





    </main>

  );


};



export default ArtisanProfile;