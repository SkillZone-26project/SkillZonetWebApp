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
      id: 1,
      name: "Pipe Installation",
    },
    {
      id: 2,
      name: "Leak Repair",
    },
    {
      id: 3,
      name: "Drain Cleaning",
    },
    {
      id: 4,
      name: "Bathroom Fittings",
    },
    {
      id: 5,
      name: "Water Heater Installation",
    },
  ],

  Electrical: [
    {
      id: 6,
      name: "House Wiring",
    },
    {
      id: 7,
      name: "Socket Installation",
    },
    {
      id: 8,
      name: "Light Installation",
    },
  ],

  Painting: [
    {
      id: 9,
      name: "Interior Painting",
    },
    {
      id: 10,
      name: "Exterior Painting",
    },
  ],
};

export const bookingTerms = [
  "Payment is held securely until job completion",
  "Free cancellation up to 2 hours before scheduled time",
  "Final price may vary based on actual work required",
];
