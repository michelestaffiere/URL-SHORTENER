import React from "react";
import styles from "../Styles/features.module.css";

function Features() {
  return (
    <section className={styles.callToAction}>
      <div className={styles.wrapper}>
        <div className={styles.sectionHeading}>
          <h2>Advanced Statistics</h2>
          <p>
            Track how your links are performing across the web with our advacned
            statistics dashboard
          </p>
        </div>
        <hr></hr>
        <div className={styles.container}>
          <div className={styles.feature}>
            <div>
              <img src="images/icon-brand-recognition.svg" alt="" />
            </div>
            <h3>Brand Recognition</h3>
            <p>
              Boost your brand recognition with each click. Generic links don't
              mean a thing. Branded links help instil confidence in your content
            </p>
          </div>
          <div className={styles.feature}>
            <div>
              <img src="/images/icon-detailed-records.svg" alt="" />
            </div>
            <h3> Detailed Records</h3>
            <p>
              Gain insights into who is clicking your links.Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
          <div className={styles.feature}>
            <div>
              <img src="/images/icon-fully-customizable.svg" alt="" />
            </div>
            <h3>Fully Customizable</h3>
            <p>
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
