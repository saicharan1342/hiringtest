// Helper function to generate random class names
export const classNames = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Art",
  "PE",
  "Music",
  "CSE",
  "Geography",
  "Biology",
];

// Function to generate random class names
const generateRandomClasses = () => {
  // Pick 2-4 random classes
  const randomClasses = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => {
    return classNames[Math.floor(Math.random() * classNames.length)];
  });

  return randomClasses.join(", ");
};

// Function to generate random family members
const generateRandomFamilyMembers = () => {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/30",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      image: "https://via.placeholder.com/30",
    },
    {
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.johnson@example.com",
      image: "https://via.placeholder.com/30",
    },
  ];
};

// Updated students array
export const students = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Student ${index + 1}`,
  age: `${2 + (index % 5)}y ${index % 12}m`,
  registrationNumber: `24ART00${index + 1}`,
  classes: generateRandomClasses(),
  familyMembers: generateRandomFamilyMembers(), // Random family members
  profileImage: "https://via.placeholder.com/150",
}));
