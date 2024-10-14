import Image from "next/image";
import Logo from "../../public/images/logo.png";
import PlayStore from "../../public/images/googleplay.png";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A3F] text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Contact Info */}
        <div>
          <Image src={Logo} alt="SkillGro" className="mb-4 size-44" />
          <p className="mb-4 text-sm">
            when an unknown printer took galley of type and scrambled it to make
            specimen book has.
          </p>
          <p>463 7th Ave, NY 10018, USA</p>
          <p>+123 88 9900 456</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2">
            {[
              "Our values",
              "Our advisory board",
              "Our partners",
              "Become a partner",
              "Work at Future Learn",
              "Quizlet Plus",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:underline hover:text-indigo-400 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Our Company</h3>
          <ul className="space-y-2">
            {[
              "Contact Us",
              "Become Teacher",
              "Blog",
              "Instructor",
              "Events",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:underline hover:text-indigo-400 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Get In Touch</h3>
          <p className="mb-4 text-sm">
            when an unknown printer took galley type and scrambled
          </p>
          <div className="flex space-x-4 mb-4">
            {[
              "fab fa-facebook-f",
              "fab fa-twitter",
              "fab fa-whatsapp",
              "fab fa-instagram",
              "fab fa-youtube",
            ].map((iconClass) => (
              <a
                key={iconClass}
                href="#"
                className="text-lg hover:text-indigo-400 transition-colors"
              >
                <i className={iconClass}></i>
              </a>
            ))}
          </div>
          <div className="flex space-x-4">
            <a href="#">
              <Image src={PlayStore} alt="Google Play" className="w-32" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2010-2024 edinexus.com. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            className="hover:underline hover:text-indigo-400 transition-colors"
          >
            Terms of Use
          </a>
          <span>|</span>
          <a
            href="#"
            className="hover:underline hover:text-indigo-400 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
