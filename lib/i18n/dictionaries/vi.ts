import type { Dictionary } from './en';

/**
 * Vietnamese dictionary. Tone: professional, uses "Tôi" (formal first person).
 * Tech terms (Postman, JMeter, Selenium, REST, Jira, Git, ...) intentionally
 * kept in English — Vietnamese tech industry convention.
 */
const vi: Dictionary = {
  meta: {
    pageTitle: 'Dan Nguyen Tien - AI-Augmented QA Engineer',
    description:
      'Kỹ sư QA AI-Augmented với hơn 2 năm kiểm thử hệ thống microservice. Postman, Selenium, Playwright, Claude và Copilot cho chu trình test nhanh và chính xác hơn.',
  },

  a11y: {
    skipToContent: 'Bỏ qua đến nội dung chính',
    scrollToTop: 'Cuộn lên đầu trang',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    siteNav: 'Điều hướng trang',
    appearance: 'Giao diện',
    switchToLight: 'Chuyển sang chế độ sáng',
    switchToDark: 'Chuyển sang chế độ tối',
    switchLocale: 'Đổi ngôn ngữ',
  },

  nav: {
    about: 'Giới thiệu',
    achievements: 'Thành tích',
    career: 'Sự nghiệp',
    traceability: 'Độ phù hợp',
    aiWorkflow: 'AI Workflow',
    repos: 'Dự án',
    skills: 'Kỹ năng',
    contact: 'Liên hệ',
    downloadCv: 'Tải CV',
    menu: 'MENU',
  },

  hero: {
    welcomeChip: 'Chào mừng đến portfolio của tôi',
    role: '<AI-Augmented QA Engineer/>',
    specialty: 'Kiểm thử dựa trên Requirement · Tích hợp AI · Embedded Automotive (đang học)',
    bio: 'Kỹ sư QA AI-Augmented với hơn 2 năm kinh nghiệm kiểm thử hệ thống microservice. Kết hợp nền tảng QA truyền thống — phân tích yêu cầu, thiết kế test case, kiểm thử API với Postman/Mockoon, kiểm tra database (MySQL/PostgreSQL), performance baseline với JMeter — cùng quy trình AI-augmented hiện đại sử dụng Claude và Copilot để tăng tốc viết test case, phân tích log và nâng chất lượng báo cáo bug. Hiện đang mở rộng kỹ năng sang Playwright thông qua các phiên học cặp đôi AI với Claude Code, đồng thời theo lộ trình tự học kiểm thử embedded automotive (C/C++, Simulink, CANoe, MiL/SiL/HiL).',
    ctaPrimary: 'Xem sự nghiệp',
    ctaSecondary: 'Liên hệ ngay',
    statusBadge: 'Sẵn sàng nhận việc',
    portraitAlt: 'Ảnh chân dung Dan Nguyen Tien',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },

  currentlyBuilding: {
    eyebrow: 'Hiện tại',
    title: 'Đang xây dựng & học hỏi',
    items: [
      'Bộ test Playwright kết hợp Claude Code',
      'ISTQB Foundation Level — đang ôn luyện',
      'Lộ trình kiểm thử embedded automotive — C/C++, Simulink/TPT, CANoe/CANape, CAN, DOORS/codeBeamer (tự học)',
    ],
  },

  repos: {
    eyebrow: 'Mã nguồn mở',
    title: 'Code & Dự án',
    subtitle:
      'Những sản phẩm tôi public — test suite, automation và tooling tự build trong quá trình làm việc.',
    viewAll: 'Xem tất cả repository trên GitHub',
    entries: {
      playwright: {
        description:
          'Bộ test Playwright + Selenium cho một e-commerce sandbox công khai. Page Object Model, async pattern, scaffold qua các phiên cặp đôi Claude Code.',
      },
      portfolio: {
        description:
          'Chính portfolio này. React 19 + Vite 6 + Tailwind 4, i18n EN/VI/JA, dark/light theme, deploy trên Vercel.',
      },
      apiCollections: {
        description:
          'Postman collection + kịch bản Mockoon dùng kiểm thử REST API với happy path, edge case và contract drift.',
      },
    },
  },

  achievements: {
    chip: 'Kỹ sư QA AI-Augmented',
    yearsCount: '2',
    yearsLabel: 'Năm Kinh nghiệm',
    tagline: 'Đảm bảo phần mềm vận hành ổn định qua quy trình',
    taglineHighlight: 'Kiểm thử AI-Augmented',
    taglineSuffix: ' nghiêm ngặt. Tôi tìm bug để bạn không phải lo — nhanh hơn.',
    stats: {
      projects: 'Dự án đã hoàn thành',
      bugs: 'Bug đã báo cáo',
      testCases: 'Test case đã viết',
    },
  },

  careerTimeline: {
    title: 'Hành trình Sự nghiệp',
    subtitle:
      'Dòng thời gian sự nghiệp của tôi trong lĩnh vực Đảm bảo Chất lượng — các vị trí, thành tựu và quá trình học tập.',
    entries: {
      hopeeFresher: {
        title: 'Fresher / Junior',
        company: 'HOPEE Co., Ltd.',
        date: '11/2024 - Hiện tại',
        items: [
          'Tham gia kiểm thử toàn vòng đời cho các dự án khách hàng, đảm bảo chất lượng bàn giao cao.',
          'Phối hợp với các team liên chức năng để xử lý vấn đề phức tạp và nâng cao độ ổn định sản phẩm.',
          'Tiếp tục phát triển kỹ năng automation và đóng góp cải tiến quy trình QA nội bộ.',
          'Tiên phong áp dụng quy trình QA AI-augmented cho team — Claude để dựng test case từ user story, Copilot để viết Selenium script, AI hỗ trợ phân tích log — mang lại cải thiện rõ rệt về năng suất trong các công việc viết test thường ngày.',
        ],
        tags: ['Automation', 'AI Workflow', 'Quality Control'],
      },
      hopeeProbation: {
        title: 'Thử việc',
        company: 'HOPEE Co., Ltd.',
        date: '09/2024 - 11/2024',
        items: [
          'Chuyển tiếp thành công từ thực tập sinh lên thử việc, đảm nhận thêm nhiều trách nhiệm.',
          'Thực hiện kế hoạch regression testing và báo cáo các defect quan trọng trước mỗi release.',
          'Thể hiện hiểu biết vững chắc về phương pháp QA và sự thành thạo công cụ.',
        ],
        tags: ['Regression Testing', 'Báo cáo Bug'],
      },
      hopeeIntern: {
        title: 'Thực tập sinh',
        company: 'HOPEE Co., Ltd.',
        date: '06/2024 - 08/2024',
        items: [
          'Tích lũy kinh nghiệm thực chiến về kiểm thử thủ công, làm quen tech stack của công ty.',
          'Hỗ trợ các kỹ sư senior viết test case và tài liệu kiểm thử.',
          'Tham gia daily stand-up và các quy trình Agile.',
        ],
        tags: ['Manual Testing', 'Tài liệu', 'Agile'],
      },
      fptAptech: {
        title: 'Đào tạo Công nghệ',
        company: 'FPT Aptech',
        date: '07/2023 - 06/2025',
        subtext: 'Aptech Computer Education, Ấn Độ – hợp tác với Tập đoàn FPT',
        items: [
          'Hoàn thành chương trình chuyên sâu về phát triển phần mềm và nền tảng kiểm thử.',
          'Xây dựng kiến thức nền tảng về lập trình (C/C++, Python — cơ bản), quản lý database và công nghệ web.',
          'Tham gia các dự án thực tế để áp dụng kiến thức lý thuyết.',
        ],
        tags: ['Phát triển Phần mềm', 'Databases', 'Nền tảng Kiểm thử'],
      },
      japan: {
        title: 'Du học sinh',
        company: 'Nhật Bản',
        date: '2019 - 2023',
        items: [
          'Theo đuổi học vấn đồng thời thích nghi với môi trường văn hóa mới.',
          'Phát triển kỹ năng giao tiếp đa văn hóa và khả năng kiên cường.',
          'Đạt trình độ tiếng Nhật và lĩnh hội tinh thần làm việc Nhật Bản.',
          'Học cơ khí ô tô tại Yomiuri College of Car Mechanic, Tokyo (2021–2023).',
        ],
        tags: ['Tiếng Nhật', 'Khả năng Thích nghi'],
      },
    },
  },

  aiWorkflow: {
    title: 'Quy trình AI-Augmented',
    subtitle:
      'Cách tôi tận dụng công cụ AI để bàn giao test asset chất lượng cao hơn, nhanh hơn — mà vẫn giữ độ nghiêm ngặt.',
    patterns: {
      testCaseScaffolding: {
        title: 'Dựng khung Test Case',
        desc: 'Từ user story và acceptance criteria, dùng Claude để dựng Gherkin scenarios phủ happy path, edge case, boundary value và negative path. Luôn review và bổ sung domain context.',
      },
      logTriage: {
        title: 'Phân tích Log bằng AI',
        desc: 'Dùng Claude phân tích CI log lỗi để rút ra giả thuyết root-cause, cluster stack trace và đề xuất mức Jira severity. Tín hiệu nhanh cho sprint demo và stand-up.',
      },
      syntheticData: {
        title: 'Sinh Test Data tổng hợp',
        desc: 'Generate dataset boundary value và payload edge-case cho API testing — cắm trực tiếp vào test suite Postman và Mockoon.',
      },
      multilangSync: {
        title: 'Đồng bộ Test Asset đa ngôn ngữ',
        desc: 'Dịch test case và bug report giữa EN / VI / JA bằng Claude với glossary QA tùy chỉnh — hữu ích cho team kỹ thuật đa khu vực.',
      },
      pairedLearning: {
        title: 'Học Framework cặp đôi với AI',
        desc: 'Tự học Selenium và Playwright qua các phiên cặp đôi với Claude Code: dựng Page Object Model, debug test async failure, refactor flaky test. Ramp-up nhanh hơn so với học theo tutorial truyền thống.',
      },
    },
  },

  traceability: {
    eyebrow: 'Độ phù hợp JD',
    title: 'Ma trận truy vết yêu cầu',
    subtitle: 'Yêu cầu vị trí Embedded Tester được đối chiếu với bằng chứng thực tế — trình bày như một lần chạy test, trung thực.',
    summaryLabel: 'Tổng kết:',
    footnote: '* ĐẠT = có kinh nghiệm làm việc · ĐANG HỌC = tự học có lab thực hành · KẾ HOẠCH = nằm trong lộ trình',
    columns: { id: 'ID', requirement: 'Yêu cầu', evidence: 'Bằng chứng', status: 'Kết quả' },
    status: { met: 'Đạt', inProgress: 'Đang học', planned: 'Kế hoạch' },
    rows: {
      requirements: { req: 'Phân tích & review requirement; derive test spec từ requirement đã duyệt', evidence: 'HOPEE: 500+ test case truy vết tới user story và acceptance criteria' },
      testDesign: { req: 'Thiết kế test: phân vùng tương đương, giá trị biên', evidence: 'Áp dụng hằng ngày trong dự án khách hàng; ưu tiên theo rủi ro' },
      execution: { req: 'Thực thi test, phân tích kết quả, test report', evidence: '200+ defect báo cáo và theo dõi trên Jira qua 2+ dự án' },
      automation: { req: 'Phát triển test automation', evidence: 'Selenium WebDriver (Page Object Model), Playwright TypeScript' },
      vModel: { req: 'Kiến thức SDLC / V-model', evidence: 'STLC & Agile trong team thực tế; V-model trong lộ trình học' },
      git: { req: 'Git', evidence: 'Quản lý phiên bản hằng ngày, pipeline Jenkins CI' },
      english: { req: 'Giao tiếp tiếng Anh', evidence: 'Tiếng Anh làm việc; tiếng Nhật đọc hiểu mức N2' },
      coverage: { req: 'Code coverage: DC, MC/DC', evidence: 'Lab tự học: unit test C với gcov, bảng chân trị MC/DC' },
      cpp: { req: 'Lập trình C/C++', evidence: 'Mức cơ bản từ FPT Aptech; luyện với module C kiểu embedded' },
      python: { req: 'Python scripting', evidence: 'Mức cơ bản; test suite pytest cho CAN và model trong lab' },
      can: { req: 'Giao thức truyền thông (CAN)', evidence: 'Test CAN bus ảo với python-can: ID, DLC, scaling tín hiệu, chu kỳ' },
      automotive: { req: 'Kiến thức ngành ô tô', evidence: 'Chương trình cơ khí ô tô, Yomiuri College of Car Mechanic, Tokyo (2021–2023)' },
      istqb: { req: 'ISTQB Foundation Level', evidence: 'Đang ôn thi; chứng chỉ Automation Testing của VIT Academy' },
      simulink: { req: 'MATLAB Simulink / TPT / Embedded Coder', evidence: 'Bước tiếp theo — trước mắt luyện khái niệm MiL bằng model Python' },
      canoe: { req: 'CANoe / CANape, thiết bị HiL', evidence: 'Bước tiếp theo sau khi vững nền tảng CAN' },
      doors: { req: 'DOORS / codeBeamer', evidence: 'Bước tiếp theo — đã quen truy vết trên Jira / TestRail' },
    },
  },

  vModel: {
    eyebrow: 'Lộ trình học',
    title: 'Lộ trình theo V-model',
    subtitle: 'Những gì tôi đã làm được, và những gì đang xây dựng để tiến tới kiểm thử MiL / SiL / HiL.',
    leftArm: 'Đặc tả',
    rightArm: 'Kiểm chứng',
    footnote: 'Mỗi tầng bên trái được kiểm chứng bởi tầng tương ứng bên phải.',
    status: { met: 'Đạt', inProgress: 'Đang học', planned: 'Kế hoạch' },
    stages: {
      requirements: { title: 'Phân tích requirement', desc: 'Review requirement, làm rõ acceptance criteria, chỉ ra điểm mơ hồ.' },
      systemDesign: { title: 'Review thiết kế hệ thống', desc: 'Derive test spec mức hệ thống từ requirement đã duyệt.' },
      architecture: { title: 'Kiến trúc / giao tiếp', desc: 'Ánh xạ giao tiếp component sang kịch bản integration test (hiện là API contract).' },
      unitDesign: { title: 'Thiết kế unit', desc: 'Đọc spec module và code C để thiết kế test phân vùng tương đương, giá trị biên.' },
      implementation: { title: 'Hiện thực', desc: 'Nền tảng C/C++ và Python — phần code mà test hướng tới.' },
      unitTest: { title: 'Unit test · MiL', desc: 'Unit test C có đo coverage; test model Python thay cho MiL.' },
      integration: { title: 'Integration · SiL', desc: 'Test CAN bus ảo với python-can; integration test API tại công ty.' },
      systemTest: { title: 'System test · HiL', desc: 'CANoe / CANape và hệ thống HiL — kế hoạch tiếp theo.' },
      acceptance: { title: 'Acceptance', desc: 'UAT và nghiệm thu release trong các dự án đã bàn giao.' },
    },
  },

  skills: {
    title: 'Tổng quan Kỹ năng',
    cards: {
      testing: {
        title: 'Kiến thức Kiểm thử',
        desc: 'Functional, Regression, Smoke, Sanity, UAT, Black Box, Exploratory — Phân vùng tương đương, Phân tích giá trị biên, Bảng quyết định, Thiết kế test dựa trên requirement',
        tags: ['Functional', 'Regression'],
      },
      requirements: {
        title: 'Phân tích Yêu cầu',
        desc: 'Review Requirement, Derive Test Spec từ requirement đã duyệt, Acceptance Criteria, Phân tích Rủi ro, Traceability Requirement–Test',
        tags: ['Jira', 'Confluence'],
      },
      process: {
        title: 'Quy trình',
        desc: 'V-model, Agile/Scrum, SDLC, STLC, Bug Life Cycle, Test Report — viết test và phân tích log có hỗ trợ AI',
        tags: ['Agile', 'AI-First'],
      },
      api: {
        title: 'API & Backend',
        desc: 'REST API, Postman, kiểm tra JSON/XML, xác minh Status Code',
        tags: ['Postman', 'REST'],
      },
      database: {
        title: 'Database',
        desc: 'SQL Queries, Toàn vẹn dữ liệu, Inner/Outer Joins, Kiểm thử Data Migration',
        tags: ['MySQL', 'PostgreSQL'],
      },
      automation: {
        title: 'Automation',
        desc: 'Selenium WebDriver và Playwright (TypeScript) — Page Object Model, async pattern. Đang chủ động mở rộng qua các phiên học cặp đôi với Claude Code.',
        tags: ['Selenium', 'Playwright', 'Claude Code'],
      },
      aiWorkflow: {
        title: 'Quy trình AI-Augmented',
        desc: 'Sử dụng Claude và Copilot hàng ngày để generate test case, phân tích defect, sinh synthetic data và dịch test asset đa ngôn ngữ.',
        tags: ['Claude', 'Copilot', 'Prompt Engineering'],
      },
      tools: {
        title: 'Công cụ',
        desc: 'Jira, Git, Jenkins, TestRail, Chrome DevTools',
        tags: ['Git', 'Jenkins'],
      },
      communication: {
        title: 'Giao tiếp',
        desc: 'Hợp tác liên chức năng, Báo cáo Defect, Tài liệu Kỹ thuật',
        tags: ['Slack', 'Zoom'],
      },
    },
  },

  contact: {
    availability: 'Sẵn sàng cho Cơ hội mới: GMT+7',
    title: 'Hãy kết nối',
    body: 'Bạn tìm thấy bug trong code của tôi hay muốn thảo luận về QA strategy? Để lại lời nhắn bên dưới. Tôi cẩn thận khi test và phản hồi nhanh.',
    info: {
      emailLabel: 'Địa chỉ Email',
      phoneLabel: 'Số điện thoại',
      locationLabel: 'Vị trí',
      locationValue: 'Huyện Hóc Môn, TP. Hồ Chí Minh, Việt Nam',
    },
    profiles: {
      heading: 'Hồ sơ Chuyên môn',
      resume: { title: 'Tải CV', subtitle: 'Tải bản PDF CV đầy đủ' },
      linkedin: { title: 'LinkedIn', subtitle: 'Kết nối và mở rộng mạng lưới' },
      github: { title: 'GitHub Portfolio', subtitle: 'Xem các repository của tôi' },
    },
    form: {
      nameLabel: 'Họ tên',
      namePlaceholder: 'Nguyễn Văn A',
      emailLabel: 'Địa chỉ Email',
      emailPlaceholder: 'email@example.com',
      subjectLabel: 'Chủ đề',
      subjectPlaceholder: 'Chọn chủ đề',
      subjectOptions: {
        opportunity: 'Cơ hội Việc làm',
        freelance: 'Dự án Freelance',
        bug: 'Báo cáo Bug',
        other: 'Khác',
      },
      messageLabel: 'Nội dung',
      messagePlaceholder: 'Mô tả dự án hoặc câu hỏi của bạn...',
      messageMaxHint: 'Tối đa 500 ký tự',
      submit: 'Gửi tin nhắn',
      sending: 'Đang gửi…',
      sendAnother: 'Gửi thêm tin nhắn',
      emailError: 'Vui lòng nhập địa chỉ email hợp lệ.',
      emailMeDirectly: 'Gửi email trực tiếp',
      charCounterLabel: 'ký tự',
      successTitle: 'Đã gửi — sẽ phản hồi sớm.',
      successBody: 'Cảm ơn bạn đã liên hệ. Tôi sẽ trả lời trong vòng 24 giờ.',
      successCtaHeading: 'Kết nối với tôi:',
      errorTitle: 'Gửi thất bại.',
      errorBody:
        'Có lỗi xảy ra. Vui lòng thử lại hoặc gửi email trực tiếp tới tiendannguyen224@gmail.com.',
      offlineNote: 'Chức năng gửi form chưa được cấu hình — vui lòng email trực tiếp.',
      validationNote: 'Được bảo vệ bởi xác thực đầu vào tiêu chuẩn.',
      required: '*',
    },
  },

  footer: {
    rights: 'Bảo lưu mọi quyền.',
  },
};

export default vi;
