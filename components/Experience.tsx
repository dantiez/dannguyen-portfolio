import React from 'react';

const Experience: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-32 px-4 overflow-hidden hero-pattern">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
            <span className="text-sm font-semibold text-primary">QC/QA Engineer</span>
          </div>
          <div className="flex flex-col items-center leading-none mb-6">
            <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-400 dark:from-white dark:to-gray-600">
              2
            </h1>
            <span className="text-2xl sm:text-3xl font-bold text-gray-500 dark:text-gray-400 -mt-4 sm:-mt-8">Years of Experience</span>
          </div>
          <h2 className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Ensuring software reliability through rigorous <span className="text-primary font-semibold">Manual & Automated Testing</span>. I break code so you don't have to.
          </h2>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-8 lg:px-40 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark p-8 shadow-sm hover:border-primary/50 transition-colors group">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">deployed_code</span>
              </div>
              <p className="text-4xl font-bold tracking-tight">2+</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Projects Delivered</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark p-8 shadow-sm hover:border-primary/50 transition-colors group">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">bug_report</span>
              </div>
              <p className="text-4xl font-bold tracking-tight">200+</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bugs Reported</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark p-8 shadow-sm hover:border-primary/50 transition-colors group">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">assignment</span>
              </div>
              <p className="text-4xl font-bold tracking-tight">500+</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Test Cases Written</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 lg:px-40">
        <div className="mx-auto max-w-[960px] flex flex-col gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Core Competencies</h2>
            <p className="text-gray-500 dark:text-gray-400">Tools and technologies I use to ensure quality.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: 'pan_tool', label: 'Manual Testing' },
              { icon: 'smart_toy', label: 'Selenium Automation' },
              { icon: 'api', label: 'API Testing' },
              { icon: 'bug_report', label: 'JIRA' },
              { icon: 'database', label: 'SQL' },
              { icon: 'autorenew', label: 'Regression Testing' },
              { icon: 'terminal', label: 'Postman' },
              { icon: 'code', label: 'Java' },
            ].map((skill, index) => (
              <div key={index} className="flex h-10 items-center justify-center gap-x-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark px-4 shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                <span className="material-symbols-outlined text-[20px]">{skill.icon}</span>
                <p className="text-sm font-medium">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;