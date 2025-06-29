import { Logo } from "../../icons/Logo"

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full px-6 md:px-12 py-10 items-center text-gray-600 dark:text-white">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="text-[#5046e4] pr-3">
          <Logo />
        </div>
        <div className="text-xl font-bold">BrainShelf</div>
      </div>
      <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-start">
        <a className="hover:text-[#5046e4]" href="">
          Terms
        </a>
        <a className="hover:text-[#5046e4]" href="">
          Privacy
        </a>
        <a className="hover:text-[#5046e4]" href="">
          Help
        </a>
        <a className="hover:text-[#5046e4]" href="">
          Contact
        </a>
      </div>
      <div className="text-sm mt-4 md:mt-0">© 2025 Brainly. All rights reserved.</div>
    </div>
  );
};





