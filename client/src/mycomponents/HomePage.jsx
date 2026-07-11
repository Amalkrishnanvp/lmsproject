// src/mycomponents/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">LMS</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your learning management system. Start your journey today!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          {/* <div className="rounded-md shadow">
            <Link
              to="/courses"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
            >
              Browse Courses
            </Link>
          </div> */}
          {/* <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div> */}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Learn Anytime
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Access your courses 24/7 from anywhere in the world.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Expert Instructors
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Learn from industry experts with real-world experience.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Certificates
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Earn certificates and boost your career opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
