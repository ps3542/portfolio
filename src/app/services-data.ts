export type service_item = {
  no: string;
  title: string;
  subtitle: string;
  desc: string;
  lines: string[];
};

export const services: service_item[] = [
  {
    no: "01",
    title: "Full-Stack Development",
    subtitle: "End-to-End Web Services",
    desc:
      "프론트엔드 인터랙션부터 백엔드 API 설계까지 전체 웹 서비스를 설계하고 구현합니다. 확장 가능하고 유지보수에 강한 구조로, 실제 사용자 환경을 고려한 서비스를 만듭니다.",
    lines: ["React, Node.js", "Spring boot, Rest api, Docker", "Git, Github"],
  },
  {
    no: "02",
    title: "UI/UX & Frontend",
    subtitle: "Clean, Responsive Interfaces",
    desc:
      "디자인은 단순한 시각 요소가 아니라 사용 흐름과 연결성입니다. 다양한 디바이스 환경에서 직관적으로 동작하는 반응형 인터페이스를 설계하고 구현합니다.",
    lines: ["Bootstrap, Next.js", "Figma to Code", "HTML, CSS, JavaScript"],
  },
  {
    no: "03",
    title: "Optimization",
    subtitle: "Performance & Stability",
    desc:
      "복잡한 데이터를 안정적인 시스템으로 구조화하고, 병목을 분석하여 성능을 개선합니다. 확장성·속도·안정성을 고려해 최적화된 구조를 설계합니다.",
    lines: ["Indexing & Query Tuning", "Redis Caching", "Observability"],
  },
];
