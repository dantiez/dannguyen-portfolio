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
      'Kỹ sư QA AI-Augmented với gần 2 năm kiểm thử hệ thống microservice. Postman, Selenium, Playwright, Claude và Copilot cho chu trình test nhanh và chính xác hơn.',
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
    aiWorkflow: 'AI Workflow',
    skills: 'Kỹ năng',
    contact: 'Liên hệ',
    downloadCv: 'Tải CV',
    menu: 'MENU',
  },

  hero: {
    welcomeChip: 'Chào mừng đến portfolio của tôi',
    role: '<AI-Augmented QA Engineer/>',
    specialty: 'Kiểm thử Hiệu suất cao · Quy trình tích hợp LLM',
    bio: 'Kỹ sư QA AI-Augmented với gần 2 năm kinh nghiệm kiểm thử hệ thống microservice. Kết hợp nền tảng QA truyền thống — phân tích yêu cầu, thiết kế test case, kiểm thử API với Postman/Mockoon, kiểm tra database (MySQL/PostgreSQL), performance baseline với JMeter — cùng quy trình AI-augmented hiện đại sử dụng Claude và Copilot để tăng tốc viết test case, phân tích log và nâng chất lượng báo cáo bug. Hiện đang mở rộng kỹ năng sang Playwright thông qua các phiên học cặp đôi AI với Claude Code.',
    ctaPrimary: 'Xem sự nghiệp',
    ctaSecondary: 'Liên hệ ngay',
    statusBadge: 'Sẵn sàng nhận việc',
    portraitAlt: 'Ảnh chân dung Dan Nguyen Tien',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
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
        date: '07/2023 - 05/2024',
        subtext: 'Aptech Computer Education, Ấn Độ – hợp tác với Tập đoàn FPT',
        items: [
          'Hoàn thành chương trình chuyên sâu về phát triển phần mềm và nền tảng kiểm thử.',
          'Xây dựng kiến thức nền tảng về logic lập trình, quản lý database và công nghệ web.',
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

  skills: {
    title: 'Tổng quan Kỹ năng',
    cards: {
      testing: {
        title: 'Kiến thức Kiểm thử',
        desc: 'Functional, Regression, Smoke, Sanity, UAT, Black Box Testing, Exploratory Testing',
        tags: ['Functional', 'Regression'],
      },
      requirements: {
        title: 'Phân tích Yêu cầu',
        desc: 'User Stories, Acceptance Criteria, Phân tích Rủi ro, Traceability Matrix',
        tags: ['Jira', 'Confluence'],
      },
      process: {
        title: 'Quy trình',
        desc: 'Agile/Scrum, SDLC, STLC, Bug Life Cycle, Sprint Planning — viết test và phân tích log có hỗ trợ AI',
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
        'Có lỗi xảy ra. Vui lòng thử lại hoặc gửi email trực tiếp tới dannt4022@gmail.com.',
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
