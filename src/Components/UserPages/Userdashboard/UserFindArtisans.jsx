import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { MdKeyboardArrowDown } from "react-icons/md";
import {
  LuSlidersHorizontal,
  LuArrowRight,
} from "react-icons/lu";

import { GrLocation } from "react-icons/gr";

import AvailableArtisans from "../../UserPages/Userdashboard/AvailableArtisans";


const SEARCH_STORAGE_PREFIX =
  "skillzonet_search_artisans";



const UserFindArtisans = () => {


  // =========================================================
  // SKILLS
  // =========================================================


  const [skills, setSkills] =
    useState([]);


  const [showSkills, setShowSkills] =
    useState(false);



  const [selectedSkill, setSelectedSkill] =
    useState("");



  const [selectedSkillId, setSelectedSkillId] =
    useState("");



  const [skillSuggestions, setSkillSuggestions] =
    useState([]);



  const [hasSelectedSkill, setHasSelectedSkill] =
    useState(false);




  // =========================================================
  // FILTERS
  // =========================================================


  const [showFilters, setShowFilters] =
    useState(false);



  const [filters, setFilters] =
    useState({

      verifiedOnly:false,

      premiumOnly:false,

      experience:"",

      rating:"",

      distance:"",

    });




  // =========================================================
  // PAGINATION
  // =========================================================


  const [page, setPage] =
    useState(1);



  const [limit] =
    useState(10);



  const [pagination, setPagination] =
    useState({

      total:0,

      totalPages:1,

    });





  // =========================================================
  // LOCATION
  // =========================================================


  const [location, setLocation] =
    useState("");



  const [latitude, setLatitude] =
    useState(null);



  const [longitude, setLongitude] =
    useState(null);



  const [suggestions, setSuggestions] =
    useState([]);





  // =========================================================
  // ARTISAN SEARCH
  // =========================================================


  const [artisans, setArtisans] =
    useState([]);



  const [searched, setSearched] =
    useState(false);



  const [isSearching, setIsSearching] =
    useState(false);



  const [
    showNoArtisanModal,
    setShowNoArtisanModal
  ] = useState(false);






  // =========================================================
  // REFS
  // =========================================================


  const debounceRef =
    useRef(null);



  const sessionTokenRef =
    useRef("");



  const skillDropdownRef =
    useRef(null);



  const locationDropdownRef =
    useRef(null);


  // =========================================================
  // GET SEARCH STORAGE KEY
  // =========================================================


  const getSearchStorageKey = () => {

    const email =
      localStorage.getItem(
        "verifyEmail"
      );


    if(!email){
      return null;
    }


    return `${SEARCH_STORAGE_PREFIX}_${email
      .toLowerCase()
      .trim()}`;

  };





  // =========================================================
  // CLOSE DROPDOWNS
  // =========================================================


  useEffect(()=>{


    const handleClickOutside =
    (event)=>{


      if(
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(
          event.target
        )
      ){

        setShowSkills(false);

      }



      if(
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(
          event.target
        )
      ){

        setSuggestions([]);

      }


    };



    document.addEventListener(
      "mousedown",
      handleClickOutside
    );



    return ()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  },[]);







  // =========================================================
  // FETCH SKILLS
  // =========================================================


  useEffect(()=>{


    const fetchSkills =
    async()=>{


      try{


        const token =
        localStorage.getItem(
          "token"
        );



        const res =
        await axios.get(

          "https://skillzonet-backend-auth-v1.onrender.com/api/skills/get-all",

          {

            headers:{

              Authorization:
              `Bearer ${token}`,

            }

          }

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



      }catch(error){


        console.log(
          "FETCH SKILLS ERROR:",
          error
        );


      }


    };



    fetchSkills();


  },[]);








  // =========================================================
  // SKILL SEARCH WHILE TYPING
  // =========================================================


  const handleSkillTyping =
  (value)=>{


    setSelectedSkill(value);



    setSelectedSkillId("");

    setHasSelectedSkill(false);



    if(!value.trim()){


      setSkillSuggestions([]);

      setShowSkills(false);

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


    setShowSkills(true);


  };







  // =========================================================
  // SELECT SKILL
  // =========================================================


  const handleSelectSkill =
  (skill)=>{


    const skillId =
    skill.id ||
    skill._id;



    setSelectedSkill(
      skill.name
    );



    setSelectedSkillId(
      skillId
    );



    setHasSelectedSkill(
      true
    );



    setSkillSuggestions([]);


    setShowSkills(false);


  };







  // =========================================================
  // LOCATION SEARCH
  // =========================================================


  const searchLocation =
  (value)=>{


    setLocation(value);



    setLatitude(null);

    setLongitude(null);




    if(value.length < 3){


      setSuggestions([]);

      sessionTokenRef.current = "";

      return;

    }





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


        const res =
        await axios.post(

          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",

          {

            input:value,

            sessionToken:
            sessionTokenRef.current,

          }

        );



        setSuggestions(
          res.data?.suggestions || []
        );



      }catch(error){


        console.log(
          "LOCATION SEARCH ERROR:",
          error
        );


        setSuggestions([]);


      }



    },400);



  };








  // =========================================================
  // SELECT LOCATION
  // =========================================================


  const handleSelectLocation =
  async(item)=>{


    try{


      const res =
      await axios.post(

        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",

        {

          placeId:
          item.placeId,


          sessionToken:
          sessionTokenRef.current,

        }

      );



      const place =
      res.data;



      setLocation(
        place.formattedAddress ||
        item.name
      );



      setLatitude(
        place.lat
      );



      setLongitude(
        place.lng
      );



      setSuggestions([]);



      sessionTokenRef.current = "";



    }catch(error){


      console.log(
        "SELECT LOCATION ERROR:",
        error
      );


    }


  };
  // =========================================================
  // SEARCH ARTISANS
  // =========================================================


  const handleSearch =
  async(openSearch=true)=>{


    if(!hasSelectedSkill){


      alert(
        "Please select a skill from the suggestion list before searching."
      );


      return;


    }




    if(openSearch){


      setSearched(true);

      setPage(1);


    }





    if(
      latitude === null ||
      longitude === null
    ){


      setShowNoArtisanModal(true);

      setIsSearching(false);

      return;


    }





    setIsSearching(true);

    setShowNoArtisanModal(false);




    try{


      const res =
      await axios.get(

        "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans/nearby",

        {

          params:{


            latitude,


            longitude,


            skillId:
            selectedSkillId,


            radiusInKm:
            filters.distance || 15,


            isSubSkill:false,


            page,


            limit,



            verifiedOnly:
            filters.verifiedOnly,


            premiumOnly:
            filters.premiumOnly,


            experience:
            filters.experience,


            rating:
            filters.rating,


          }

        }

      );





      const artisansData =

      res.data?.data?.artisans ||

      res.data?.data?.data ||

      [];





      const meta =
      res.data?.data?.meta || {};




      setPagination({

        total:
        meta.total || 0,


        totalPages:
        meta.totalPages || 1,

      });






      if(
        Array.isArray(artisansData) &&
        artisansData.length > 0
      ){


        setArtisans(
          artisansData
        );



        setShowNoArtisanModal(false);





        const storageKey =
        getSearchStorageKey();



        if(storageKey){


          localStorage.setItem(

            storageKey,


            JSON.stringify({

              artisans:
              artisansData,


              totalResults:
              meta.total ||
              artisansData.length,



              search:{


                selectedSkill,


                selectedSkillId,


                location,


                latitude,


                longitude,


                filters,


              }


            })

          );


        }



      }else{


        setArtisans([]);



        const storageKey =
        getSearchStorageKey();



        if(storageKey){

          localStorage.removeItem(
            storageKey
          );

        }



        setShowNoArtisanModal(true);


      }



    }catch(error){



      console.log(

        "SEARCH ARTISANS ERROR:",

        error.response?.data ||
        error.message

      );



      setArtisans([]);



      setShowNoArtisanModal(true);



    }

    finally{


      setIsSearching(false);


    }


  };







  // =========================================================
  // PAGE CHANGE SEARCH
  // =========================================================


  useEffect(()=>{


    if(!searched){

      return;

    }



    handleSearch(false);



  },[page]);







return (

<main className="pt-[85px] px-4">



{/* =====================================================
    SKILL SEARCH
===================================================== */}


<section className="flex flex-col sm:flex-row items-center gap-[8px]">


<div
ref={skillDropdownRef}
className="relative w-full max-w-[1060px]"
>


<div className="w-full flex items-center justify-between px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]">


<input

type="text"

placeholder="Search skill (e.g plumber, electrician)"

value={selectedSkill}

onChange={(e)=>
handleSkillTyping(
e.target.value
)
}

onFocus={()=>{
if(selectedSkill){
handleSkillTyping(selectedSkill);
}
}}

className="bg-transparent w-full text-[14px] outline-none"

/>


<MdKeyboardArrowDown className="text-[20px]" />


</div>





{/* SKILL DROPDOWN */}


{showSkills && (

<div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">


{
skillSuggestions.length > 0 ? (

skillSuggestions.map((skill)=>{


const skillId =
skill.id || skill._id;



return (

<div

key={skillId}

onClick={()=>
handleSelectSkill(skill)
}

className="px-4 py-3 hover:bg-gray-100 cursor-pointer"

>

{skill.name}


</div>


);


})


):(


<div className="px-4 py-3 text-gray-500">

No skill found

</div>


)

}



</div>

)}


</div>





{/* FILTER BUTTON */}


<button

type="button"

onClick={()=>
setShowFilters(true)
}

className="w-[36px] h-[36px] rounded-[8px] border flex items-center justify-center"

>


<LuSlidersHorizontal className="text-[18px]" />


</button>



</section>







{/* =====================================================
    LOCATION SEARCH
===================================================== */}



<section className="flex flex-col sm:flex-row items-center gap-[10px] mt-[16px]">


<div

ref={locationDropdownRef}

className="relative w-full flex items-center gap-[5px] max-w-[750px] px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]"

>


<GrLocation className="text-[18px]" />


<input

type="text"

placeholder="Enter your location"

value={location}

onChange={(e)=>
searchLocation(
e.target.value
)
}

className="bg-transparent w-full text-[14px] outline-none"

/>





{/* LOCATION DROPDOWN */}

{suggestions.length > 0 && (

<div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">


{
suggestions.map((item)=>(


<div

key={item.placeId}

onClick={()=>
handleSelectLocation(item)
}

className="px-4 py-3 hover:bg-gray-100 cursor-pointer"

>


{item.name}


</div>


))

}


</div>

)}



</div>





<button

type="button"

onClick={()=>
handleSearch(true)
}

disabled={isSearching}

className={`w-full sm:w-[200px] h-[36px] flex items-center gap-[10px] rounded-[8px] text-white justify-center ${
isSearching
?
"bg-gray-500 cursor-not-allowed"
:
"bg-black"
}`}

>


<p>

{
isSearching
?
"Searching..."
:
"Search"
}

</p>



{!isSearching && (

<LuArrowRight className="text-[18px]" />

)}



</button>



</section>

{/* =====================================================
    AVAILABLE ARTISANS
===================================================== */}


<AvailableArtisans

  artisans={artisans}

  searched={searched}

  totalResults={
    pagination.total
  }

  isSearching={isSearching}

/>




{/* =====================================================
    NO ARTISAN MODAL
===================================================== */}


{showNoArtisanModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


<div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] text-center">


<h2 className="text-lg font-semibold mb-3">

No Artisan Found

</h2>



<p className="text-gray-600 text-sm mb-5">

Sorry, we couldn't find any artisan matching your search location and skill.

</p>




<button

onClick={()=>setShowNoArtisanModal(false)}

className="px-5 py-2 bg-black text-white rounded-lg"

>

Close

</button>



</div>


</div>

)}



</main>

);


};


export default UserFindArtisans;

