// src/app/page.tsx
import ServicesStack from './services-stack';
import HeroServicesScene from './hero-services-scene.client';
type LinkItem = { label: string; href: string; icon?: string };

type WorkItem = {
  title: string;
  subtitle: string;
  year: string;
  href?: string;
};

const socials: LinkItem[] = [
  { label: "Notion", href: "https://www.notion.so/ps3542/" },
  { label: "Github", href: "https://github.com/ps3542/portfolio" },
];

const selectedWorks: WorkItem[] = [
  { title: "project one", subtitle: "development", year: "2026", href: "#" },
  { title: "project two", subtitle: "development", year: "2026", href: "#" },
  { title: "project three", subtitle: "development", year: "2026", href: "#" },
  { title: "project four", subtitle: "development", year: "2026", href: "#" },
  { title: "project five", subtitle: "development", year: "2026", href: "#" },
];

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "languages & tools",
    items: [
      "python",
      "sql",
      "java",
      "typescript",
      "javascript",
      "git",
      "postman",
      "docker",
      "firebase",
    ],
  },
  {
    title: "frameworks & libraries",
    items: [
      "react",
      "next.js",
      "spring boot",
      "express.js",
      "bootstrap",
      "tailwindcss",
      "framer motion",
      "gsap",
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
                href="https://github.com/ps3542/portfolio"
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
<header id="top" className="hero">
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
               style={{ backgroundImage: "url('/heroimage.png')" }}
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
                <div className="about-photo" />
              </div>
              <div className="col-lg-6">
                <p className="ref-note mb-3">
                
                </p>
                <p className="ref-note mb-0">
                 
                </p>
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
            <h2 className="contact-title">say hello</h2>
            <div className="ref-note"></div>
          </div>

          <div data-reveal className="contact-wrap">
            <div className="row g-4">
              <div className="col-lg-7">
                <form className="form-min">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input className="form-control" placeholder="name" />
                    </div>
                    <div className="col-md-6">
                      <input className="form-control" placeholder="email" />
                    </div>
                    <div className="col-12">
                      <input className="form-control" placeholder="subject" />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="message"
                        rows={6}
                      />
                    </div>
                    <div className="col-12">
                      <button type="button" className="btn btn-dark px-4 py-2">
                        send message
                      </button>
                    </div>
                  </div>
                </form>
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