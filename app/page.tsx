"use client";

import Image from "next/image";
import CompanyStats from "./components/company-stats";
import CompanyMarquee from "./components/company-marquee";
import OrganizationChart from "./components/organization-chart";
import useImageParallax from "./components/use-image-parallax";
import { useEffect, useState, type FormEvent } from "react";

const navigation = [
  ["Home", "home"],
  ["About us", "about"],
  ["Accreditation", "accreditation"],
  ["Japan", "japan"],
  ["Thailand", "thailand"],
  ["Malaysia", "malaysia"],
  ["Our team", "team"],
  ["Contact us", "contact"],
];
const countries = [
  {
    name: "Japan",
    id: "japan",
    native: "日本",
    tagline: "Recruitment and preparation for Japan",
    description:
      "With 100 workers placed in Japan to date, we help Myanmar talent prepare for a new working culture through careful screening and pre-departure preparation.",
    stat: "100",
    label: "workers placed in Japan",
  },
  {
    name: "Thailand",
    id: "thailand",
    native: "ประเทศไทย",
    tagline: "Our largest placement market",
    description:
      "Our largest placement destination, with approximately 7,500 workers deployed. Our experience includes responsible recruitment for established employers across food production and electronics.",
    stat: "7,500",
    label: "workers placed in Thailand",
  },
  {
    name: "Malaysia",
    id: "malaysia",
    native: "Malaysia",
    tagline: "Enquiries about Malaysia",
    description:
      "Interested in working in Malaysia? Speak with our team about current recruitment availability, eligibility, and the preparation involved before making your next move.",
    stat: "Let's talk",
    label: "ask about current availability",
  },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path
        d="M4 12h15M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Brand() {
  return (
    <a
      href="#home"
      className="brand"
      aria-label="Shwe Pyi Nyein International home"
    >
      <Image src="/spn_Logo.jpg" alt="SPN logo" width={65} height={45} />
      <span>
        SHWE PYI NYEIN<small>INTERNATIONAL CO., LTD.</small>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [emailPrepared, setEmailPrepared] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introSkipped, setIntroSkipped] = useState(false);
  useImageParallax(!introVisible);
  function skipIntro() {
    setIntroSkipped(true);
    setIntroVisible(false);
  }
  useEffect(() => {
    let active = true;
    // Also handles an intro that finishes before React hydrates the page.
    const animations =
      document.querySelector(".intro-screen")?.getAnimations() ?? [];
    Promise.all(
      animations.map((animation) => animation.finished.catch(() => undefined)),
    ).then(() => {
      if (active) setIntroVisible(false);
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => sections.observe(el));
    return () => {
      observer.disconnect();
      sections.disconnect();
    };
  }, []);
  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `SPN enquiry: ${data.get("interest")}`;
    const content = `Name: ${data.get("name")}\nEmail or phone: ${data.get("contact")}\nInterest: ${data.get("interest")}\n\n${data.get("message")}`;
    window.location.href = `mailto:soespn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
    setEmailPrepared(true);
  }
  return (
    <div
      className="site-experience"
      data-intro-skipped={introSkipped}
      data-intro-complete={!introVisible}
    >
      <noscript>
        <style>{`.corporate-hero * { animation: none !important; }`}</style>
      </noscript>
      {introVisible && (
        <div
          className="intro-screen"
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setIntroVisible(false);
          }}
        >
          <div className="intro-identity" aria-hidden="true">
            <span className="intro-welcome">Welcome to</span>
            <Image
              src="/spn_Logo.jpg"
              alt=""
              width={148}
              height={100}
              preload
            />
            <span className="intro-name">SHWE PYI NYEIN</span>
            <span className="intro-subtitle">INTERNATIONAL CO., LTD.</span>
            <span className="intro-rule" />
            <span className="intro-service">
              Overseas employment &amp; recruitment
            </span>
          </div>
          <span className="intro-auto-note" aria-hidden="true">
            Your visit begins here.
          </span>
          <button className="intro-skip" onClick={skipIntro}>
            Enter website <Arrow />
          </button>
        </div>
      )}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility-bar">
        <a href="mailto:soespn@gmail.com">
          <span aria-hidden="true">✉</span> soespn@gmail.com
        </a>
        <span>Myanmar talent. International opportunities.</span>
        <a href="tel:+959770810058">Call us: 09770810058</a>
      </div>
      <header className="header">
        <Brand />
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d={menuOpen ? "M6 6l12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <nav
          id="main-nav"
          className={menuOpen ? "nav is-open" : "nav"}
          aria-label="Main navigation"
        >
          {navigation.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`${active === id ? "active " : ""}${id === "contact" ? "nav-contact" : ""}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {id === "contact" && <Arrow diagonal />}
            </a>
          ))}
        </nav>
      </header>
      <main id="main">
        <section id="home" className="corporate-hero">
          <div className="corporate-hero-main">
            <div className="corporate-hero-copy">
              <p className="corporate-company">
                SHWE PYI NYEIN INTERNATIONAL CO., LTD.
              </p>
              <h1>
                <span className="intro-line">
                  <span>Overseas employment</span>
                </span>
                <span className="intro-line">
                  <span>&amp; recruitment services</span>
                </span>
              </h1>
              <p className="corporate-intro">
                Connecting Myanmar workers with employers overseas since 2000.
              </p>
              <p className="corporate-description">
                We provide candidate screening, pre-departure preparation, and
                workforce placement through a transparent and responsible
                recruitment process.
              </p>
              <div className="corporate-actions">
                <a href="#contact" className="button button-dark">
                  Contact our team <Arrow />
                </a>
                <a href="tel:+959770810058" className="corporate-phone">
                  <span>Call our office</span>
                  <strong>09770810058</strong>
                </a>
              </div>
              <a href="#about" className="corporate-about">
                Learn more about our company <Arrow />
              </a>
            </div>
            <figure className="corporate-office">
              <div className="corporate-office-collage" data-parallax>
                <div className="corporate-office-image">
                  <Image
                    src="/spn_office_two.jpg"
                    alt="A welcoming space at the SPN office"
                    fill
                    preload
                    sizes="(max-width: 800px) 45vw, 23vw"
                  />
                </div>
                <div className="corporate-office-image">
                  <Image
                    src="/home1.jpg"
                    alt="A welcoming space at the SPN office"
                    fill
                    sizes="(max-width: 800px) 45vw, 23vw"
                  />
                </div>
                <div className="corporate-office-image">
                  <Image
                    src="/home2.jpg"
                    alt="Staff at the Shwe Pyi Nyein International office"
                    fill
                    sizes="(max-width: 800px) 45vw, 23vw"
                  />
                </div>
                <div className="corporate-office-image">
                  <Image
                    src="/home3.jpg"
                    alt="Inside the Shwe Pyi Nyein International office"
                    fill
                    sizes="(max-width: 800px) 45vw, 23vw"
                  />
                </div>
              </div>
              <figcaption>
                <span>Shwe Pyi Nyein International</span>
                <span>Our office in Myanmar</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <CompanyStats ready={!introVisible} />
        <section id="about" className="section about-section">
          <div className="section-kicker reveal">
            <span>About SPN</span>
          </div>
          <div className="about-grid">
            <div className="about-heading reveal">
              <h2>
                Recruitment experience
                <br />
                <em>since 2000.</em>
              </h2>
              <div className="about-photo" data-parallax>
                <Image
                  src="/spn_office_one.jpg"
                  alt="Reception and working area at the Shwe Pyi Nyein International office"
                  fill
                  sizes="(max-width: 650px) 100vw, 40vw"
                />
                <span>SHWE PYI NYEIN INTERNATIONAL OFFICE</span>
              </div>
            </div>
            <div className="about-copy reveal">
              <p className="lead">
                Recruiting Myanmar workers for employers in Thailand, Singapore,
                and Japan.
              </p>
              <p>
                Shwe Pyi Nyein International Co., Ltd, established in 2000, is a
                Ministry of Labour–licensed overseas employment agency in
                Myanmar, with more than 26 years of experience in international
                manpower recruitment and workforce placement.
              </p>
              <p>
                Over the years, we have built extensive experience in recruiting
                and deploying Myanmar workers to Thailand, Singapore, and Japan,
                with approximately 7,500 workers placed in Thailand, 2,500 in
                Singapore, and 100 in Japan to date.
              </p>
              <p>
                Our strength lies not only in connecting qualified workers with
                suitable employment opportunities, but also in providing a
                responsible, transparent, and well-managed recruitment process.
                We carefully screen candidates, provide pre-departure
                preparation, and ensure that workers are properly informed about
                their employment conditions, workplace expectations, and
                responsibilities before deployment.
              </p>
              <details className="story-details">
                <summary>
                  Read our full story <span>+</span>
                </summary>
                <p>
                  We are committed to the principles of responsible recruitment,
                  worker welfare, human rights, dignity, and ethical employment
                  practices. We believe that successful recruitment is built on
                  trust, transparency, and mutual respect among workers,
                  employers, and recruitment partners.
                </p>
                <p>
                  We also have proven experience working under the Responsible
                  Business Alliance (RBA) Employer Pay System, with successful
                  worker placements for Cal-Comp Electronic (Thailand) Public
                  Co., Ltd, Prime Products Industry Co., Ltd, Pataya Food
                  Industries Co., Ltd, Cargill Meats (Thailand) Co., Ltd and CPF
                  (Thailand) Company Limited.
                </p>
                <p>
                  Our commitment is to provide employers with reliable and
                  suitable manpower while ensuring that workers are recruited
                  and deployed through a fair and responsible process.
                </p>
                <p>
                  With more than two decades of industry experience, SPN
                  continues to build long-term partnerships with reputable
                  employers and business partners, with a shared commitment to
                  responsible recruitment, workforce quality, and sustainable
                  employment.
                </p>
              </details>
              <div className="values-inline">
                <span>Trust</span>
                <span>Transparency</span>
                <span>Care</span>
              </div>
            </div>
          </div>
        </section>
        <section id="accreditation" className="accreditation section">
          <div className="section-kicker reveal">
            <span>Our accreditation</span>
          </div>
          <div className="standards-heading reveal">
            <h2>
              Licensing &amp;
              <br />
              recruitment standards
            </h2>
            <p>
              Our recruitment process prioritizes clear employment conditions,
              worker welfare, and preparation before departure.
            </p>
          </div>
          <div className="standards-grid">
            {[
              [
                "Licensed & established",
                "A Ministry of Labour–licensed overseas employment agency in Myanmar, established in 2000.",
                "A FOUNDATION YOU CAN TRUST",
              ],
              [
                "Responsible recruitment",
                "Proven placement experience under the Responsible Business Alliance (RBA) Employer Pay System.",
                "ETHICAL PRACTICES IN ACTION",
              ],
              [
                "People & their dignity",
                "Worker welfare, human rights, transparent employment conditions, and preparation before departure.",
                "PEOPLE ALWAYS COME FIRST",
              ],
            ].map(([title, text, foot], i) => (
              <article className="standard-card reveal" key={title}>
                <span className="standard-icon">
                  0{i + 1} <span>↗</span>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="card-foot">{foot}</span>
              </article>
            ))}
          </div>
          <CompanyMarquee />
        </section>
        <section id="destinations" className="section destinations-section">
          <div className="section-kicker reveal">
            <span>Our destinations</span>
          </div>
          <div className="destinations-heading reveal">
            <h2>
              Overseas employment
              <br />
              destinations
            </h2>
            <p>
              Learn about our placement experience and contact our team for
              current recruitment availability.
            </p>
          </div>
          <div className="destination-grid">
            {countries.map((c, i) => (
              <section
                id={c.id === "japan" ? "japan-overview" : c.id}
                key={c.id}
                className={`destination-card ${c.id} reveal`}
              >
                <div className="destination-art" data-parallax>
                  <Image
                    src={`/destinations/${c.id}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 90vw, 30vw"
                    className="destination-image"
                  />
                  <span className="country-number">0{i + 1} / DESTINATION</span>
                  <span className={`flag flag-${c.id}`} />
                  <span className="country-native">{c.native}</span>
                  <h3>{c.name}</h3>
                </div>
                <div className="destination-content">
                  <h4>{c.tagline}</h4>
                  <p>{c.description}</p>
                  <div className="destination-stat">
                    <strong>{c.stat}</strong>
                    <span>{c.label}</span>
                  </div>
                  <a
                    href={c.id === "japan" ? "#japan" : "#contact"}
                    className="destination-link"
                    onClick={() => {
                      const select = document.querySelector<HTMLSelectElement>(
                        'select[name="interest"]',
                      );
                      if (select) select.value = `Working in ${c.name}`;
                      setEmailPrepared(false);
                    }}
                  >
                    {c.id === "japan" ? "Explore our Japan program" : `Enquire about ${c.name}`} <Arrow diagonal />
                  </a>
                </div>
              </section>
            ))}
          </div>
          <p className="destination-note">
            Our placement history also includes approximately 2,500 workers in
            Singapore. Current opportunities and requirements are confirmed by
            our team.
          </p>
        </section>
        <section id="japan" className="section japan-section" aria-labelledby="japan-title">
          <div className="section-kicker reveal">
            <span>Japan</span>
          </div>
          <div className="japan-detail-grid">
            <div className="japan-detail-copy reveal">
              <h2 id="japan-title">Industrial Packing</h2>
              <p className="japan-program-type">Intern Training in Japan</p>
              <div className="japan-employer">
                <span>Host company</span>
                <strong>Greenbox Co., Ltd.</strong>
              </div>
              <p className="japan-intro">
                We help candidates prepare for industrial packing work in Japan
                through screening, language training with our partner, and
                pre-departure preparation.
              </p>
              <aside className="japan-partner" aria-label="Japanese language training partner">
                <span className="japan-partner-label">Japanese language training partner</span>
                <h3>Nippon Language Center</h3>
                <p>
                  Japanese language training is provided by our partner,
                  Nippon Language Center, an independently operated center.
                </p>
                <a href="https://www.nipponlanguagecenter.com" target="_blank" rel="noopener noreferrer">
                  Visit partner website <Arrow diagonal />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </aside>
              <a href="#contact" className="text-link" onClick={() => {
                const select = document.querySelector<HTMLSelectElement>('select[name="interest"]');
                if (select) select.value = "Working in Japan";
                setEmailPrepared(false);
              }}>
                Enquire about Japan <Arrow diagonal />
              </a>
            </div>
            <div className="japan-gallery reveal" aria-label="Japan photo gallery">
              {[
                { src: "/japan_1.jpg", alt: "Warehouse interior with pallets and a forklift", caption: "Industrial packing workplace" },
                { src: "/japan_2.jpg", alt: "Group of four people at the airport departure area", caption: "Departure for Japan" },
              ].map((photo) => (
                <a
                  key={photo.src}
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${photo.caption.toLowerCase()} photo in full size (new tab)`}
                >
                  <div className="japan-gallery-image" data-parallax>
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 43vw, 28vw" />
                  </div>
                  <span>{photo.caption}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="process-section section">
          <div className="section-kicker reveal">
            <span>How it works</span>
          </div>
          <div className="process-title reveal">
            <h2>Our recruitment process</h2>
            <p>
              Candidate screening, employment information, pre-departure
              preparation, and deployment.
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "Initial consultation",
                "We understand your goals, experience, and preferred destination.",
              ],
              [
                "Candidate screening",
                "Careful candidate screening connects people with suitable opportunities.",
              ],
              [
                "Pre-departure preparation",
                "Understand your employment conditions, responsibilities, and workplace expectations.",
              ],
              [
                "Worker deployment",
                "A well-managed deployment process, built around responsible recruitment.",
              ],
            ].map(([title, text], i) => (
              <article className="reveal" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="team" className="section team-section">
          <div className="section-kicker reveal">
            <span>Our team</span>
          </div>
          <div className="team-grid">
            <div className="founder-photo reveal" data-parallax>
              <Image
                src="/chair_man.png"
                alt="Mr. Soe Myint Aung, founder and chairman of Shwe Pyi Nyein International, at his office"
                fill
                sizes="(max-width: 650px) 100vw, 45vw"
              />
              <div>
                <span>OUR FOUNDER & CHAIRMAN</span>
                <p>Mr. Soe Myint Aung</p>
              </div>
            </div>
            <div className="team-copy reveal">
              <h2>
                Our founder
                <br />
                &amp; recruitment team
              </h2>
              <p className="lead">Led by Mr. Soe Myint Aung.</p>
              <p>
                Since 2000, our leadership and team have helped connect Myanmar
                workers with reputable employers abroad. Behind every journey is
                a commitment to thoughtful preparation, clear communication, and
                respect.
              </p>
              <p>
                From candidate screening to pre-departure preparation, we work
                together to make responsible recruitment a reality.
              </p>
              <a
                href="#organization-chart"
                className="text-link"
              >
                Meet our organization <Arrow />
              </a>
            </div>
          </div>
          <OrganizationChart />
          <div className="office-gallery">
            <div className="reveal" data-parallax>
              <Image
                src="/spn_office_three.jpg"
                alt="Working spaces at the SPN office"
                fill
                sizes="50vw"
              />
            </div>
            <div className="reveal" data-parallax>
              <Image
                src="/spn_office_foure.jpg"
                alt="Inside our Myanmar office"
                fill
                sizes="50vw"
              />
            </div>
            <p>Inside the Shwe Pyi Nyein International office.</p>
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <div className="section-kicker reveal">
            <span>Contact us</span>
          </div>
          <div className="contact-grid">
            <div className="reveal">
              <h2>
                Speak with
                <br />
                our recruitment team
              </h2>
              <p>
                Looking for an opportunity abroad, or a reliable recruitment
                partner? Contact us by phone or email to discuss your
                requirements.
              </p>
              <div className="contact-location">
                <span>CALL US</span>
                <a href="tel:+959770810058">09770810058</a>
                <a href="tel:+9595010209">095010209</a>
              </div>
              <div className="contact-location">
                <span>EMAIL US</span>
                <a href="mailto:soespn@gmail.com">soespn@gmail.com</a>
              </div>
              <div className="contact-location">
                <span>BASED IN MYANMAR</span>
                <p>
                  Please contact us for office location and visit arrangements.
                </p>
              </div>
            </div>
            <form
              className="enquiry-form reveal"
              onSubmit={prepareEnquiry}
              onChange={() => setEmailPrepared(false)}
            >
              <h3>Prepare your enquiry</h3>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    placeholder="Full name"
                    required
                    maxLength={100}
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email or phone
                  <input
                    name="contact"
                    placeholder="How can you be reached?"
                    required
                    maxLength={150}
                  />
                </label>
              </div>
              <label>
                I am interested in
                <select name="interest" defaultValue="" required>
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option>Working in Japan</option>
                  <option>Working in Thailand</option>
                  <option>Working in Malaysia</option>
                  <option>Recruiting workers / Employer partnership</option>
                  <option>General enquiry</option>
                </select>
              </label>
              <label>
                Your message
                <textarea
                  name="message"
                  placeholder="Tell us about your goals..."
                  rows={3}
                  required
                  maxLength={3000}
                />
              </label>
              <button className="button button-dark" type="submit">
                Open email enquiry <Arrow diagonal />
              </button>
              <p className="form-note" role="status">
                {emailPrepared
                  ? "Continue in your email app to review and send your enquiry. If it did not open, email soespn@gmail.com or call us directly."
                  : "Opens a draft in your email app addressed to soespn@gmail.com. Review and send it there to contact our team."}
              </p>
            </form>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-company">
            <Brand />
            <p>Overseas employment &amp; recruitment agency.<br />Established in 2000, Myanmar.</p>
          </div>
          <div className="footer-contact">
            <h2>Contact</h2>
            <a href="tel:+959770810058">09770810058</a>
            <a href="tel:+9595010209">095010209</a>
            <a href="mailto:soespn@gmail.com">soespn@gmail.com</a>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <h2>Company</h2>
            <a href="#about">About us</a>
            <a href="#accreditation">Accreditation</a>
            <a href="#team">Our team</a>
            <a href="#contact">Enquiries</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Shwe Pyi Nyein International Co., Ltd.
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
