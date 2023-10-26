import axios from 'axios';

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

interface TvShowDetails {
    homepage: string;
    created_by: { id: number; name: string; profile_path: string }[];
    seasons: {
        id: number;
        name: string;
        overview: string;
        season_number: number;
        episode_count: number;
        poster_path: string;
        air_date: string;
    }[];
};


const TMDB_API_KEY = '021258164370b5afa5eb62d29f3e3aa6';

if (!TMDB_API_KEY) {
    console.error('TMDb API key is missing');
    process.exit(1);
}

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const getImageUrl =  (path: string | null, size: string): string | null => {
    if(!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchTopRatedMovies = async (): Promise<MovieDetails[]> => {
    try {
        let movies: any = [];
        for (let i = 1; i <= 2; i++) {
            const url = `${TMDB_API_BASE_URL}/movie/popular`;
            const response = await axios.get(url, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: i,
                    region: 'US'
                },
            });
            const data = response.data;

            const MovieDetail = data.results.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                duration: `${movie.runtime} min`,
                releaseDate: movie.release_date,
                imdbId: movie.imdb_id,
                posterUrl: getImageUrl(movie.poster_path, 'w500'),
                backDropUrl: getImageUrl(movie.backdrop_path, 'original'),
                rating: movie.vote_average
            }));
            movies = [...movies, ...MovieDetail];
        }
        return movies;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchTopRatedTv = async (): Promise<TvDetails[]> => {
    try {
        let tvShows: any = [];
        for (let i = 1; i <= 2; i++) {
            const url = `${TMDB_API_BASE_URL}/tv/top_rated`;
            const response = await axios.get(url, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'en-US',
                    page: i,
                    region: 'US'
                },
            });
            const data = response.data;


            const MovieDetail = data.results.map((movie: any) => ({
                id: movie.id,
                title: movie.name,
                overview: movie.overview,
                duration: `${movie.runtime} min`,
                releaseDate: movie.first_air_date,
                imdbId: movie.imdb_id,
                posterUrl: getImageUrl(movie.poster_path, 'w500'),
                backDropUrl: getImageUrl(movie.backdrop_path, 'original'),
                rating: movie.vote_average
            }));
            tvShows = [...tvShows, ...MovieDetail];
        }
        return tvShows;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchTopTvDetail = async (id: number) => {
    try {
        const response = await axios.get<TvShowDetails>(
            `${TMDB_API_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchSearchResults = async (search: string) => {
    try {
        const url = `${TMDB_API_BASE_URL}/search/movie`;
        const response = await axios.get(url, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                region: 'US',
                query: search
            },
        });
        const data = response.data;
        const MovieDetail = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            duration: `${movie.runtime} min`,
            releaseDate: movie.release_date,
            imdbId: movie.imdb_id,
            posterUrl: getImageUrl(movie.poster_path, 'w500'),
            backDropUrl: getImageUrl(movie.backdrop_path, 'original'),
            rating: movie.vote_average
        }));
        
        return MovieDetail;
        
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchSearchTVResults = async (search: string) => {
    try {
        const url = `${TMDB_API_BASE_URL}/search/tv`;
        const response = await axios.get(url, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                region: 'US',
                query: search
            },
        });
        const data = response.data;
        console.log(data);
        
        const MovieDetail = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.name,
            overview: movie.overview,
            duration: `${movie.runtime} min`,
            releaseDate: movie.first_air_date,
            imdbId: movie.imdb_id,
            posterUrl: getImageUrl(movie.poster_path, 'w500'),
            backDropUrl: getImageUrl(movie.backdrop_path, 'original'),
            rating: movie.vote_average
        }));
        return MovieDetail;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getTechnoVideos = async (playlist: any) => {
    try {
        const url = `https://youtube-v3-alternative.p.rapidapi.com/playlist`
        const response = await axios.get(url, {
            params: {
                id: playlist,
            },
            headers: {
                'x-rapidapi-key': '3df8f0f7cbmsh8fabfbdfa8ca9ccp1b6a3fjsnf69f35f83373',
                'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'
            }
        })
        const data = response.data;
        const videos = data.data.map((video: any) => ({
            id: video.videoId,
            title: video.title,
            description: video.videoInfo,
            thumbnail: video.thumbnail[0],
            largeThumbnail: video.thumbnail[3],
            richThumbnail: video.richThumbnail?.length > 0 ? video.richThumbnail[0] : null,
            publishedAt: video.publishedText,
            length: video.lengthText,
            viewCount: video.viewCount,

        }))
        console.log(videos);
        return videos;
        

    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchTopRatedMovies;
