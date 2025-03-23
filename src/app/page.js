import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/images/gpu.png"
          alt="Next.js logo"
          width={480}
          height={438}
          priority
        />

        <h2 className={styles.headLine}>Потужність незламність в твоїй уяві</h2>

        <ul className={styles.list}>
          <li>
            <div><img src="/images/card1.jpg" alt="GPUa"/></div>
            <h3 className={styles.list_item_h}>Генеруюче курво</h3>
            <div className={styles.description}>
              <h4 className={styles.list_item_h4}>Потужність</h4>
              <span>300 попугаїв</span>
            </div>
          </li>
          <li>
            <div><img src="/images/card2.jpg" alt="GPUb"/></div>
            <h3 className={styles.list_item_h}>Генеруючий бобр</h3>
            <div className={styles.description}>
              <h4 className={styles.list_item_h4}>Потужність</h4>
              <span>300 попугаїв</span>
            </div>
          </li>
          <li>
            <div><img src="/images/card3.jpg" alt="GPUc"/></div>
            <h3 className={styles.list_item_h}>Генеруюче сяйво</h3>
            <div className={styles.description}>
              <h4 className={styles.list_item_h4}>Потужність</h4>
              <span>300 попугаїв</span>
            </div>
          </li>
          <li>
            <div><img src="/images/card4.jpg" alt="GPUd"/></div>
            <h3 className={styles.list_item_h}>Генеруюча тьма</h3>
            <div className={styles.description}>
              <h4 className={styles.list_item_h4}>Потужність</h4>
              <span>300 попугаїв</span>
            </div>
          </li>
        </ul>



      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
