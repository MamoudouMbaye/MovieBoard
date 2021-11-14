import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    timeout: 30000,
  });
const apiTMBD = {
    init: async () => {
        return instance.get("https://api.themoviedb.org/3").then((r) => r.data);
    },
    getMovieList: async (titleSeach) => {
        return instance.get("/search/movie?api_key=ad31b5e2c25101360f1a62dad5d2d4ad&language=fr-FR&query=" + titleSeach).then((r) => {return r.data});
    },
    getMovie: async (movieID) => {
        return instance.get("/movie/" + movieID + "?api_key=ad31b5e2c25101360f1a62dad5d2d4ad&language=fr-FR").then((r) => {return r.data});
    },
    getCredit: async (movieID) => {
        return instance.get("/movie/" + movieID + "/credits?api_key=ad31b5e2c25101360f1a62dad5d2d4ad").then((r) => {return r.data});
    },
    getRelated: async (movieID) => {
        return instance.get("/movie/" + movieID + "/similar?api_key=ad31b5e2c25101360f1a62dad5d2d4ad&language=fr-FR&page=1").then((r) => {return r.data});
    }
}

export default apiTMBD;