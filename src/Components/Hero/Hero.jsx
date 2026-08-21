import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { CiSearch } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import { AiOutlineAim } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";


const Hero = () => {

  const navigate = useNavigate();


  /* =====================================================
     SKILL STATES
  ====================================================== */


  const [openDropdown,setOpenDropdown] =
    useState(false);


  const [skills,setSkills] =
    useState([]);


  // User typed skill
  const [skillInput,setSkillInput] =
    useState("");


  // Selected skill object if user chooses suggestion
  const [selectedSkill,setSelectedSkill] =
    useState(null);


  const [skillSuggestions,setSkillSuggestions] =
    useState([]);


  const [loadingSkills,setLoadingSkills] =
    useState(false);


  const [skillError,setSkillError] =
    useState("");




  /* =====================================================
     LOCATION STATES
  ====================================================== */


  const [location,setLocation] =
    useState("");


  const [suggestions,setSuggestions] =
    useState([]);


  const [latitude,setLatitude] =
    useState(null);


  const [longitude,setLongitude] =
    useState(null);



  const [loadingLocation,setLoadingLocation] =
    useState(false);





  /* =====================================================
     REFS
  ====================================================== */


  const sessionTokenRef =
    useRef("");


  const debounceRef =
    useRef(null);


  const searchContainerRef =
    useRef(null);





  /* =====================================================
     FETCH SKILLS
  ====================================================== */


  useEffect(()=>{


    const fetchSkills = async()=>{


      try{


        setLoadingSkills(true);

        setSkillError("");



        const token =
          localStorage.getItem("token");



        const res =
          await axios.get(

            "https://skillzonet-backend-auth-v1.onrender.com/api/skills/get-all",

            {
              headers:token
              ?
              {
                Authorization:
                `Bearer ${token}`,
              }
              :
              {}
            }

          );



        console.log(
          "SKILLS RESPONSE:",
          res.data
        );



        const skillsData =
          res.data?.skills ||
          res.data?.data ||
          [];



        const sortedSkills =
          [...skillsData].sort(
            (a,b)=>
              a.name.localeCompare(
                b.name
              )
          );



        setSkills(sortedSkills);



      }
      catch(error){


        console.log(
          "FETCH SKILLS ERROR:",
          error.response?.data ||
          error.message
        );


        setSkillError(
          "Unable to load skills"
        );


      }
      finally{


        setLoadingSkills(false);


      }


    };



    fetchSkills();


  },[]);






  /* =====================================================
     SKILL TYPING SEARCH
  ====================================================== */


 const handleSkillTyping = (value)=>{

  setSkillInput(value);

  // remove old selected skill
  setSelectedSkill(null);


  if(!value.trim()){

    setSkillSuggestions([]);

    setOpenDropdown(false);

    return;

  }



  const filtered =
    skills.filter((skill)=>

      skill.name
      .toLowerCase()
      .includes(
        value.toLowerCase()
      )

    );


  setSkillSuggestions(filtered);


  setOpenDropdown(true);

};




  /* =====================================================
     SELECT SKILL FROM SUGGESTION
  ====================================================== */


  const handleSelectSkill = (skill)=>{


    setSelectedSkill(skill);


    setSkillInput(
      skill.name
    );


    setSkillSuggestions([]);


    setOpenDropdown(false);


  };
  /* =====================================================
     CLICK OUTSIDE SEARCH AREA
  ====================================================== */


  useEffect(()=>{


    const handleClickOutside = (event)=>{


      if(
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target
        )
      ){


        setOpenDropdown(false);

        setSuggestions([]);


      }


    };



    document.addEventListener(
      "mousedown",
      handleClickOutside
    );



    return()=>{


      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );


    };


  },[]);








  /* =====================================================
     LOCATION SEARCH
  ====================================================== */


  const searchLocation = (value)=>{


    setLocation(value);



    /*
      Clear old coordinates
      because user changed location
    */


    setLatitude(null);

    setLongitude(null);




    if(value.trim().length < 3){


      setSuggestions([]);

      sessionTokenRef.current = "";


      return;


    }






    /*
      Create session token
    */


    if(!sessionTokenRef.current){


      sessionTokenRef.current =
        uuidv4();


    }







    clearTimeout(
      debounceRef.current
    );








    debounceRef.current =

      setTimeout(async()=>{


        try{


          setLoadingLocation(true);



          const res =

            await axios.post(

              "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",

              {

                input:value.trim(),

                sessionToken:
                sessionTokenRef.current

              }

            );




          console.log(
            "LOCATION SEARCH RESPONSE:",
            res.data
          );



          setSuggestions(

            res.data?.suggestions || []

          );



        }
        catch(error){


          console.log(

            "LOCATION SEARCH ERROR:",

            error.response?.data ||
            error.message

          );



          setSuggestions([]);



        }
        finally{


          setLoadingLocation(false);


        }



      },400);


  };










  /* =====================================================
     SELECT LOCATION SUGGESTION
  ====================================================== */


  const handleSelectLocation = async(suggestion)=>{


    try{


      console.log(
        "SELECTED LOCATION:",
        suggestion
      );



      setLoadingLocation(true);



      const placeId =
        suggestion.placeId;





      if(!placeId){


        alert(
          "Unable to identify this location."
        );


        return;


      }






      const res =

        await axios.post(

          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",

          {

            placeId,

            sessionToken:
            sessionTokenRef.current

          }

        );





      console.log(
        "LOCATION DETAILS RESPONSE:",
        res.data
      );



      const place =
        res.data;





      const selectedLatitude =

        place?.lat ??
        place?.latitude ??
        place?.location?.lat ??
        place?.location?.latitude ??
        null;





      const selectedLongitude =

        place?.lng ??
        place?.longitude ??
        place?.location?.lng ??
        place?.location?.longitude ??
        null;






      const selectedLocation =

        place?.formattedAddress ??
        place?.formatted_address ??
        place?.address ??
        place?.name ??
        suggestion?.description ??
        suggestion?.name ??
        "";







      console.log(
        "FINAL LOCATION:",
        {
          selectedLocation,
          selectedLatitude,
          selectedLongitude
        }
      );






      if(
        selectedLatitude === null ||
        selectedLongitude === null
      ){


        alert(
          "Coordinates not found for this location."
        );


        return;


      }







      setLocation(
        selectedLocation
      );



      setLatitude(
        selectedLatitude
      );



      setLongitude(
        selectedLongitude
      );





      setSuggestions([]);



      sessionTokenRef.current = "";





    }
    catch(error){


      console.log(

        "SELECT LOCATION ERROR:",

        error.response?.data ||
        error.message

      );



      alert(
        "Unable to select location."
      );



    }
    finally{


      setLoadingLocation(false);


    }


  };
  /* =====================================================
     SEARCH ARTISANS
  ====================================================== */


  const handleSearch = () => {



    /*
      Skill validation

      User can either:
      1. Select skill from dropdown
      2. Type skill manually
    */


   if(!skillInput.trim()){

  alert("Please enter a skill.");

  return;

}


// User typed but did not select from dropdown
if(!selectedSkill){

  alert(
    "Please select a skill from the suggestions before searching."
  );

  return;

}





    /*
      Location validation

      If user typed location,
      they must select suggestion
      to get coordinates.
    */


    if(

      location.trim() &&

      (
        latitude === null ||
        longitude === null
      )

    ){

      console.log(
        "LOCATION VALIDATION FAILED:",
        {
          location,
          latitude,
          longitude
        }
      );


      alert(
        "Please select a location from the suggestions."
      );


      return;

    }





    const searchParams =
      new URLSearchParams();





    /*
      If skill was selected,
      send skill id
    */


    if(selectedSkill){


      searchParams.set(

        "skillId",

        selectedSkill.id ||
        selectedSkill._id

      );


    }





    /*
      Always send skill name/text

      This supports manual typing
    */


    searchParams.set(

      "skill",

      skillInput.trim()

    );







    /*
      Location
    */


    if(location.trim()){


      searchParams.set(

        "location",

        location.trim()

      );


    }





    /*
      Latitude
    */


    if(latitude !== null){


      searchParams.set(

        "latitude",

        latitude

      );


    }





    /*
      Longitude
    */


    if(longitude !== null){


      searchParams.set(

        "longitude",

        longitude

      );


    }







    console.log(

      "===== SEARCH DATA =====",

      {

        skill:
        skillInput.trim(),

        selectedSkill,

        location,

        latitude,

        longitude

      }

    );







    navigate(

      `/artisans?${searchParams.toString()}`

    );



  };









  /* =====================================================
     ENTER KEY SEARCH
  ====================================================== */


  const handleLocationKeyDown = (e)=>{


    if(e.key === "Enter"){


      handleSearch();


    }


  };









  /* =====================================================
     CURRENT LOCATION
  ====================================================== */


  const handleCurrentLocation = ()=>{


    if(!navigator.geolocation){


      alert(

        "Geolocation is not supported by your browser."

      );


      return;


    }






    setLoadingLocation(true);





    navigator.geolocation.getCurrentPosition(


      (position)=>{



        const currentLatitude =

        position.coords.latitude;





        const currentLongitude =

        position.coords.longitude;






        setLatitude(

          currentLatitude

        );





        setLongitude(

          currentLongitude

        );







        setLocation(

          `${currentLatitude.toFixed(6)}, ${currentLongitude.toFixed(6)}`

        );






        setSuggestions([]);





        sessionTokenRef.current = "";






        setLoadingLocation(false);






        console.log(

          "CURRENT LOCATION:",

          {

            latitude:
            currentLatitude,


            longitude:
            currentLongitude

          }

        );





      },



      (error)=>{



        console.log(

          "CURRENT LOCATION ERROR:",

          error

        );




        setLoadingLocation(false);




        alert(

          "Unable to get your current location. Please allow location access."

        );



      }


    );



  };









  /* =====================================================
     CLEANUP
  ====================================================== */


  useEffect(()=>{


    return()=>{


      clearTimeout(

        debounceRef.current

      );


    };


  },[]);


    /* =====================================================
     UI
  ====================================================== */

  return (

    <section className="pt-12 sm:pt-16 lg:pt-20 mt-[60px] sm:mt-[60px] lg:mt-[108px] overflow-x-hidden">


      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start px-4 md:px-6 gap-6">



        {/* =================================================
            LEFT CONTENT
        ================================================= */}


        <div className="flex flex-col gap-4 flex-1 w-full">


          {/* TRUSTED USERS */}

          <button
            type="button"
            className="bg-black text-white text-[12px] rounded-[8px] w-[166px] h-[22px]"
          >
            Trusted by 10,000+ Users
          </button>




          {/* HEADLINE */}

          <h1 className="text-[20px] sm:text-[40px] lg:text-[50px] font-bold leading-[1]">

            <span>
              Find Trusted Artisans
            </span>

            <span className="flex">
              Near You
            </span>

          </h1>





          {/* =================================================
              SEARCH AREA
          ================================================= */}


          <div
            ref={searchContainerRef}
            className="flex flex-col md:flex-row items-stretch mt-6 w-full relative"
          >




            {/* =================================================
                SKILL INPUT
            ================================================= */}


            <div className="relative w-full md:w-[180px]">


              <div
                className="flex items-center justify-between border border-black md:rounded-l-[8px] rounded-t-[8px] md:rounded-t-none px-4 h-[44px] bg-white"
              >


                <input

                  type="text"

                  value={skillInput}

                  placeholder="Search skill"

                  onChange={(e)=>
                    handleSkillTyping(
                      e.target.value
                    )
                  }


                  onFocus={()=>{
                    if(skillInput){
                      handleSkillTyping(
                        skillInput
                      );
                    }
                  }}


                  className="outline-none w-full text-sm"

                />


                <IoChevronDown
                  className={
                    openDropdown
                    ? "rotate-180"
                    : ""
                  }
                />


              </div>





              {/* SKILL SUGGESTIONS */}


              {
                openDropdown && (

                <div
                  className="absolute top-[48px] left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-md z-50 max-h-[250px] overflow-y-auto"
                >


                  {
                    loadingSkills && (

                      <p className="px-4 py-3 text-sm text-gray-500">
                        Loading skills...
                      </p>

                    )
                  }




                  {
                    !loadingSkills &&
                    skillError && (

                      <p className="px-4 py-3 text-sm text-red-500">
                        {skillError}
                      </p>

                    )
                  }





                  {
                    !loadingSkills &&
                    !skillError &&
                    skillSuggestions.length > 0 &&

                    skillSuggestions.map(
                      (skill)=>(

                        <button

                          key={
                            skill.id ||
                            skill._id
                          }

                          type="button"

                          onClick={()=>{

                            handleSelectSkill(
                              skill
                            );

                          }}


                          className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"

                        >

                          {skill.name}

                        </button>


                      )
                    )

                  }




                  {
                    !loadingSkills &&
                    !skillError &&
                    skillSuggestions.length === 0 && (

                    <p className="px-4 py-3 text-sm text-gray-500">
                      No skill found
                    </p>

                    )
                  }



                </div>

                )

              }



            </div>







            {/* =================================================
                LOCATION INPUT
            ================================================= */}



            <div className="relative flex-1">


              <div
                className="flex items-center border border-black px-4 h-[44px] bg-white"
              >


                <CiSearch
                  className="mr-2"
                />


                <input

                  type="text"

                  value={location}

                  placeholder="Search location"


                  onChange={(e)=>
                    searchLocation(
                      e.target.value
                    )
                  }


                  onKeyDown={
                    handleLocationKeyDown
                  }


                  className="outline-none w-full text-sm"

                />



                {
                  loadingLocation && (

                    <div
                      className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                    />

                  )
                }



              </div>







              {/* LOCATION SUGGESTIONS */}



              {
                suggestions.length > 0 && (

                <div
                  className="absolute top-[48px] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-[250px] overflow-y-auto"
                >


                  {
                    suggestions.map(
                      (suggestion,index)=>(


                        <button

                          key={
                            suggestion.placeId ||
                            suggestion.id ||
                            index
                          }


                          type="button"


                          onClick={()=>{

                            handleSelectLocation(
                              suggestion
                            );

                          }}


                          className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100"

                        >


                          {
                            suggestion.description ||
                            suggestion.address ||
                            suggestion.name ||
                            "Location"
                          }


                        </button>


                      )
                    )

                  }


                </div>

                )

              }



            </div>








            {/* CURRENT LOCATION */}



            <button

              type="button"

              onClick={
                handleCurrentLocation
              }


              className="border border-black px-4 h-[44px] flex items-center justify-center bg-white"

            >

              <AiOutlineAim />

            </button>








            {/* SEARCH BUTTON */}



            <button

              type="button"

              onClick={
                handleSearch
              }


              className="
              bg-black
              text-white
              px-6
              h-[44px]
              flex
              items-center
              justify-center
              gap-2
              md:rounded-r-[8px]
              rounded-b-[8px]
              md:rounded-b-none
              "

            >

              Search Artisans


              <IoArrowForwardOutline />

            </button>




          </div>









          {/* FEATURES */}


          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-[14px] mt-4">


            <div className="flex items-center gap-2">

              <LuCircleCheckBig
                className="text-[#00C950] text-xl"
              />

              <span className="font-medium">
                Verified Professionals
              </span>

            </div>




            <div className="flex items-center gap-2">

              <LuCircleCheckBig
                className="text-[#00C950] text-xl"
              />

              <span className="font-medium">
                Secure Payment
              </span>

            </div>


          </div>



        </div>









        {/* =================================================
            RIGHT CONTENT
        ================================================= */}



        <div className="flex flex-col items-center md:flex-row gap-6 mt-6 md:mt-0 md:items-end w-full lg:w-auto">





          {/* PLUMBING CARD */}


          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[362px] p-[16px] bg-white">


            <img

              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_aqguza.png"

              alt="Plumbing Service"

              className="w-full h-[192px] object-cover"

            />



            <div className="flex items-center gap-1 mt-[36px]">

              <span className="text-[#FDC700] text-lg">
                ★
              </span>


              <span className="text-[14px]">
                4.9 Rating
              </span>


            </div>



            <p className="pt-[36px] font-semibold text-textGray">
              Plumbing Services
            </p>


          </div>









          {/* ELECTRICAL CARD */}



          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[330px] p-[16px] bg-white">


            <img

              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_1_vtrxai.png"

              alt="Electrical Service"

              className="w-full h-[192px] object-cover"

            />



            <div className="flex items-center gap-1 mt-[36px]">

              <span className="text-[#FDC700] text-lg">
                ★
              </span>


              <span className="text-[14px]">
                4.8 Rating
              </span>


            </div>



            <p className="pt-[36px] font-semibold text-textGray">
              Electrical Work
            </p>



          </div>



        </div>



      </div>


    </section>

  );


};

export default Hero;