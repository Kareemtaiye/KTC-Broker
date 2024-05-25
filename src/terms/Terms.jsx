import React from "react";
import "./Terms.css";
import TermsArticle from "../components/TermsArticle";
// import articleDetail from "../components/articleDetails";
import {
  agreementText,
  copyRightText,
  trademarksText,
  hyperlinksText,
  correctionText,
  governingText,
  privacyText,
  multipleText,
  generalText,
} from "../components/articleDetails";

const Terms = () => {
  return (
    <main className='main'>
      <section className='header'>
        <div className='container'>
          <div className='header-content'>
            <h1 className='primary-detail '>Website terms and conditions</h1>
            <p className='details'>
             
"This website, Citadel Investment, and its contents ("Website") are the exclusive property of Citadel Investment ("Citadel Investment" ®), headquartered at Sheaf Street, Sheffield City Centre, Sheffield S1 2BJ, United Kingdom. Your use of this Website is governed by the following Terms and Conditions ("Terms"). Please review these Terms carefully before accessing or using the Website."
            </p>
          </div>
        </div>
      </section>

      <section className='main-content'>
        <div className='container'>
          <div className='main-content-container'>
            <TermsArticle
              articleName={"Agreement"}
              articleText={agreementText}
            />
            <TermsArticle
              articleName={"Copyright © Ownership"}
              articleText={copyRightText}
            />
            <TermsArticle
              articleName={"Trademarks"}
              articleText={trademarksText}
            />
            <TermsArticle
              articleName={"Hyperlinks"}
              articleText={hyperlinksText}
            />
            <TermsArticle
              articleName={"Correction of Errors"}
              articleText={correctionText}
            />
            <TermsArticle
              articleName={"Governing Law"}
              articleText={governingText}
            />
            <TermsArticle articleName={"Privacy"} articleText={privacyText} />
            <TermsArticle
              articleName={"Multiple Account / Referral cheat"}
              articleText={multipleText}
            />
            <TermsArticle articleName={"General"} articleText={generalText} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
