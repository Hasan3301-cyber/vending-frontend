import React, { useState } from "react";
import orderCoverImg from "../../../assets/slide3.png";
import Cover from "../../Shared/Cover/Cover1";

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="flex border p-6 rounded-lg shadow-md bg-black max-w-screen-x1 mx-auto mb-6">
      <div className="w-32 h-32 rounded overflow-hidden mr-4">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold text-blue-700 hover:underline">
          <a href={lawyer.website} target="_blank" rel="noopener noreferrer">
            {lawyer.name}
          </a>
        </h2>

        <a href="#" className="text-sm text-blue-500 hover:underline">
          Past client? Leave a review.
        </a>

        <p className="text-gray-600 mt-1">{lawyer.description}</p>
        <p className="text-gray-700">{lawyer.address}</p>

        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-700">
          <span className="flex items-center">
            👥 {lawyer.superLawyers} Super Lawyer
          </span>
          <span className="flex items-center">
            💼 {lawyer.experience} Years Experience
          </span>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          🗣️ Location: {lawyer.languages.join(", ")}
        </div>
      </div>

      <div className="flex flex-col justify-center items-end ml-4 text-blue-600 text-sm space-y-2">
        <a href={lawyer.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
          🔗 Visit Website
        </a>
        <a href={`tel:${lawyer.phone}`} className="hover:underline">
          📞 {lawyer.phone}
        </a>
        <a href={lawyer.profileLink} className="hover:underline">
          👤 Firm Profile
        </a>
      </div>
    </div>
  );
};

// Sample Data
const lawyersData = [
  {
    name: "Mahmudul Hasan",
    image: "https://via.placeholder.com/150",
    website: "https://example.com",
    description: "Criminal Defense Lawyers Serving Elmira, NY (East Aurora)",
    address: "121 Hamburg Street, East Aurora, NY 14052",
    superLawyers: 1,
    experience: 49,
    phone: "01521-729039",
    profileLink: "#",
    languages: ["Kurigram"],
  },
  {
    name: "Abu Rahul Nafis",
    image: "https://via.placeholder.com/150",
    website: "https://janesmithlaw.com",
    description: "Family Law Expert in Los Angeles, CA",
    address: "456 Sunset Blvd, Los Angeles, CA 90028",
    superLawyers: 2,
    experience: 15,
    phone: "01610-000510",
    profileLink: "#",
    languages: ["Bogra"],
  },
  {
    name: "Khadimul Islam",
    image: "https://via.placeholder.com/150",
    website: "https://alikhanlaw.com",
    description: "Immigration Law Practice in Houston, TX",
    address: "789 Liberty Ave, Houston, TX 77002",
    superLawyers: 3,
    experience: 20,
    phone: "01609-826781",
    profileLink: "#",
    languages: ["Tangail"],
  },
  {
    name: "Adib Hasan",
    image: "https://via.placeholder.com/150",
    website: "https://example.com",
    description: "Criminal Defense Lawyers Serving Elmira, NY (East Aurora)",
    address: "121 Hamburg Street, East Aurora, NY 14052",
    superLawyers: 1,
    experience: 49,
    phone: "01976-498607",
    profileLink: "#",
    languages: ["Narsingdi"],
  }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    ...new Set(lawyersData.flatMap((lawyer) => lawyer.languages)),
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedLanguage("");
  };

  const filteredLawyers = lawyersData.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm) ||
      lawyer.description.toLowerCase().includes(searchTerm);

    const matchesLanguage =
      !selectedLanguage || lawyer.languages.includes(selectedLanguage);

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="p-6">
      <Cover img={orderCoverImg} title="HIRE LAWER" />

      <div className="max-w-3xl mx-auto mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or Legal issues..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full md:w-1/2"
        />

        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border rounded p-2 w-full md:w-1/4"
        >
          <option value="">All Districs</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reset
        </button>
      </div>

      {filteredLawyers.map((lawyer, index) => (
        <LawyerCard key={index} lawyer={lawyer} />
      ))}

      {filteredLawyers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No lawyers found.</p>
      )}
    </div>
  );
};

export default App;
