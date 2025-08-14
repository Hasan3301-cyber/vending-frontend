const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 p-10">
        {/* Logo and Company Info Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            {/* Enhanced Logo with Glow Effect */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="fill-current text-white"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847zm-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
              </svg>
            </div>
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-xl animate-pulse"></div>
          </div>

          {/* Company Name with Gradient Text */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2 text-center">
            Myths of Law Industries Ltd.
          </h2>
          <p className="text-gray-300 text-center max-w-md">
            Providing reliable legal tech solutions since 2025
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Services Column */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/ask" className="hover:text-green-400 transition-colors duration-300">Ask Question</a></li>
              <li><a href="/findlawer" className="hover:text-blue-400 transition-colors duration-300">Find Lawyer</a></li>
              <li><a href="/order" className="hover:text-purple-400 transition-colors duration-300">Law Books</a></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-green-400 transition-colors duration-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
              <li><a href="/privacy" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help" className="hover:text-green-400 transition-colors duration-300">Help Center</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition-colors duration-300">FAQ</a></li>
              <li><a href="/terms" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-6">
            {/* Twitter */}
            <a href="#" className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-blue-400/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-white group-hover:scale-110 transition-transform duration-300">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
            </a>

            {/* YouTube */}
            <a href="#" className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-red-400/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-white group-hover:scale-110 transition-transform duration-300">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
            </a>

            {/* Facebook */}
            <a href="#" className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-blue-600/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-white group-hover:scale-110 transition-transform duration-300">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="#" className="group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-blue-700/50 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-white group-hover:scale-110 transition-transform duration-300">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 Myths of Law Industries Ltd. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Designed with ❤️ for legal professionals
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
    </footer>
  );
};

export default Footer;