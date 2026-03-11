import React from "react";
import { useParams } from "react-router-dom";

const ArtisanProfile = () => {
  const { id } = useParams();

  return (
    <main className="p-[40px]">
      <h1 className="text-[28px] font-semibold">
        Artisan Profile
      </h1>

      <p className="mt-[20px] text-[18px]">
        Viewing Artisan ID: {id}
      </p>
    </main>
  );
};

export default ArtisanProfile;