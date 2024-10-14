const TopBar = () => {
  return (
    <div className="hidden lg:flex bg-indigo-900 text-white py-2 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <span>
            <i className="fas fa-map-marker-alt mr-1"></i> 589 5th Ave, NY
            10024, USA
          </span>
          <span>
            <i className="fas fa-envelope mr-1"></i> info@skillgro.com
          </span>
        </div>

        <div className="flex space-x-6 items-center">
          <span>
            <i className="fas fa-phone-alt mr-1"></i> +123 599 8989
          </span>
          <span className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-youtube"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
