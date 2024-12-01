import Image from "next/image";
import Logo from "../../public/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#111133] text-white pt-7">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-gray-500 font-poppins">
          <Image src={Logo} alt="SkillGro" className="mb-4 w-24 h-24" />
          <p className="mb-4 text-lg">
            when an unknown printer took galley of type and scrambled it to make
            specimen book has.
          </p>
          <p>463 7th Ave, NY 10018, USA</p>
          <p>+123 88 9900 456</p>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-lg   decoration-indigo-400">
            Useful Links
          </h3>
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
                  className="hover:underline hover:text-indigo-400 transition-colors text-gray-500 font-poppins "
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-lg   decoration-indigo-400">
            Our Company
          </h3>
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
                  className="hover:underline hover:text-indigo-400 transition-colors text-gray-500 font-poppins"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-lg    decoration-indigo-400">
            Get In Touch
          </h3>
          <p className="mb-4 text-sm text-gray-500 font-poppins">
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around pb-3 border-t border-gray-700 mt-8 pt-10 text-sm bg-[#1d1d44] mx-auto">
        <p>© 2010-2024 skillgro.com. All rights reserved.</p>
        <div className="flex gap-2">
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
