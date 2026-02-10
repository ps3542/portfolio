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
    subtitle: "end-to-end web services",
    desc:
      "기획 → 개발 → 배포까지 end-to-end로 책임지고, 사용자 경험(ux)과 운영 안정성까지 함께 챙깁니다. 빠르게 만들되, 오래 가는 구조로 정리합니다.",
    lines: ["react, next.js", "spring boot", "docker, ci/cd"],
  },
  {
    no: "02",
    title: "UI/UX & Frontend",
    subtitle: "clean, responsive interfaces",
    desc:
      "보이는 것만이 아니라 사용 흐름과 접근성을 함께 설계합니다. 다양한 디바이스에서 자연스럽게 동작하는 인터페이스를 구현합니다.",
    lines: ["bootstrap", "figma to code", "interaction / motion"],
  },
  {
    no: "03",
    title: "Optimization",
    subtitle: "performance & stability",
    desc:
      "병목을 찾아 개선하고, 측정 가능한 성능 향상을 만듭니다. 쿼리 튜닝, 캐싱, 모니터링까지 함께 정리합니다.",
    lines: ["query tuning", "caching", "monitoring"],
  },
];
