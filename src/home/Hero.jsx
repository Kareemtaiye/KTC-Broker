import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import earth from "./images/earth.png";
import "./hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const Context = [
    {
      id: 1,
      //   image: First,
      HeadText: "CITADEL INVESTMENT",
      HeadText2: "EFFICIENT AND RELIABLE",
      SubHeaderText:
        "24/7 live support, our support channels are available anytime everyday",
    },
    {
      id: 2,
      //   image: Second,
      HeadText: "CITADEL INVESTMENT CORE",
      HeadText2: "EASY WAY TO TRADE",
      SubHeaderText:
        "Trade in the most popular currencies of your choice; USD,GBD, AUD, BTC, CNY, EUR, CAD",
    },
    {
      id: 3,
      //   image: Third,
      HeadText: "THE MOST SECURE",
      HeadText2: "TRADING PLATFORM",
      SubHeaderText: "Profitable investments when you trade and invest with us",
    },
  ];

  const totalSlides = Context.length;

  const splitLastWord = (text) => {
    const words = text.split(" ");
    const lastWord = words.pop();
    const initialText = words.join(" ");
    return { initialText, lastWord };
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % Context.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [Context.length]);

  return (
    <div className="hero_section">
      <div className="the_hero">
        {/* <img src={Context[currentSlide].image} alt={Context[currentSlide].HeadText} className='w-full h-full object-cover' /> */}
        <div className="hero_writeup">
          <div className="hero_writeup_text">
            <motion.div
              className="hero_writeup_img"
              initial={{
                opacity: 0,
                y: "110vh",
              }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 10,
                mass: 1,
                duration: 5,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              // viewport={{ margin: "-40px" }}
            >
              <motion.img
                src={earth}
                alt="mobilePhone"
                className="earth_img"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.img>
            </motion.div>
            {(() => {
              const { initialText, lastWord } = splitLastWord(
                Context[currentSlide].HeadText
              );
              return (
                <h1>
                  {initialText}{" "}
                  <span style={{ color: "#fdc500" }}>{lastWord}</span>
                </h1>
              );
            })()}
            {(() => {
              const { initialText, lastWord } = splitLastWord(
                Context[currentSlide].HeadText2
              );
              return (
                <h1>
                  <span style={{ color: "#fdc500" }}>{initialText}</span>{" "}
                  {lastWord}
                </h1>
              );
            })()}
            <p>{Context[currentSlide].SubHeaderText}</p>
            <div className="button_part">
              <button className="get_started_btn">Invest Now</button>
            </div>
            <div className="counter-container">
              <div className="counter">
                <div>
                  <CountUp start={0} end={7} delay={3} duration={5} />+
                </div>
                <p className="counter-detail"> Years of Service</p>
              </div>
              <div className="counter">
                <div>
                  <CountUp start={0} end={12} delay={3} duration={5} />M{" "}
                </div>
                <p className="counter-detail"> Global Investors</p>
              </div>
              <div className="counter">
                <div>
                  <CountUp start={0} end={95} delay={3} duration={5} />%
                </div>
                <p className="counter-detail"> Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={prevSlide} className="prev_btn">
          &#10094;
        </button>
        <button onClick={nextSlide} className="next_btn">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Hero;
