import React from "react";
import hinhDaCat from "../images/hinhdacat.jpg";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Welcome to my portfolio
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
              DAN NGUYEN TIEN
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 flex flex-col md:flex-row items-center lg:items-start gap-2 justify-center lg:justify-start">
              <span className="text-primary font-mono font-bold">
                &lt;QA/QC Engineer&gt;
              </span>
              <span className="hidden md:inline text-slate-300 dark:text-slate-700">
                |
              </span>
              <span>Automation & Manual Testing Specialist</span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Quality Assurance Tester with nearly 2 years of experience in
              manual testing for microservice-based systems. Skilled in
              requirement analysis, test case design, execution, and defect
              tracking, with hands-on API testing using Postman and Mockoon.
              Experienced in database verification (MySQL, PostgreSQL) and
              basic performance testing with JMeter.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <button
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white h-12 px-8 rounded-lg text-base font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
              >
                <span>View Projects</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white h-12 px-8 rounded-lg text-base font-bold transition-all border border-transparent hover:border-slate-400 dark:hover:border-slate-600 active:scale-95"
              >
                Get in Touch
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/50">
              {/* Social Icons */}
              <SocialIcon icon="public" />
              <SocialIcon icon="code" />
              <div className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer">
                <span className="material-symbols-outlined text-[24px]">
                  mail
                </span>
                <span className="hidden sm:inline">dannt4022@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Visual Profile */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Central Profile Image */}
              <div className="absolute inset-0 m-auto w-56 h-56 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl z-10 overflow-hidden">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center bg-no-repeat bg-slate-800 transition-transform duration-500 hover:scale-110"
                  style={{ backgroundImage: `url(${hinhDaCat})` }}
                  title="Professional headshot of Dan Nguyen Tien"
                ></div>
              </div>

              {/* Orbital Rings */}
              <div className="absolute inset-0 w-full h-full border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-dark border border-slate-700 p-2 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-primary text-sm">
                    bug_report
                  </span>
                </div>
              </div>

              <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] border border-slate-700/30 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-1/4 left-0 -translate-x-1/2 bg-background-dark border border-slate-700 p-2 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-green-500 text-sm">
                    check_circle
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-0 right-0 md:top-8 md:right-0 z-30">
                <div className="bg-background-dark/90 backdrop-blur border border-green-500/30 py-2 px-3 md:px-4 rounded-full flex items-center gap-2 md:gap-3 shadow-xl transform hover:scale-105 transition-transform duration-300 ring-1 ring-green-500/20">
                  <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs md:text-sm font-bold text-slate-100">
                    Available for work
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <a
    href="#"
    className="group flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary dark:hover:border-primary transition-all duration-300 hover:scale-110"
  >
    <span className="material-symbols-outlined text-xl">{icon}</span>
  </a>
);

export default Hero;
