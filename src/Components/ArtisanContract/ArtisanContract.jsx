import Nav from "../../Components/Nav/Nav";
import ScopeCompilationForm from "./ScopeCompilationForm";
import ContractPreview from "./ContractPreview";

const ArtisanContract = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-[80px]">
      <Nav />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-start">
          {/* Left */}
          <ScopeCompilationForm />

          {/* Right */}
          <ContractPreview />
        </div>
      </div>
    </div>
  );
};

export default ArtisanContract;
