import type { Dictionary } from './en';

/**
 * Japanese dictionary. Tone: です/ます consistent (polite-neutral business).
 * Tech terms in katakana per Japanese QA industry convention.
 * Proper nouns (HOPEE, FPT Aptech, Postman, Jira, Git, ...) stay as-is.
 *
 * NOTE: AI-generated draft — please have a native JP speaker review before
 * publishing to a Japanese hiring audience.
 */
const ja: Dictionary = {
  meta: {
    pageTitle: 'Dan Nguyen Tien - AI活用QAエンジニア',
    description:
      'マイクロサービスシステムを2年以上間テストしてきたAI活用QAエンジニア。Postman、Selenium、Playwright、Claude、Copilot を駆使し、より速く正確なテストサイクルを実現。',
  },

  a11y: {
    skipToContent: 'メインコンテンツへスキップ',
    scrollToTop: 'ページ上部へ戻る',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    siteNav: 'サイトナビゲーション',
    appearance: '外観',
    switchToLight: 'ライトモードに切り替え',
    switchToDark: 'ダークモードに切り替え',
    switchLocale: '言語を切り替え',
  },

  nav: {
    about: '自己紹介',
    achievements: '実績',
    career: '経歴',
    traceability: 'JD適合',
    aiWorkflow: 'AIワークフロー',
    repos: '制作物',
    skills: 'スキル',
    contact: 'お問い合わせ',
    downloadCv: '履歴書ダウンロード',
    menu: 'メニュー',
  },

  hero: {
    welcomeChip: 'ポートフォリオへようこそ',
    role: '<AI-Augmented QA Engineer/>',
    specialty: '要件ベーステスト · AI活用 · 車載組込み (学習中)',
    bio: 'マイクロサービスベースのシステムにおける手動テストで2年以上の経験を持つ AI 活用型 QA エンジニアです。要件分析、テストケース設計、Postman・Mockoon による API テスト、MySQL・PostgreSQL でのデータベース検証、JMeter による基本的なパフォーマンステストといった従来の QA 手法に加え、Claude や Copilot を活用した最新の AI ワークフローで、テスト作成、ログトリアージ、バグレポート品質の向上を実現しております。現在は Claude Code との AI ペアプログラミングセッションを通じて Playwright スキルを拡張中であり、車載組込みテスト (C/C++、Simulink、CANoe、MiL/SiL/HiL) の自主学習ロードマップにも取り組んでいます。',
    ctaPrimary: '経歴を見る',
    ctaSecondary: 'お問い合わせ',
    statusBadge: '新しい機会を探しています',
    portraitAlt: 'Dan Nguyen Tien のポートレート',
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },

  currentlyBuilding: {
    eyebrow: '現在',
    title: '取り組み中 & 学習中',
    items: [
      'Claude Code と組んだ Playwright テストスイート',
      'ISTQB Foundation Level — 受験準備中',
      '車載組込みテスト学習ロードマップ — C/C++、Simulink/TPT、CANoe/CANape、CAN、DOORS/codeBeamer (自主学習)',
    ],
  },

  repos: {
    eyebrow: '公開リポジトリ',
    title: 'コード & プロジェクト',
    subtitle:
      '公開しているテストスイート、自動化、ツール類です。日々の業務で構築したものをそのまま共有しています。',
    viewAll: 'GitHubで全リポジトリを見る',
    entries: {
      playwright: {
        description:
          '公開ECサンドボックス向けの Playwright + Selenium テスト。Page Object Model と非同期パターン、Claude Code とのペアプログラミングで構築。',
      },
      portfolio: {
        description:
          'このポートフォリオ。React 19 + Vite 6 + Tailwind 4、EN/VI/JA の i18n、ダーク/ライトテーマ、Vercel にデプロイ。',
      },
      apiCollections: {
        description:
          'REST API 検証用の Postman コレクション + Mockoon シナリオ。ハッピーパス、エッジケース、コントラクトドリフトを網羅。',
      },
    },
  },

  achievements: {
    chip: 'AI活用QAエンジニア',
    yearsCount: '2',
    yearsLabel: '年以上の経験',
    tagline: '厳格な',
    taglineHighlight: 'AI活用テストワークフロー',
    taglineSuffix: 'でソフトウェアの信頼性を確保します。私がコードを壊すので、あなたは安心 — しかも、より早く。',
    stats: {
      projects: '完了プロジェクト',
      bugs: '報告したバグ',
      testCases: '作成したテストケース',
    },
  },

  careerTimeline: {
    title: 'プロフェッショナルジャーニー',
    subtitle:
      'QA分野でのこれまでの主な役割、実績、学歴をまとめたタイムラインです。',
    entries: {
      hopeeFresher: {
        title: 'フレッシャー / ジュニア',
        company: 'HOPEE Co., Ltd.',
        date: '2024年11月 〜 現在',
        items: [
          'クライアント案件のフルサイクルテストに従事し、高品質な納品物を実現。',
          'クロスファンクショナルチームと連携し、複雑な問題の解決と製品安定性の向上に貢献。',
          '自動化スキルを継続的に磨き、社内QAプロセス改善に貢献中。',
          'チーム内で AI 活用 QA ワークフローを率先して導入 — ユーザーストーリーからのテストケース骨組みに Claude、Selenium スクリプト下書きに Copilot、ログトリアージに AI を活用 — 日常的なテスト作成業務において目に見える生産性向上を実現。',
        ],
        tags: ['自動化', 'AIワークフロー', '品質管理'],
      },
      hopeeProbation: {
        title: '試用期間',
        company: 'HOPEE Co., Ltd.',
        date: '2024年9月 〜 2024年11月',
        items: [
          'インターンから試用社員へ昇格し、より多くの責任を担当。',
          'リグレッションテスト計画を実行し、リリース前に重要な欠陥を報告。',
          'QA手法とツールに対する確かな理解を実証。',
        ],
        tags: ['リグレッションテスト', 'バグレポート'],
      },
      hopeeIntern: {
        title: 'インターン',
        company: 'HOPEE Co., Ltd.',
        date: '2024年6月 〜 2024年8月',
        items: [
          '手動テストの実務経験を積み、会社の技術スタックに習熟。',
          'シニアエンジニアを支援し、テストケースとドキュメントを作成。',
          'デイリースタンドアップおよびアジャイルプロセスに参加。',
        ],
        tags: ['手動テスト', 'ドキュメント', 'アジャイル'],
      },
      fptAptech: {
        title: 'コンピュータ教育',
        company: 'FPT Aptech',
        date: '2023年7月 〜 2025年6月',
        subtext: 'Aptech Computer Education, India – FPT Corporation との連携プログラム',
        items: [
          'ソフトウェア開発とテストの基礎について集中的なカリキュラムを修了。',
          'プログラミング (C/C++、Python — 基礎)、データベース管理、Web技術の基礎を習得。',
          '理論を実践に応用する実プロジェクトに参加。',
        ],
        tags: ['ソフトウェア開発', 'データベース', 'テスト基礎'],
      },
      japan: {
        title: '留学生',
        company: '日本',
        date: '2019年 〜 2023年',
        items: [
          '異文化環境に適応しながら学業を遂行。',
          '異文化コミュニケーション能力と適応力を養成。',
          '日本語能力と日本式の労働倫理を習得。',
          '読売自動車大学校 (東京) で自動車整備を学ぶ (2021–2023)。',
        ],
        tags: ['日本語', '適応力'],
      },
    },
  },

  aiWorkflow: {
    title: 'AI活用ワークフロー',
    subtitle:
      'AIツールを活用し、厳密さを犠牲にせず、より高品質なテスト資産をより速く提供する方法をご紹介します。',
    patterns: {
      testCaseScaffolding: {
        title: 'テストケースの骨組み作成',
        desc: 'ユーザーストーリーと受け入れ基準をもとに、Claude にハッピーパス、エッジケース、境界値、ネガティブパスを網羅した Gherkin シナリオの下書きを作成。常にレビューを行い、ドメインコンテキストを補完します。',
      },
      logTriage: {
        title: 'AIによるログトリアージ',
        desc: 'CI 失敗ログを Claude で解析し、根本原因の仮説抽出、スタックトレースのクラスタリング、Jira severity の推奨を実施。スプリントデモやスタンドアップでの素早い状況把握に役立ちます。',
      },
      syntheticData: {
        title: '合成テストデータ生成',
        desc: '境界値データセットやエッジケースのペイロードを生成し、Postman および Mockoon のテストスイートに直接組み込んで API テストに活用。',
      },
      multilangSync: {
        title: '多言語テスト資産の同期',
        desc: '独自の QA 用語集を持つ Claude を用いて、テストケースとバグレポートを EN / VI / JA 間で翻訳。クロスリージョンのエンジニアリングチームに有用です。',
      },
      pairedLearning: {
        title: 'AIペアによるフレームワーク習得',
        desc: 'Claude Code とのペアプログラミングを通じて Selenium と Playwright を自主学習: Page Object Model の構築、非同期テスト失敗のデバッグ、フレーキーテストのリファクタリング。従来のチュートリアルベースの学習よりも素早く習得できます。',
      },
    },
  },

  traceability: {
    eyebrow: 'JD 適合度',
    title: '要件トレーサビリティマトリクス',
    subtitle: '組込みテスター職の要件を実際のエビデンスに対応付け、テスト実行結果のように正直に報告します。',
    summaryLabel: '実行サマリー:',
    footnote: '* 達成 = 実務経験あり · 学習中 = ハンズオンラボで自主学習 · 計画 = ロードマップ上',
    columns: { id: 'ID', requirement: '要件', evidence: 'エビデンス', status: '判定' },
    status: { met: '達成', inProgress: '学習中', planned: '計画' },
    rows: {
      requirements: { req: '要件分析・レビュー、承認済み要件からのテスト仕様導出', evidence: 'HOPEE: ユーザーストーリーと受け入れ基準に紐づく 500+ テストケース' },
      testDesign: { req: 'テスト設計: 同値分割、境界値分析', evidence: '顧客プロジェクトで日常的に実践、リスクベースで優先度付け' },
      execution: { req: 'テスト実行・結果分析・テストレポート', evidence: '2+ プロジェクトで 200+ 件の欠陥を Jira で報告・追跡' },
      automation: { req: 'テスト自動化の開発', evidence: 'Selenium WebDriver (Page Object Model)、Playwright (TypeScript)' },
      vModel: { req: 'SDLC / V字モデルの知識', evidence: '実務での STLC・アジャイル、学習ロードマップで V字モデルを整理' },
      git: { req: 'Git', evidence: '日常的なバージョン管理、Jenkins CI パイプライン' },
      english: { req: '英語でのコミュニケーション', evidence: '業務レベルの英語、日本語は N2 レベルの読解' },
      coverage: { req: 'コードカバレッジ: DC、MC/DC', evidence: '自主学習ラボ: gcov による C ユニットテスト、MC/DC 真理値表' },
      cpp: { req: 'C/C++ プログラミング', evidence: 'FPT Aptech で基礎を学習、組込み風 C モジュールで練習中' },
      python: { req: 'Python スクリプト', evidence: '基礎レベル、ラボで CAN とモデルの pytest スイート' },
      can: { req: '通信プロトコル (CAN)', evidence: 'python-can 仮想バスでのテスト: ID、DLC、信号スケーリング、周期' },
      automotive: { req: '自動車ドメイン知識', evidence: '読売自動車大学校 (東京) で自動車整備を学習 (2021–2023)' },
      istqb: { req: 'ISTQB Foundation Level', evidence: '受験準備中、VIT Academy 自動化テスト修了証' },
      simulink: { req: 'MATLAB Simulink / TPT / Embedded Coder', evidence: '次のステップ — まず Python モデルで MiL の概念を練習' },
      canoe: { req: 'CANoe / CANape、HiL 機器', evidence: 'CAN 基礎の後に学習予定' },
      doors: { req: 'DOORS / codeBeamer', evidence: '次のステップ — Jira / TestRail でトレーサビリティは実践済み' },
    },
  },

  vModel: {
    eyebrow: '学習パス',
    title: 'V字モデル ロードマップ',
    subtitle: '既に実務で担っている工程と、MiL / SiL / HiL テストに向けて習得中の工程。',
    leftArm: '仕様',
    rightArm: '検証',
    footnote: '左側の各レベルは右側の対応レベルで検証されます。',
    status: { met: '達成', inProgress: '学習中', planned: '計画' },
    stages: {
      requirements: { title: '要件分析', desc: '要件をレビューし、受け入れ基準を明確化、曖昧な点を指摘。' },
      systemDesign: { title: 'システム設計レビュー', desc: '承認済み要件からシステムレベルのテスト仕様を導出。' },
      architecture: { title: 'アーキテクチャ / インターフェース', desc: 'コンポーネント間インターフェースを結合テストシナリオに対応付け (現在は API 契約)。' },
      unitDesign: { title: 'ユニット設計', desc: 'モジュール仕様と C コードを読み、同値分割・境界値テストを設計。' },
      implementation: { title: '実装', desc: 'C/C++ と Python の基礎 — テスト対象となるコード。' },
      unitTest: { title: 'ユニットテスト · MiL', desc: 'カバレッジ付き C ユニットテスト、MiL 代替としての Python モデルテスト。' },
      integration: { title: '結合テスト · SiL', desc: 'python-can による仮想 CAN バステスト、業務での API 結合テスト。' },
      systemTest: { title: 'システムテスト · HiL', desc: 'CANoe / CANape と HiL 環境 — 次の計画。' },
      acceptance: { title: '受け入れ', desc: '納品プロジェクトでの UAT とリリース承認。' },
    },
  },

  skills: {
    title: 'スキル一覧',
    cards: {
      testing: {
        title: 'テスト知識',
        desc: '機能テスト、リグレッション、スモーク、サニティ、UAT、ブラックボックス、探索的テスト — 同値分割、境界値分析、デシジョンテーブル、要件ベースのテスト設計',
        tags: ['機能テスト', 'リグレッション'],
      },
      requirements: {
        title: '要件分析',
        desc: '要件レビュー、承認済み要件からのテスト仕様導出、受け入れ基準、リスク分析、要件–テスト間トレーサビリティ',
        tags: ['Jira', 'Confluence'],
      },
      process: {
        title: 'プロセス',
        desc: 'V字モデル、アジャイル/スクラム、SDLC、STLC、バグライフサイクル、テストレポート — AI 活用によるテスト作成とトリアージ',
        tags: ['アジャイル', 'AI-First'],
      },
      api: {
        title: 'API & バックエンド',
        desc: 'REST API、Postman、JSON/XML検証、ステータスコード確認',
        tags: ['Postman', 'REST'],
      },
      database: {
        title: 'データベース',
        desc: 'SQL クエリ、データ整合性、Inner/Outer Joins、データ移行テスト',
        tags: ['MySQL', 'PostgreSQL'],
      },
      automation: {
        title: '自動化',
        desc: 'Selenium WebDriver と Playwright (TypeScript) — Page Object Model、非同期パターン。Claude Code との AI ペアセッションで現在進行中で拡張中です。',
        tags: ['Selenium', 'Playwright', 'Claude Code'],
      },
      aiWorkflow: {
        title: 'AI活用ワークフロー',
        desc: 'Claude と Copilot を日常的に活用し、テストケース生成、欠陥トリアージ、合成データ作成、多言語テスト資産翻訳を実施。',
        tags: ['Claude', 'Copilot', 'プロンプトエンジニアリング'],
      },
      tools: {
        title: 'ツール',
        desc: 'Jira、Git、Jenkins、TestRail、Chrome DevTools',
        tags: ['Git', 'Jenkins'],
      },
      communication: {
        title: 'コミュニケーション',
        desc: 'クロスファンクショナル連携、欠陥レポート、技術ドキュメント',
        tags: ['Slack', 'Zoom'],
      },
    },
  },

  contact: {
    availability: '新しい機会を募集中: GMT+7',
    title: 'お気軽にご連絡ください',
    body: '私のコードにバグを見つけましたか? QA戦略について話したいですか? 下記にメッセージをお送りください。テストには正確を期し、返信は迅速に行います。',
    info: {
      emailLabel: 'メールアドレス',
      phoneLabel: '電話番号',
      locationLabel: '所在地',
      locationValue: 'ベトナム、ホーチミン市、ホクモン区',
    },
    profiles: {
      heading: 'プロフェッショナルプロフィール',
      resume: { title: '履歴書ダウンロード', subtitle: '完全なCVのPDFを取得' },
      linkedin: { title: 'LinkedIn プロフィール', subtitle: 'つながる・ネットワーキング' },
      github: { title: 'GitHub ポートフォリオ', subtitle: 'コードリポジトリを閲覧' },
    },
    form: {
      nameLabel: 'お名前',
      namePlaceholder: '山田 太郎',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'name@example.com',
      subjectLabel: '件名',
      subjectPlaceholder: 'トピックを選択',
      subjectOptions: {
        opportunity: '求人のご相談',
        freelance: 'フリーランス案件',
        bug: 'バグ報告',
        other: 'その他',
      },
      messageLabel: 'メッセージ',
      messagePlaceholder: 'プロジェクトやお問い合わせ内容をご記入ください...',
      messageMaxHint: '最大500文字',
      submit: '送信',
      sending: '送信中…',
      sendAnother: '別のメッセージを送る',
      emailError: '有効なメールアドレスを入力してください。',
      emailMeDirectly: 'メールで直接連絡する',
      charCounterLabel: '文字',
      successTitle: '送信完了 — 近日中にご連絡いたします。',
      successBody: 'お問い合わせありがとうございます。24時間以内に返信いたします。',
      successCtaHeading: 'つながりましょう:',
      errorTitle: '送信に失敗しました。',
      errorBody:
        'エラーが発生しました。再度お試しいただくか、tiendannguyen224@gmail.com まで直接メールをお送りください。',
      offlineNote: 'フォーム送信機能は未設定です — 直接メールでご連絡ください。',
      validationNote: '標準的な入力検証で保護されています。',
      required: '*',
    },
  },

  footer: {
    rights: 'All rights reserved.',
  },
};

export default ja;
