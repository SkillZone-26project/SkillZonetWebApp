import { useState, useRef } from "react";
import { MapPin } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const LocationSection = ({ booking, setBooking }) => {
  const [suggestions, setSuggestions] = useState([]);

  const debounceRef = useRef(null);
  const sessionTokenRef = useRef("");

  const searchLocation = async (value) => {
    setBooking({
      ...booking,
      address: value,
    });

    if (value.length < 3) {
      setSuggestions([]);
      sessionTokenRef.current = "";
      return;
    }

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = uuidv4();
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.post(
          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
          {
            input: value,
            sessionToken: sessionTokenRef.current,
          }
        );

        setSuggestions(res.data.suggestions || []);

      } catch (err) {
        console.log(err);
      }
    }, 400);
  };


  const handleSelect = async (item) => {
    try {

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          placeId: item.placeId,
          sessionToken: sessionTokenRef.current,
        }
      );


      const place = res.data;


      setBooking({
        ...booking,
        address: place.formattedAddress,
        latitude: place.lat,
        longitude: place.lng,
        state: place.state || "",
        city: place.city || "",
      });


      setSuggestions([]);

      sessionTokenRef.current = "";

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className="px-6 py-6 border-t">

      <h2 className="text-lg font-semibold mb-5">
        Location
      </h2>


      <div className="relative">

        <MapPin
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />


        <input
          type="text"
          value={booking.address}
          onChange={(e)=>searchLocation(e.target.value)}
          placeholder="Enter your location / address"
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
        />


        {suggestions.length > 0 && (

          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">

            {suggestions.map((item)=>(
              <button
                key={item.placeId}
                type="button"
                onClick={()=>handleSelect(item)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >

                {item.name}

              </button>
            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default LocationSection;