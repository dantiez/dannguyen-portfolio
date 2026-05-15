/**
 * English dictionary — source of truth.
 * The shape of this object is the `Dictionary` type other locales must satisfy.
 *
 * Convention:
 *   - keep proper nouns (HOPEE, FPT Aptech, Postman, Jira, ...) untranslated
 *   - keep tech identifiers in EN even when surrounded by translated copy
 *   - structural data (icons, isCurrent) stays in the component, NOT here
 */
const en = {
  meta: {
    pageTitle: 'Dan Nguyen Tien - QA/QC Engineer',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    scrollToTop: 'Scroll to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    siteNav: 'Site navigation',
    appearance: 'Appearance',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    switchLocale: 'Switch language',
  },

  nav: {
    about: 'About',
    achievements: 'Achievements',
    career: 'Career',
    skills: 'Skills',
    contact: 'Contact',
    downloadCv: 'Download CV',
    menu: 'MENU',
  },

  hero: {
    welcomeChip: 'Welcome to my portfolio',
    role: '<QA/QC Engineer>',
    specialty: 'Automation & Manual Testing Specialist',
    bio: "Quality Assurance Tester with nearly 2 years of experience in manual testing for microservice-based systems. Skilled in requirement analysis, test case design, execution, and defect tracking, with hands-on API testing using Postman and Mockoon. Experienced in database verification (MySQL, PostgreSQL) and basic performance testing with JMeter.",
    ctaPrimary: 'View Career',
    ctaSecondary: 'Get in Touch',
    statusBadge: 'Available for work',
    portraitAlt: 'Portrait of Dan Nguyen Tien',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },

  achievements: {
    chip: 'QC/QA Engineer',
    yearsCount: '2',
    yearsLabel: 'Years of Experience',
    tagline: 'Ensuring software reliability through rigorous',
    taglineHighlight: 'Manual & Automated Testing',
    taglineSuffix: ". I break code so you don't have to.",
    stats: {
      projects: 'Projects Delivered',
      bugs: 'Bugs Reported',
      testCases: 'Test Cases Written',
    },
  },

  careerTimeline: {
    title: 'Professional Journey',
    subtitle:
      'A timeline of my career in Quality Assurance, highlighting key roles, achievements, and educational background.',
    entries: {
      hopeeFresher: {
        title: 'Fresher / Junior',
        company: 'HOPEE Co., Ltd.',
        date: '11/2024 - Present',
        items: [
          'Engaged in full-cycle testing for client projects, ensuring high-quality deliverables.',
          'Collaborating with cross-functional teams to resolve complex issues and improve product stability.',
          'Continuing to refine automation skills and contribute to internal QA process improvements.',
        ],
        tags: ['Automation', 'Team Collaboration', 'Quality Control'],
      },
      hopeeProbation: {
        title: 'Probation',
        company: 'HOPEE Co., Ltd.',
        date: '09/2024 - 11/2024',
        items: [
          'Successfully transitioned from intern to probationary employee, taking on increased responsibilities.',
          'Executed regression testing plans and reported critical defects prior to release cycles.',
          'Demonstrated strong understanding of QA methodologies and tool proficiency.',
        ],
        tags: ['Regression Testing', 'Bug Reporting'],
      },
      hopeeIntern: {
        title: 'Intern',
        company: 'HOPEE Co., Ltd.',
        date: '06/2024 - 08/2024',
        items: [
          "Gained hands-on experience in manual testing and familiarized with the company's tech stack.",
          'Assisted senior engineers in creating test cases and documentation.',
          'Participated in daily stand-ups and agile processes.',
        ],
        tags: ['Manual Testing', 'Documentation', 'Agile'],
      },
      fptAptech: {
        title: 'Computer Education',
        company: 'FPT Aptech',
        date: '07/2023 - 05/2024',
        subtext: 'Aptech Computer Education, India – in cooperation with FPT Corporation',
        items: [
          'Completed intensive coursework in software development and testing fundamentals.',
          'Developed foundational knowledge in programming logic, database management, and web technologies.',
          'Participated in practical projects to apply theoretical concepts.',
        ],
        tags: ['Software Development', 'Databases', 'Testing Fundamentals'],
      },
      japan: {
        title: 'International Student',
        company: 'Japan',
        date: '2019 - 2023',
        items: [
          'Pursued academic studies while adapting to a new cultural environment.',
          'Developed strong cross-cultural communication skills and resilience.',
          'Gained proficiency in the Japanese language and work ethic.',
        ],
        tags: ['Japanese Language', 'Adaptability'],
      },
    },
  },

  skills: {
    title: 'Skills Summary',
    cards: {
      testing: {
        title: 'Testing Knowledge',
        desc: 'Functional, Regression, Smoke, Sanity, UAT, Black Box Testing, Exploratory Testing',
        tags: ['Functional', 'Regression'],
      },
      requirements: {
        title: 'Requirement Analysis',
        desc: 'User Stories, Acceptance Criteria, Risk Analysis, Traceability Matrix',
        tags: ['Jira', 'Confluence'],
      },
      process: {
        title: 'Process',
        desc: 'Agile/Scrum, SDLC, STLC, Bug Life Cycle, Sprint Planning',
        tags: ['Agile', 'Scrum'],
      },
      api: {
        title: 'API & Backend',
        desc: 'REST API, Postman, JSON/XML validation, Status Codes verification',
        tags: ['Postman', 'REST'],
      },
      database: {
        title: 'Database',
        desc: 'SQL Queries, Data Integrity, Inner/Outer Joins, Data Migration testing',
        tags: ['MySQL', 'PostgreSQL'],
      },
      automation: {
        title: 'Automation',
        desc: 'Selenium Webdriver basics, Python/Java syntax, Page Object Model concepts',
        tags: ['Selenium', 'Python'],
      },
      tools: {
        title: 'Tools',
        desc: 'Jira, Git, Jenkins, TestRail, Chrome DevTools',
        tags: ['Git', 'Jenkins'],
      },
      communication: {
        title: 'Communication',
        desc: 'Cross-functional collaboration, Defect Reporting, Technical Documentation',
        tags: ['Slack', 'Zoom'],
      },
    },
  },

  contact: {
    availability: 'Available for Opportunities: GMT+7',
    title: "Let's Connect",
    body: "Found a bug in my code or want to discuss a QA strategy? Drop me a line below. I'm precise with my testing and quick with my replies.",
    info: {
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      locationLabel: 'Base Location',
      locationValue: 'Hoc Mon District, Ho Chi Minh City, Vietnam',
    },
    profiles: {
      heading: 'Professional Profiles',
      resume: { title: 'Download Resume', subtitle: 'Get a PDF copy of my full CV' },
      linkedin: { title: 'LinkedIn Profile', subtitle: 'Connect and network' },
      github: { title: 'GitHub Portfolio', subtitle: 'Review my code repositories' },
    },
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Jane Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'jane@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Select a topic',
      subjectOptions: {
        opportunity: 'Job Opportunity',
        freelance: 'Freelance Project',
        bug: 'Report a Bug',
        other: 'Other',
      },
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your project or inquiry...',
      messageMaxHint: 'Max 500 characters',
      submit: 'Send Message',
      validationNote: 'Protected by standard input validation.',
      required: '*',
    },
  },

  footer: {
    rights: 'All rights reserved.',
  },
};

export type Dictionary = typeof en;
export default en;
