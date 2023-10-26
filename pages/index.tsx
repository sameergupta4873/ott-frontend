import Head from "next/head";
import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Navbar from "../components/Navbar";
import movies from "../data/movie";
import tvshows from "../data/tvshows";
import fetchTopRatedMovies, {
  fetchSearchResults,
  fetchSearchTVResults,
  fetchTopRatedTv,
  fetchTopTvDetail,
  getTechnoVideos,
} from "./api/imdb";

interface MovieDetails {
  id: number;
  imdbId: string;
  title: string;
  plot: string;
  duration: string;
  releaseDate: string;
  posterUrl: string;
  backDropUrl: string;
  rating: number;
  overview: string;
}

interface TvDetails {
  id: number;
  imdbId: string;
  title: string;
  plot: string;
  duration: string;
  releaseDate: string;
  posterUrl: string;
  backDropUrl: string;
  rating: number;
  overview: string;
}

const gls = [
    
  {
    playlist: "PLo5HuYfoQCZ7rBBfRHqt6ASMLtYVtHSlL",
    date: "2022-23"
  },
  {
    playlist: "PLo5HuYfoQCZ6HCGEf8WuHGphbDahbWNgw",
    date: "2020-21"
  },
  {
    playlist: "PLo5HuYfoQCZ5bw1s6gn2stDKryz-KsyMH",
    date: "2019-20"
  },
  {
    playlist: "PLo5HuYfoQCZ6WuKz-_Mb9GH3kLJP_d47s&si=rmShBzVoCM6XHV_L",
    date: "2018-19"
  },
  {
    playlist: "PLo5HuYfoQCZ5OTW1A_p4OjLBeoQ-qRJDt",
    date: "2017-18"
  }
]

const coc = [
  {
    playlist: "PLJnQSU-Gw1Zwy_56WoAOGWBpYv1F7HLrp",
    name: "DSA Series 2023"
  },
  {
    playlist: "PLJnQSU-Gw1Zw9VNq8ssnT1bfelGbnI0IF",
    name: "Inheritance 2022"
  },
  {
    playlist: "PLJnQSU-Gw1Zzb1djrCtU686LisbU5bbu1",
    name: "code_start 2022"
  },
  {
    playlist: "PLJnQSU-Gw1ZzmltykQ5AG1Xi-sz9Jkmb3",
    name: "DSA + CP 2022"
  },
  {
    playlist: "PLJnQSU-Gw1Zx1N6IRFDSSkpCQvt-tifRg",
    name: "Inheritance 2020"
  }
]

export default function Home() {
  const [tv, setTv] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [tvShows, setTvShows] = useState<TvDetails[]>([]);
  const [navActive, setNavActive] = React.useState("gls");
  const [active, setActive] = React.useState(null);
  const [playlists, setPlaylists] = React.useState<any>('PLo5HuYfoQCZ7rBBfRHqt6ASMLtYVtHSlL');
  const [details, setDetails]: any = React.useState(gls);
  const [showDeatils, setShowDetails] = React.useState(false);
  const [season, setSeason] = React.useState("2022-23");
  const [showSeason, setShowSeason] = React.useState(false);
  const [episode, setEpisode] = React.useState(1);
  const [showEpisode, setShowEpisode] = React.useState(false);
  const [requestVideo, setRequestVideo] = React.useState(false);

  const searchMovies = async (query: string) => {
    const searchQueryMovie = await fetchSearchResults(query);
    setMovies(searchQueryMovie);
  };

  const searchTv = async (query: string) => {
    const searchQueryTv = await fetchSearchTVResults(query);
    setTvShows(searchQueryTv);
  };

  const fetchDetails = async (id: number) => {
    const new_data: any = await fetchTopTvDetail(id);
    setDetails(new_data);
  };

  const [slides,setSlides] = useState<any>([]);
  const loadMovies = async () => {
    const topRatedMovies = await fetchTopRatedMovies();
    setMovies(topRatedMovies);
  };

  const loadTv = async () => {
    const topRatedTv = await fetchTopRatedTv();
    setTvShows(topRatedTv);
  };

  const fetchTechnovanza = async () => {
    const videos: any = await getTechnoVideos(playlists);
    setSlides(videos);

    
  }



  useEffect(() => {
    fetchTechnovanza();
  }, [playlists, season]);

  useEffect(() => {
    if(slides[0]){
      setActive(slides[0].id as any);
    }
  }, [slides]);

  // useEffect(() => {
  //   if (search === "" && movies.length === 0) {
  //     loadMovies();
  //   }

  //   if (tv && search === "" && tvShows.length === 0) {
  //     loadTv();
  //   }
  //   if (
  //     slides.filter((slide) => slide.id === active).length === 0 &&
  //     slides[0]
  //   ) {
  //     setActive(slides[0].id as any);
  //   }

  //   if (slides[0] && !active && search === "") {
  //     setActive(slides[0].id as any);
  //     if (tv) {
  //       fetchDetails(slides[0].id);
  //       setSeason(1);
  //       setEpisode(1);
  //     }
  //   }
  // }, [active, search, slides, tv, movies]);

  useEffect(() => {
    setDetails(navActive === 'gls' ? gls : coc);
  }, [navActive]);

  console.log(slides);
  

  return (
    <React.Fragment>
      <Head>
        <title>Free OTT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[100vh] w-[100vw]">
        {/* {!isPlaying && <iframe
          className={`absolute object-cover h-[100vh] w-[80vw] max-sm:ml-[0vw] max-sm:w-[100vw] max-sm:h-[30vh] max-sm:top-[7vh] ${tv ? 'ml-[0vw]' : 'ml-[20vw]'}`}
          src={`https://www.youtube.com/embed/${slides.filter((slide) => slide.id === active).map((slide) => slide.trailer)}?&controls=0&mute=0&rel=0&autoplay=1`}
          frameBorder={0}
          allow='autoplay'
        ></iframe>} */}
        {
          <img
            alt="hero-image"
            className={`absolute object-cover h-[100vh] w-[80vw] max-sm:ml-[0vw] max-sm:w-[100vw] ${
              tv ? "ml-[0vw]" : "ml-[20vw]"
            }`}
            src={`https://i.ytimg.com/vi/${slides
              .filter((slide:any) => slide.id === active)
              .map((slide:any) => slide.id)}/maxresdefault.jpg`}
          ></img>
        }
        <div
          style={{
            background: `linear-gradient(${
              tv ? "-90deg" : "90deg"
            }, rgba(2,0,36,1) 0%, rgba(0,4,45,1) 31%, rgba(0,212,255,0) 100%)`,
          }}
          className="absolute max-sm:hidden h-[100vh] w-[100vw] max-sm:h-[107vh] max-sm:bg-gradient-to-t max-sm:from-[#00042d]"
        ></div>
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,4,45,1) 69%, rgba(0,212,255,0) 100%)",
          }}
          className="absolute hidden max-sm:block h-[100vh] w-[100vw] max-sm:h-[107vh] max-sm:bg-gradient-to-t max-sm:from-[#00042d]"
        ></div>
        <Navbar
          loadMovies={loadMovies}
          searchMovies={searchMovies}
          loadTv={loadTv}
          searchTv={searchTv}
          setTv={setTv}
          tv={tv}
          search={search}
          setSearch={setSearch}
          slides={slides}
          active={active}
          setActive={setActive}
          navActive={navActive}
          setNavActive={setNavActive}
          playlists={playlists}
          setPlaylists={setPlaylists}
          requestVideo={requestVideo}
          setRequestVideo={setRequestVideo}
        />
        <div className="h-[53vh] relative max-md:h-[50vh] max-sm:mt-[15vh] max-sm:h-[58vh]">
          <div
            className={`w-[45vw] h-[50vh] absolute bottom-0 px-16 py-5 text-white max-md:w-[50vw] max-sm:w-[100vw] max-sm:px-10 ${
              tv ? `right-[0vw] pr-5` : ""
            }`}
          >
            <h1 className="lg:text-4xl max-md:text-2xl max-sm:text-lg">
              {slides && slides
                .filter((slide: any) => slide.id === active)
                .map((slide: any) => slide.title)}
            </h1>
            <div className="lg:py-3 max-md:py-1">
              {/* <span className="lg:text-xl max-md:text-lg sm:text-sm text-red-900 px-1 max-md:px-0.5">
                {slides && slides
                  .filter((slide: any) => slide.id === active)
                  .map((slide: any) => slide.publishedAt)}
              </span>
              <span className="lg:text-xl max-md:text-lg sm:text-sm px-1 max-md:px-0.5">
                |
              </span> */}
              <span className="lg:text-xl max-md:text-lg sm:text-sm px-1 max-md:px-0.5">
                Duration
                {slides && slides
                  .filter((slide: any) => slide.id === active)
                  .map((slide: any) => (" "+slide.length))}
              </span>
            </div>
            <p className="lg:text-lg max-md:text-lg sm:text-sm py-2 max-md:py-2 max-sm:py-3 max-sm:text-xs">
              {slides && slides
                .filter((slide: any) => slide.id === active)
                .map((slide: any) => slide.description)}
            </p>
            <div className="flex mt-2 max-md:mt-1 max-sm:mt-3 max-xl:mt-0">
              <div className="mr-5">
                <PrimaryButton
                  text={"Play Now"}
                  setIsPlaying={setIsPlaying}
                  fetchDetails={fetchDetails}
                  active={active}
                  tv={tv}
                  setShowDetails={setShowDetails}
                />
              </div>
              <div className="mt-1 mr-5">
            <button
              onClick={() => setShowSeason(!showSeason)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-white/20 hover:bg-white/10 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center max-md:text-xs"
              type="button"
            >
              {navActive === 'gls' ? `GLS 2022-23` :  `${coc[0].name}` } 
              <svg
                className="w-4 h-4 ml-2 max-md:h-3 max-md:w-3 max-md:ml-1"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showSeason && (
              <div
                id="dropdown"
                className="z-50 mt-2 absolute bg-gray-600 text-white divide-y divide-gray-100 rounded-lg shadow max-h-[40vh] overflow-y-scroll scrollbar-hide"
              >
                <ul
                  className="py-2 text-sm"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {details?.map((season: any, id: any) => {
                    return (
                      <li key={id}>
                        <span
                          onClick={() => {
                            setSeason(season.date);
                            setShowSeason(!showSeason);
                            setPlaylists(season.playlist);
                          }}
                          className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {navActive === 'gls' ? `GLS ${season.date}` :  `${season.name}` }
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
              {/* {tv && details && (
                <div className="flex">
                  <div className="mt-1 mr-5">
                    <button
                      onClick={() => setShowSeason(!showSeason)}
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="text-white bg-white/20 hover:bg-white/10 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center max-md:text-xs"
                      type="button"
                    >
                      Season {season}
                      <svg
                        className="w-4 h-4 ml-2 max-md:h-3 max-md:w-3 max-md:ml-1"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {showSeason && (
                      <div
                        id="dropdown"
                        className="z-50 mt-2 absolute bg-gray-600 text-white divide-y divide-gray-100 rounded-lg shadow max-h-[40vh] overflow-y-scroll scrollbar-hide"
                      >
                        <ul
                          className="py-2 text-sm"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          {details.seasons.map((season: any, id: any) => {
                            return (
                              <li key={id}>
                                <span
                                  onClick={() => {
                                    setSeason(id + 1);
                                    setEpisode(1);
                                    setShowSeason(!showSeason);
                                  }}
                                  className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                >
                                  Seasons {id + 1}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <button
                      onClick={() => setShowEpisode(!showEpisode)}
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="text-white bg-white/20 hover:bg-white/10 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center max-md:text-xs"
                      type="button"
                    >
                      Episode {episode}
                      <svg
                        className="w-4 h-4 ml-2 max-md:h-3 max-md:w-3 max-md:ml-1"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {showEpisode && (
                      <div
                        id="dropdown"
                        className="z-50 mt-2 absolute bg-gray-600 text-white divide-y divide-gray-100 rounded-lg shadow h-[40vh] overflow-y-scroll scrollbar-hide"
                      >
                        <ul
                          className="py-2 text-sm"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          {Array(details.seasons[season - 1].episode_count)
                            .fill(0)
                            .map((_, id) => {
                              return (
                                <li key={id}>
                                  <span
                                    onClick={() => {
                                      setShowEpisode(false);
                                      setEpisode(id + 1);
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-700"
                                  >
                                    Episode {id + 1}
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,4,45,1) 69%, rgba(0,212,255,0) 100%)",
          }}
          className="w-[100vw] absolute h-[10vh] bottom-[-1rem]"
        ></div>
        <div className="w-[92vw] mx-auto max-md:w-[95vw] max-md:mt-20 max-sm:mt-0 max-sm:h-[5vh]">
          <Carousel
            setIsPlaying={setIsPlaying}
            setActive={setActive}
            slides={slides}
            active={active}
            tv={tv}
            setDetails={setDetails}
            fetchDetails={fetchDetails}
            setShowDetails={setShowDetails}
            setSeason={setSeason}
            setEpisode={setEpisode}
          />
        </div>
        {isPlaying && (
          <div className="top-0 absolute h-full w-full z-40">
            <span
              onClick={() => setIsPlaying(false)}
              className="absolute top-5 right-5 text-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            {/* <iframe
              allowFullScreen={true}
              className="h-full w-full bg-black/75"
              src={
                !tv
                  ? `https://www.2embed.cc/embed/${slides
                      .filter((slide) => slide.id === active)
                      .map((slide) => slide.id)}`
                  : `https://www.2embed.cc/embed/${slides
                      .filter((slide) => slide.id === active)
                      .map((slide) => slide.id)}&s=${season}&e=${episode}`
              }
            /> */}
            <iframe allowFullScreen={true} className="h-full w-full bg-black/75"  src={`https://www.youtube.com/embed/${slides
                      .filter((slide:any) => slide.id === active)
                      .map((slide:any) => slide.id)}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        )}
        { requestVideo && <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-[100vw] bg-black bg-opacity-75 flex justify-center items-center'>

        <svg onClick={()=>{
          setRequestVideo(false);
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-9 h-9 absolute top-6 right-10 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
        <form className="bg-[#010024] min-w-[40vw] p-10 rounded-lg">
                  <ContactInputBox
                    type="text"
                    name="name"
                    placeholder="Your Name"
                  />
                  <ContactInputBox
                    type="text"
                    name="email"
                    placeholder="Your Email"
                  />
                  <ContactInputBox
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                  />
                  <ContactTextArea
                    row="6"
                    placeholder="Your Message"
                    name="details"
                    defaultValue=""
                  />
                  <div>
                    <button
                      type="submit"
                      className="w-full p-3 text-white transition border rounded border-primary bg-primary hover:bg-opacity-90"
                    >
                      Send Message
                    </button>
                  </div>
                </form>

          </div>}
      </main>
    </React.Fragment>
  );
}

const ContactTextArea = ({ row, placeholder, name, defaultValue }:any) => {
  return (
    <>
      <div className="mb-6">
        <textarea
          rows={row}
          placeholder={placeholder}
          name={name}
          className="border-[f0f0f0] w-full resize-none rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none opacity-75"
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};


const ContactInputBox = ({ type, placeholder, name }: any) => {
  return (
    <>
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none opacity-75"
        />
      </div>
    </>
  );
};