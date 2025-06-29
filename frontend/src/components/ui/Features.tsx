import { useTheme } from "../../context/theme-context";
import websiteImageD from "../../icons/Website2.png"
import websiteImageL from "../../icons/website3.png"


export const Features = () => {
    const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="px-4 sm:px-8 md:px-20">
      <div className="flex flex-col lg:flex-row gap-10 my-14">
        <div className="p-5 flex flex-col gap-4 text-left max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Features</h1>
          <p className="text-2xl text-gray-500 dark:text-gray-300">
            Brainly integrates with your favorite social platforms, making it easy to save and share content from Twitter, YouTube, and more.
          </p>

          <ul className="mt-4 space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold">One-click Save</span> Quickly save tweets, videos, or documents with a single click.
            </li>
            <li>
              <span className="font-semibold">Categorized Organization</span> Automatically sort content into categories for fast retrieval.
            </li>
            <li>
              <span className="font-semibold">Seamless Previews</span> View embedded previews directly in your dashboard.
            </li>
          </ul>
        </div>
        <div>
          <img
            src={isDark ? websiteImageL : websiteImageD}
            alt="Website preview"
            className="mx-auto w-full max-w-2xl border-2 border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
