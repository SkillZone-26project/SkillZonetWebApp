import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-textColor mb-[25px]">
      
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* LOGO + DESCRIPTION */}
          <div>
            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770651091/Footer_Logo_urjigg.png"
              alt="Footer Logo"
              className="mb-4 w-[287px]"
            />
            <p className="text-textGray text-[14px] max-w-[257px]">
              Connecting clients with trusted artisans across Nigeria
            </p>
          </div>

          {/* FOR CLIENTS */}
          <div>
            <h4 className="font-semibold text-[16px] mb-4">For Clients</h4>
            <ul className="space-y-2 text-textGray text-[14px]">
              <li className="hover:text-textColor cursor-pointer">Find Artisans</li>
              <li className="hover:text-textColor cursor-pointer">How It Works</li>
              <li className="hover:text-textColor cursor-pointer">Safety</li>
            </ul>
          </div>

          {/* FOR ARTISANS */}
          <div>
            <h4 className="font-semibold text-[16px] mb-4">For Artisans</h4>
            <ul className="space-y-2 text-textGray text-[14px]">
              <li className="hover:text-textColor cursor-pointer">Join SkillZonet</li>
              <li className="hover:text-textColor cursor-pointer">Pricing</li>
              <li className="hover:text-textColor cursor-pointer">Success Stories</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold text-[16px] mb-4">Company</h4>
            <ul className="space-y-2 text-textGray text-[14px]">
              <li className="hover:text-textColor cursor-pointer">About Us</li>
              <li className="hover:text-textColor cursor-pointer">Contact</li>
              <li className="hover:text-textColor cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-textGray ml-[55px]">
        <p className="text-center text-textGray text-[13px] py-4 px-4">
          © {new Date().getFullYear()} SkillZonet. All rights reserved. | Proudly Nigerian 🇳🇬
        </p>
      </div>
    </footer>
  );
};

export default Footer;
