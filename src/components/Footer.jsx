const Footer = () => {
    return (
      <footer className="bg-blue-600 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Hospital Management System</h3>
              <p className="text-sm">Your trusted partner in healthcare.</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="border-t border-blue-500 mt-4 pt-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;