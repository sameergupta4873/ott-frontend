import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function Carousel({ setActive, slides, fetchDetails, active, tv, setShowDetails, setSeason, setEpisode }: any) {
    console.log(slides);
    

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center w-full h-full py-24 sm:py-4 px-1 pl-5">
                {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden"

                    naturalSlideHeight={100}
                    naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={slides ? slides.length : 0} visibleSlides={4} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-[-7vh] focus:outline-none cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 max-md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    {slides && slides.map((slide: any, key: any) => {
                                        return (
                                            <Slide onClick={() => {
                                                // setDetails(null);
                                                setActive(slide.id);
                                            }}
                                                key={key} index={slide.id}
                                                className="cursor-pointer rounded-xl"
                                            >
                                                <div className="flex flex-shrink-0 relative w-full sm:w-auto hover:scale-[110%] rounded-xl transition-all duration-200 group">
                                                    <img src={`https://i.ytimg.com/vi/${slide.id}/hqdefault.jpg`} alt="black chair and white table" className="object-cover 
                                                rounded-xl shadow-2xl object-center w-full h-[30vh]" />
                                                    <div className="rounded-xl absolute w-full h-full p-6">
                                                        <div className="flex items-end absolute bottom-[-100%] group-hover:bottom-0 transition-all ease-in-out duration-200 left-0 px-6 py-7 w-full"
                                                            style={{
                                                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 69%, rgba(0,212,255,0) 100%)'
                                                            }}
                                                        >
                                                            <h3 className="text-xs lg:text-md font-semibold leading-5 lg:leading-6 text-white"
                                                            >{slide.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}

                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-[-4vh]" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider naturalSlideHeight={100} className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={slides ? slides.length : 0} visibleSlides={4} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-[-3.5vw] cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-[90vw] h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    {slides && slides.map((slide: any, key: any) => {
                                        return (
                                            <Slide key={key} index={slide.id}
                                                onClick={() => {
                                                    // setDetails(null);
                                                    setActive(slide.id);
                                                    if (tv) {
                                                        fetchDetails(slide.id);
                                                        setShowDetails(true);
                                                        setSeason(1);
                                                        setEpisode(1);
                                                    }
                                                }}
                                            >
                                                <div className="flex flex-shrink-0 relative w-full rounded-xl sm:w-auto hover:scale-[120%] ease-in-out duration-200">
                                                    <img src={slide.posterUrl} alt="black chair and white table" className="object-cover h-[25vh] object-center w-full rounded-xl" />
                                                    <div className="rounded-xl absolute w-full h-full p-6">
                                                        <div className="flex items-end absolute bottom-[-100%] group-hover:bottom-0 transition-all ease-in-out duration-200 left-0 px-6 py-7 w-full"
                                                            style={{
                                                                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 69%, rgba(0,212,255,0) 100%)'
                                                            }}
                                                        >
                                                            <h3 className="text-xs lg:text-md font-semibold leading-5 lg:leading-6 text-white"
                                                            >{slide.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-[-2vw]" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider naturalSlideHeight={100} className="block md:hidden max-sm:absolute max-sm:bottom-[-10vw] max-sm:px-5" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={slides ? slides.length : 7} visibleSlides={1} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-[-10vw] focus:outline-none cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-[60vw] mr-10 h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                    {slides && slides.map((slide: any, id: any) => {
                                        return (
                                            <Slide key={id} index={slide.id}
                                                onClick={() => {
                                                    // setDetails(null);
                                                    setActive(slide.id);
                                                    if (tv) {
                                                        fetchDetails(slide.id);
                                                        setShowDetails(true);
                                                        setSeason(1);
                                                        setEpisode(1);
                                                    }
                                                }}
                                            >
                                                <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                                                    <img src={slide.posterUrl} alt="black chair and white table" className="object-cover object-center w-[100vw] max-sm:h-[35vh]" />
                                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                                        <div className="flex h-full items-end pb-2">
                                                            <h3 className="text-lg lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">{slide.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-[-2vw] focus:outline-none" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        </div>
    );
}
