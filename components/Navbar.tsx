import React from 'react'

const Navbar = ({ setTv, tv, search, setSearch, slides, active, setActive, searchMovies, loadMovies, loadTv, searchTv, navActive, setNavActive, playlists, setPlaylists, requestVideo, setRequestVideo, setSeason }: any) => {


    return (
        <div className='h-[10vh] w-[100vw] bg-black/20 flex'>
            <div
                style={{
                    background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,4,45,1) 69%, rgba(0,212,255,0) 100%)'
                }}
                className='w-full absolute h-[13vh]'>
            </div>
            <div className={`absolute inline-block my-3 p-2 px-5 left-[5vw] max-sm:px-1 max-sm:p-0.5 max-sm:my-2 ${navActive === 'gls' ? 'border-b-2 text-white' : 'text-gray-400'}`}>
                <button onClick={() => {
                    setPlaylists('PLo5HuYfoQCZ7rBBfRHqt6ASMLtYVtHSlL')
                    setActive(null);
                    setNavActive('gls')
                    setSeason(null);
                }} className={` text-2xl max-lg:text-xl max-md:text-lg max-sm:text-xs`}>Guest Lectures</button>
            </div>
            {/* <div className={`absolute inline-block my-3 p-2 px-5 left-[15vw] max-md:left-[20vw] max-sm:px-2 max-sm:p-0.5 max-sm:my-2 max-sm:left-[21vw] max-lg:left-[17vw] ${tv ? 'border-b-2 text-white' : 'text-gray-400'}`}>
                <button onClick={() => {
                    setActive(null);
                    setTv(true)
                }} className='text-2xl max-lg:text-xl max-md:text-lg max-sm:text-xs'>Technovanza</button>
            </div> */}
            <div className={`absolute inline-block my-3 p-2 px-5 left-[20vw] max-md:left-[20vw] max-sm:px-2 max-sm:p-0.5 max-sm:my-2 max-sm:left-[21vw] max-lg:left-[17vw] ${navActive === 'coc'  ? 'border-b-2 text-white' : 'text-gray-400'}`}>
                <button onClick={() => {
                     setPlaylists('PLJnQSU-Gw1Zwy_56WoAOGWBpYv1F7HLrp')
                    setActive(null);
                    setNavActive('coc');
                    setSeason(null);
                }} className='text-2xl max-lg:text-xl max-md:text-lg max-sm:text-xs'>CoC</button>
            </div>
            {/* <div className="absolute inline-block my-3 p-2 px-5 right-[3vw]">
                <div className='border relative w-[15vw] h-[5vh] max-sm:h-[3.5vh] max-sm:w-[22vw] rounded-full flex text-gray-200 max-md:h-[3.5vh] max-lg:h-[3.75vh] max-lg:w-[17vw]'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 max-lg:h-4 max-lg:w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <input onChange={(e) => {
                        e.preventDefault;
                        setSearch(e.target.value);
                        if (search === '') {
                            if (!tv) {
                                loadMovies();
                            } else {
                                loadTv();
                            }
                        } else {
                            if (!tv) {
                                searchMovies(search);
                            } else {
                                searchTv(search);
                            }
                        }
                    }} className='bg-transparent absolute max-sm:text-[10px] max-lg:text-sm max-lg:px-8 max-sm:px-7 w-full h-full outline-none px-10 text-white' placeholder={!tv ? `Search Movies` : `Search TV Shows`} />
                </div>
            </div> */}
            <button
              onClick={() => {
                setRequestVideo(true);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white absolute my-3 p-2 right-[3vw] bg-white/20 hover:bg-white/10 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center max-md:text-xs"
              type="button"
            >
              Request Video 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
}

export default Navbar