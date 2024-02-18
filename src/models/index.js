const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");
//muchos pelisculas muchos actores
Movie.belongsToMany(Actor, {through:'MoviesActors'})
Actor.belongsToMany(Movie, {through: 'MoviesActors'})
//muchas peliculas y muchos directores
Movie.belongsToMany(Director, {through: 'MoviesDirectors'})
Director.belongsToMany(Movie, {through: 'MoviesDirectors'})
//muchas peliculas y muchos generos
Movie.belongsToMany(Genre, {through: 'MoviesGenres'})
Genre.belongsToMany(Movie, {through: 'MoviesGenres'})