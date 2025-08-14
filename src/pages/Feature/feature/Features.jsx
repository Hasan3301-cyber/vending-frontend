import { useEffect, useState } from "react";

const Features = () => {
  const [rainDrops, setRainDrops] = useState([]);
  
  // Mock navigate function for demo (replace with actual useNavigate in your project)
  const navigate = (path) => {
    // For demo purposes - replace with actual navigation
    window.location.href = path;
  };

  // Generate rain drops
  useEffect(() => {
    const drops = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        animationDuration: Math.random() * 3 + 2,
      });
    }
    setRainDrops(drops);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 p-10 overflow-hidden">
      {/* Rain Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 h-20 bg-gradient-to-b from-blue-400 to-transparent opacity-60"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.animationDelay}s`,
              animationDuration: `${drop.animationDuration}s`,
              animation: `rain ${drop.animationDuration}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo Section with Enhanced Animation */}
      <div className="mb-10 z-10">
        <div className="relative">
          <div className="w-56 h-56 rounded-full shadow-2xl border-4 border-gradient-to-r from-blue-500 to-purple-500 animate-pulse hover:scale-110 transition-all duration-500 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg font-bold">LOGO</span>
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        {/* Ask Question Card */}
        <div className="relative group">
          <div className="w-64 h-80 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl flex flex-col transform transition-all duration-500 hover:scale-110 hover:rotate-1 border border-gray-700 hover:border-green-400 rounded-lg">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
            
            <div className="flex-grow flex items-center justify-center text-center text-white relative z-10">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-green-400/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold">Ask Question</h2>
              </div>
            </div>
            
            <button
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white w-full h-16 mt-auto transition-all duration-300 hover:shadow-lg hover:shadow-green-400/50 border-none relative z-10 rounded-b-lg"
              onClick={() => navigate("/ask")}
            >
              <span className="relative z-10">Ask Now</span>
            </button>
          </div>
        </div>

        {/* Find Lawyer Card */}
        <div className="relative group">
          <div className="w-64 h-80 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl flex flex-col transform transition-all duration-500 hover:scale-110 hover:rotate-1 border border-gray-700 hover:border-blue-400 rounded-lg">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
            
            <div className="flex-grow flex items-center justify-center text-center text-white relative z-10">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-blue-400/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold">Find Lawyer</h2>
              </div>
            </div>
            
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white w-full h-16 mt-auto transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50 border-none relative z-10 rounded-b-lg"
              onClick={() => navigate("/findlawer")}
            >
              <span className="relative z-10">Find Now</span>
            </button>
          </div>
        </div>

        {/* Law Books Card */}
        <div className="relative group">
          <div className="w-64 h-80 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl flex flex-col transform transition-all duration-500 hover:scale-110 hover:rotate-1 border border-gray-700 hover:border-purple-400 rounded-lg">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
            
            <div className="flex-grow flex items-center justify-center text-center text-white relative z-10">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-400/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold">Law Books</h2>
              </div>
            </div>
            
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white w-full h-16 mt-auto transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/50 border-none relative z-10 rounded-b-lg"
              onClick={() => navigate("/order")}
            >
              <span className="relative z-10">Explore</span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animation for Rain */}
      <style jsx>{`
        @keyframes rain {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;