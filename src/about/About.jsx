import React from "react";
import "./About.css";
import aboutPics2 from "./images/aboutSec3.jpg";

const About = () => {
  return (
    <div className="MainContainerAbout">
      <section className="section1About">
        <h1 className="aboutTxtMobil">About Us</h1>
        <p className="aboutTxtMobil">
          Alpha Forex stands as a prominent global asset manager, renowned for
          its
          <br className="TextBtreaker1" />
          steadfast and enduring strategy rooted in conviction guides our
          investment approach for the long term.
        </p>
      </section>
      <section className="section2About">
        <h1 className="aboutTxtMobil">Our operations involve.</h1>
        <h5 className="aboutTxtMobil">
          For further details about our company.
        </h5>
        <p className="aboutTxtMobil">
          Investing in cryptocurrency assets by accessing accomplished and
          prosperous cryptocurrency entities worldwide.{" "}
          <br className="TextBtreaker1" />
          Our hedge funds utilize the expertise of over 4,520 employees at every
          stage. <br className="TextBtreaker1" />
          harnessing our state-of-the-art technology to propel you to the
          forefront and gain a competitive edge.{" "}
          <br className="TextBtreaker1" />
          Enable you to remain concentrated on your core tasks.
        </p>
      </section>
      <section className="section3About">
        <div className="sec3AboutLeftSide">
          <h1 className="aboutTxtMobil">Our area of expertise involves</h1>
          <p className="aboutTxtMobil">
            We specialize in investing in cryptocurrency blockchain assets,
            offering investors a centralized platform to access a diversified
            portfolio of crypto assets aimed at achieving optimal risk-adjusted
            returns in cryptocurrency investing. Our array of active investment
            strategies spans across four key areas: equities, fixed income,
            multi-asset, and alternatives. Our proficiency extends across
            developed and emerging markets, encompassing both public and private
            markets.
          </p>
          <p className="aboutTxtMobil">
            We are a group of seasoned and deeply committed entrepreneurs who
            have established and managed more than 60 top-tier internet
            enterprises worldwide. Our approach to company development and
            investment is marked by a strong sense of discipline. We are adept
            at efficiently nurturing companies to maturity. Our firm conviction
            lies in the belief that value creation stems from a relentless
            commitment to execution, operational prowess, and ongoing
            innovation.
          </p>
          <p className="aboutTxtMobil">
            The day-to-day investment operations and collaboration with external
            capital managers are overseen by our investment team. Comprising
            seasoned portfolio managers and analysts, this team ensures the
            smooth functioning of our investment activities. Additionally, our
            investment endeavors are closely monitored by a dedicated risk
            management team. Their reports on activities are conveyed to both
            the executive management board and the board of directors.
          </p>
        </div>
        <div className="sec3AboutRightSide">
          <div className="aboutPics2Container">
            <img src={aboutPics2} alt="" />
          </div>
          <h3 className="aboutTxtMobil">
            More than 500,000 clients worldwide place their trust in us.
          </h3>
          <p className="aboutTxtMobil">
            If you seek an investment firm to oversee your hard-earned assets,
            allowing you to savor your retirement or prioritize other aspects of
            life, you've found the ideal destination. As a global investment
            firm, we collaborate diligently to foster enduring value for our
            investors, companies, shareholders, individuals, and communities.
            Harnessing our collective expertise across all sectors of our
            operations, we strive to provide optimal solutions for our investors
            and partners.
          </p>
          <p className="aboutTxtMobil">
            We are ethical individuals generating respectable returns through
            ethical means. At the core of our mission is a fervent dedication to
            building businesses ethically. Utilizing our proprietary research,
            we pinpoint investment themes aligned with our clients' shifting
            preferences and interests, while capitalizing on emerging trends.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
