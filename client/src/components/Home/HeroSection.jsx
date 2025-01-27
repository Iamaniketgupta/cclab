import { Link } from "react-router-dom";
import { userData } from "../../recoil/states";
import { useRecoilState } from "recoil";

export default function HeroSection() {
  const [currUser, setCurrUser] = useRecoilState(userData);
  return (
    <div className="bg-white md:h-[calc(100vh-120px)] max-md:h-[100vh] flex  flex-col justify-center dark:bg-stone-900">
      {/* Hero Background */}
      <div className="relative isolate px-6 lg:px-8 h-full flex items-center justify-center">
        {/* Background Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#168758] to-[#46c5d3] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Your Gateway to Smarter <span className="text-emerald-700 dark:text-emerald-600">PCTE Labs</span> Management
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
            Manage labs effortlessly – from scheduling to resource tracking and issue resolution.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!currUser ? <Link
              to={"/login"}
              className="rounded-full  bg-gradient-to-r from-emerald-500 to-indigo-600  px-10 py-2 text-md font-semibold text-white shadow-sm hover:bg-gradient-to-r hover:from-emerald-600 hover:to-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Get started
            </Link>

              :

              <Link
                to={"/dashboard"}
                className="rounded-full  bg-gradient-to-r from-emerald-500 to-indigo-600  px-10 py-2 text-md font-semibold text-white shadow-sm hover:bg-gradient-to-r hover:from-emerald-600 hover:to-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              >
                Dashboard
              </Link>
            }
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-20rem)]"
        >
          {/* <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          /> */}
        </div>
      </div>
    </div>
  );
}
