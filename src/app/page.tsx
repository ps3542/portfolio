// src/app/page.tsx
import ServicesStack from './services-stack';
import HeroServicesScene from './hero-services-scene.client';
import ContactForm from './contact-form.client';

type LinkItem = { label: string; href: string; icon?: string };

type WorkItem = {
  title: string;
  subtitle: string;
  year: string;
  href?: string;
  video?: string;
};

const socials: LinkItem[] = [
  { label: "Notion", href: "https://www.notion.so/ps3542/" },
  { label: "Github", href: "https://github.com/ps3542" },
];

const selectedWorks: WorkItem[] = [
  { title: "Nike", subtitle: "Toy project 1", year: "2026", href: "nike/index.html", video: "https://youtu.be/dYULOu4CQo0" },
  { title: "Chicken", subtitle: "Toy project 2", year: "2026", href: "chicken/index.html", video: "https://youtu.be/dJgLsoM17vE" },
  { title: "CocaCola", subtitle: "Toy project 3", year: "2026", href: "cocacola/index.html", video: "https://youtu.be/XZJH1Yw_htE" },
  { title: "PlaceEat", subtitle: "Mini Project", year: "2026", href: "https://github.com/ps3542/PlaceEat", video: "https://youtu.be/eF7QDWeVRpc" },
  { title: "Catch-A-Bite", subtitle: "Final Project", year: "2026", href: "https://github.com/ps3542/catch-a-bite", video: "https://youtu.be/m_gjlqqHYG8" },
];

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "languages & tools",
    items: [
      "html",
      "css",   
      "sql",
      "mysql, mariadb",
      "java",
      "javascript",
      "typescript",
      "python",
      "git",
      "linux",     
      "docker",
    ],
  },
  {
    title: "frameworks & libraries",
    items: [
      "spring boot",     
      "spring data jpa",   
      "rest api",
      "react",
      "next.js",
      "bootstrap",        
    ],
  },
  {
    title: "core cs concepts",
    items: ["dsa", "dbms", "oop", "operating systems", "system design"],
  },
];

import ScrollReveal from './scroll-reveal';
import WorksSection from './works-section';
import LocalTime from './local-time';

export default function Page() {
  return (
    <>
    <div id="top" aria-hidden="true" />
      <ScrollReveal />
      {/* hero top */}
      <div className="hero-top">
        <div className="hero-inner">
          <div className="hero-topbar">
            <span className="hero-role">Full-Stack Web Developer</span>

            <nav className="hero-nav">
              <a href="#services">Services</a>
              <a href="#works">Works</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>

              <span className="hero-nav-divider" />

              <a
                href="https://github.com/ps3542"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-nav-ext"
              >
                GitHub
              </a>
              <a
                href="https://www.notion.so/ps3542/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-nav-ext"
              >
                Notion
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* hero (유지) */}
      
      <HeroServicesScene
        hero={(
<header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title hero-title-center">For People Who Need Things Done</h1>

          <div className="row align-items-end gy-4">
            <div className="col-lg-4">
              <p className="hero-kicker mb-3">SCheoul(박성철)</p>

              <p className="hero-subtitle mb-4">
                웹 서비스의 설계부터 구현, 배포·운영까지 <br />
                end-to-end로 책임집니다.
              </p>
            </div>

            <div className="col-lg-5 d-flex justify-content-center">
              <div className="hero-photo" 
               style={{ backgroundImage: "url('heroimage.png')" }}
               />
            </div>

            <div className="col-lg-3">
              <div className="hero-stamp">
                <small>available for work</small>
                <strong>2026</strong>
              </div>
            </div>
          </div>
        </div>
      </header>
        )}
        services={<ServicesStack />}
      />


      {/* selected works (reference like) */}
      <WorksSection works={selectedWorks} />

      {/* skills */}
      <section data-reveal id="skills" className="section">
        <div className="container">
          <div className="row g-4 align-items-end">
            <div className="col-lg-6">
              <p className="big-words">
                developer
                <br />
                designer
                <br />
                creator/
              </p>
            </div>
            <div className="col-lg-6">
              <div className="ref-note">
                
              </div>
            </div>
          </div>

          {skillGroups.map((g) => (
            <div key={g.title} className="skill-block">
              <h3>{g.title}</h3>
              <div className="skill-cloud">
                {g.items.map((it) => (
                  <span key={it} className="skill-pill">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section data-reveal id="about" className="section section-soft">
        <div className="container">
          <div className="ref-heading">
            <div>
              <h2>about me</h2>
            </div>
            <p className="ref-sub">
             
            </p>
          </div>

          <div data-reveal className="about-wrap">
            <div className="row g-4 align-items-start">
              <div className="col-lg-6">
                <div className="about-photo"
                  style={{ backgroundImage: "url('jump.png')" }}
                >                  
                </div>
              </div>             
            <div className="col-lg-6 about-text">
              <p className="about-kicker">
                Building with intention
              </p>

              <div className="about-body">
                <p>
                  웹 서비스의 동작 방식에 대한 호기심에서 개발을 시작했습니다.
                  기능을 구현하는 단계에서 나아가 현재는 설계와 흐름을 먼저 생각합니다.
                </p>

                <p>
                  JSP 기반 MVC 구조의 프로젝트에서 계층형 아키텍처와 역할 분리 설계를 경험했고,
                  Spring Boot와 React를 기반으로 REST API 중심의 풀스택 웹 애플리케이션을 구현했습니다.
                  이를 통해 서비스가 구조 위에서 어떻게 연결되고 작동하는지 이해하게 되었습니다.
                </p>

                <p>
                  맡은 역할에 책임을 다하고, 끝까지 완성하는 개발자가 되고 싶습니다.
                  사용자와 운영자의 입장을 함께 고민하며, 실제로 쓰이는 서비스를 만드는 것을 목표로 합니다.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section data-reveal id="contact" className="section">
        <div className="container">
          <div className="ref-note">let&apos;s make it happen</div>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mt-2">
            <h2 className="contact-title">Say Hello</h2>
            <div className="ref-note"></div>
          </div>

          <div data-reveal className="contact-wrap">
            <div className="row g-4">
              <div className="col-lg-7">
                <ContactForm />
              </div>

              <div className="col-lg-5">
                <div className="footer-grid">
                  <div>
                    <h4>menu</h4>
                    <div className="d-flex flex-column gap-2">
                      <a href="#top">Home</a>
                      <a href="#services">Services</a>
                      <a href="#works">Works</a>
                      <a href="#about">About</a>
                      <a href="#contact">Contact</a>
                    </div>
                  </div>

                  <div>
                    <h4>socials</h4>
                    <div className="d-flex flex-column gap-2">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>

                    <div className="localtime"><LocalTime /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a className="to-top" href="#top" aria-label="scroll to top">
            ↑
          </a>
        </div>
      </section>
    </>
  );
}