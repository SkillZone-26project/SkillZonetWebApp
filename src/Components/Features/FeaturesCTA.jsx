import { featuresCTA } from "../../data/featuresData";
import { useNavigate } from "react-router-dom";

const FeaturesCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white h-[264px] flex items-center justify-center">
      
      <div className="text-center max-w-[720px] px-4">
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
          {featuresCTA.title}
        </h2>

        <p className="text-base text-gray-300 mt-4 leading-[24px]">
          {featuresCTA.desc}
        </p>

        <button
          onClick={() => navigate(featuresCTA.href)}
          className="mt-6 bg-[#ECEEF2] text-black px-6 py-2.5 rounded-lg text-sm font-medium"
        >
          {featuresCTA.buttonText}
        </button>

      </div>
    </section>
  );
};

export default FeaturesCTA;