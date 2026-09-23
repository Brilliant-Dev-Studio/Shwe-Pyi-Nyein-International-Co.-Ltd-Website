import Image from "next/image";
import styles from "./organization-chart.module.css";

const leadership = [
  { name: "Mr. Soe Myint Aung", role: "Chairman (Founder)", photo: "soe-myint-aung" },
  { name: "Ms. Ei Phyu Soe", role: "Managing Director", photo: "ei-phyu-soe" },
  { name: "Mr. Lin Thet Oo", role: "Director", photo: "lin-thet-oo" },
];

const team = [
  { name: "Mr. Thant Zin Oo", role: "Senior Admin Executive", photo: "thant-zin-oo" },
  { name: "Mr. Swan Htet Aung", role: "Admin Assistant", photo: "swan-htet-aung" },
  { name: "Mr. Kaung Min Hein", role: "Office Staff", photo: "kaung-min-hein" },
  { name: "Mr. Zaw Naing Oo", role: "Operation Coordinator", photo: "zaw-naing-oo", location: "Thailand" },
  { name: "Ms. Aye Aye Khaing", role: "Operation Coordinator", photo: "aye-aye-khaing", location: "Thailand" },
];

function Person({ person }: { person: (typeof team)[number] }) {
  return (
    <article className={styles.person}>
      <Image
        src={`/team/${person.photo}.webp`}
        alt={person.name}
        width={160}
        height={200}
        sizes="(max-width: 700px) 72px, 112px"
        className={styles.portrait}
      />
      <div>
        <h4>{person.name}</h4>
        <p>{person.role}</p>
        {person.location && <span className={styles.location}>{person.location}</span>}
      </div>
    </article>
  );
}

export default function OrganizationChart() {
  return (
    <div id="organization-chart" className={`${styles.chart} reveal`} aria-labelledby="organization-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Our organization</p>
          <h3 id="organization-title">The people behind <em>every journey.</em></h3>
        </div>
        <p className={styles.intro}>Working together across leadership, administration, and overseas operations.</p>
      </div>
      <div className={styles.structure}>
        <ol className={styles.leadership} aria-label="Leadership, from chairman to director">
          {leadership.map((person) => (
            <li key={person.photo}><Person person={person} /></li>
          ))}
        </ol>
        <div className={styles.teamBranch}>
          <p className={styles.teamLabel}>Administration &amp; operations <span>Reporting to the Director</span></p>
          <ul className={styles.team} aria-label="Team reporting to the Director">
            {team.map((person) => (
              <li key={person.photo}><Person person={person} /></li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.document}>
        <div className={styles.documentTitle}>
          <span className={styles.pdfBadge}>PDF</span>
          <div><strong>Organizational chart</strong><p>View or keep a copy of our team structure.</p></div>
        </div>
        <div className={styles.actions}>
          <a href="/Organizational%20Chart.pdf" target="_blank" rel="noopener noreferrer">View PDF <span className={styles.newTab}>(new tab)</span><span aria-hidden="true">&#8599;</span></a>
          <a href="/Organizational%20Chart.pdf" download="SPN-Organizational-Chart.pdf" className={styles.download}>Download <span aria-hidden="true">&darr;</span></a>
        </div>
      </div>
    </div>
  );
}
