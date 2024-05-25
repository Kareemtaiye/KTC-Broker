import React, { useEffect, useState } from 'react';
import './Carousel.css';
import { GoDotFill } from 'react-icons/go'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPreviousSlide = () => {
        const isFirstSlide = currentIndex === 0
        const prevIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex)
    };

    const goToNextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    };

    const carouselStyle = {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${images[currentIndex].url})`
    }

    useEffect(() => {
        const intervalId = setInterval(goToNextSlide, 3000); // Change slide every 3 seconds (adjust as needed)
        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [currentIndex]);

    return (
        <div className="carousel">
            <div className="carousel-images"
                style={carouselStyle}
            >

            </div>
            <div className="carousel-button prev" onClick={goToPreviousSlide}>
                &#8592;
            </div>
            <div className="carousel-button next" onClick={goToNextSlide}>
                &#8594;
            </div>
            <div className='carouselDotsWrapper'>
                {images.map((image, imageIndex) => (
                    <div
                        key={imageIndex}
                        onClick={
                            ()=>{
                                setCurrentIndex(imageIndex)
                            }
                        }
                        className={currentIndex === imageIndex ? 'activeDot' : 'carouselDot'}>
                        {/* &#9899; */}
                        <GoDotFill className='' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
