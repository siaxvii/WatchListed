export interface Show {
    id:                  number;
    name:                string;
    overview:            string;
    genres:            string[];
    numseason:           number;
    numepisodes:         number;
    firstaired:            Date;
    lastaired:             Date;
    networks:          string[];
    votecount:           number;
    rating:              number;
    languages:         string[];
    popularity:          number;
    backgroundpath:      string;
    weightedrating:      number;
    watchlistedrating:   number;
}