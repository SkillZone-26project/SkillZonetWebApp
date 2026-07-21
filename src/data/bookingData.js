// src/data/bookingData.js

export const artisan = {
  id: 1,
  name: "John Mensah",
  profession: "Plumbing",
  image:
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1774723806/active_nzhkd0.jpg",
};

export const subServices = {
  Plumbing: [
    {
      id: "pipe-installation",
      name: "Pipe Installation",
    },
    {
      id: "leak-repair",
      name: "Leak Repair",
    },
    {
      id: "drain-cleaning",
      name: "Drain Cleaning",
    },
    {
      id: "bathroom-fittings",
      name: "Bathroom Fittings",
    },
    {
      id: "water-heater-installation",
      name: "Water Heater Installation",
    },
  ],

  Electrical: [
    {
      id: "house-wiring",
      name: "House Wiring",
    },
    {
      id: "socket-installation",
      name: "Socket Installation",
    },
    {
      id: "light-installation",
      name: "Light Installation",
    },
  ],

  Painting: [
    {
      id: "interior-painting",
      name: "Interior Painting",
    },
    {
      id: "exterior-painting",
      name: "Exterior Painting",
    },
  ],
};

export const bookingTerms = [
  "Payment is held securely until job completion",
  "Free cancellation up to 2 hours before scheduled time",
  "Final price may vary based on actual work required",
];
