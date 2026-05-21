// src/data/supportData.js

/* ================= HERO CTA (LEFT SIDE) ================= */
export const supportHeroCTAs = [
  {
    id: "getting-started",
    title: "Getting started",
    desc: "Learn how to subscribe your account, find artisans, and book services",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777465349/2_votcjl.svg",
    bgColor: "bg-[#155DFC54]",
    href: "/help/getting-started",
  },
  {
    id: "account-billing",
    title: "Account & Billing",
    desc: "Manage your account settings, payments, and billing details",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777373063/1_uiwwao.svg",
    bgColor: "bg-[#FDC7003B]",
    href: "/help/billing",
  },
  {
    id: "booking-tracking",
    title: "Booking & Tracking",
    desc: "Track your bookings and monitor service progress in real time",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777465554/2_egdicw.svg",
    bgColor: "bg-[#8B0097A1]",
    href: "/help/tracking",
  },
];

/* ================= HERO RIGHT SIDE FEATURES ================= */
export const heroRightFeatures = [
  {
    id: "verified",
    title: "Verified Artisans",
    desc: "All artisans go through various verified channels",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777465664/2_zha7sv.svg",
    bgColor: "bg-[#E7000B30]",
  },
  {
    id: "reviews",
    title: "Trusted Reviews",
    desc: "All artisans go through various verified channels",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777373622/1_dtxodf.svg",
    bgColor: "bg-[#00A63E54]",
  },
  {
    id: "tracking",
    title: "Real-Time Tracking",
    desc: "Customer will track artisans in real time from start to finish",
    icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777465765/2_afk8rt.svg",
    bgColor: "bg-[#62D4EE26]",
  },
];

/* ================= HERO IMAGES ================= */
export const heroImages = {
  main: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777207845/86560dd2588e72c02c7f57712cde347a90371e05_a8cf6x.jpg",
  phone: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777211926/ee340cdd8fa07667cf23568ec4210a2c8c2277dc_hi4xs3.jpg",
};

/* ================= CONTACT ================= */
export const supportContacts = {
  title: "Contact Us",
  desc: "Still need help? Get in touch with our support for further assistance",

  methods: [
    {
      id: "email",
      title: "Email Support",
      desc: "support@skillzonet.com",
      iconType: "lucide", // 👈 tells UI how to render
      iconName: "Mail",
      bgColor: "bg-[#2D2B52]",
      iconColor: "text-[#4F46E5]",
    },
    {
      id: "chat",
      title: "Chat Support",
      desc: "Start a live chat with our support team",
      iconType: "image",
      icon: "https://res.cloudinary.com/dipdvqnin/image/upload/v1777475273/2_ymtd80.svg",
      bgColor: "bg-[#432C1E]",
    },
  ],
};