import { useState } from 'react';
import { FaDownload, FaEye, FaFilePdf, FaInfoCircle, FaUser, FaGraduationCap, FaGavel } from 'react-icons/fa';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pdfUrl = "/assets/website-guidelines.pdf";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'LaW-Website-Guidelines.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 pt-20 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            About LaW Platform
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Your comprehensive guide to understanding legal concepts and navigating the law
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-blue-800 bg-opacity-70 rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <FaInfoCircle className="text-blue-400 text-2xl mr-3" />
                <h2 className="text-3xl font-bold text-blue-300">About This Platform</h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-blue-200 leading-relaxed">
                  This platform has been thoughtfully designed by{' '}
                  <span className="font-semibold text-blue-400">Mahmudul Hasan</span>,
                  from the Department of Electrical and Computer Engineering, RUET, with
                  the aim of helping individuals understand and navigate the field of{' '}
                  <span className="italic font-semibold text-purple-400">law</span> more effectively.
                </p>

                <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-200 mb-4">Our Mission</h3>
                  <p className="text-blue-300">
                    To make legal knowledge accessible and understandable for everyone, 
                    bridging the gap between complex legal concepts and everyday understanding.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <FaGavel className="text-blue-400 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Legal Education</h4>
                      <p className="text-blue-200 text-sm">
                        Comprehensive resources and guides for understanding legal processes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <FaUser className="text-purple-400 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">User-Friendly</h4>
                      <p className="text-blue-200 text-sm">
                        Designed with simplicity and accessibility in mind
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-800 bg-opacity-70 rounded-2xl shadow-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-blue-200 mb-2">Mahmudul Hasan</h3>
              <p className="text-blue-400 font-semibold mb-2">Developer</p>
              <p className="text-blue-300 text-sm">
                Electrical and Computer Engineering<br />
                RUET
              </p>
            </div>

            <div className="bg-blue-800 bg-opacity-70 rounded-2xl shadow-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaFilePdf className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-200 mb-2">Website Guidelines</h3>
                <p className="text-blue-300 text-sm">
                  Complete guide on how to use this platform effectively
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-700 to-pink-700 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-200 mb-2">📋 What's Included:</h4>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>• Navigation instructions</li>
                    <li>• Feature explanations</li>
                    <li>• User account management</li>
                    <li>• Best practices</li>
                    <li>• FAQ section</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePreview}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                  >
                    <FaEye className="text-sm" />
                    Preview
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
                  >
                    <FaDownload className="text-sm" />
                    Download
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-blue-300">
                    PDF Size: ~2.5MB | Updated: January 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-r from-black via-blue-900 to-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-blue-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-blue-600">
            <div className="flex items-center justify-between p-6 border-b border-blue-600">
              <h3 className="text-xl font-bold text-blue-200">Website Guidelines Preview</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-blue-300 hover:text-blue-100 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 h-96">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0 rounded-lg"
                title="Website Guidelines PDF"
              />

              <div className="hidden bg-blue-700 rounded-lg p-8 text-center">
                <FaFilePdf className="text-red-400 text-4xl mx-auto mb-4" />
                <p className="text-blue-200 mb-4">
                  Unable to preview PDF in browser
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  Download PDF Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
