require("../models")
const request = require("supertest")
const app = require('../app')
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")

const URL_MOVIES = '/movies'

const movie = {
    name: "Fresita rosita",
    image:"🤐🤐",
    synopsis:"de terror", 
    releaseYear:"2000"

}
let movieId;

test("post -> 'URL_MOVIES', should return status code 201, and res.body to be defined and res.body.name = newBody.name", async () => {
    const res= await request(app)
        .post(URL_MOVIES) 
        .send(movie)

        movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)

})

test("Get -> 'URL_MOVIES', should  return status code 200, res.body to be defined and res.body.length = 1", async() => {
    const res= await request(app)
    .get(URL_MOVIES)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> 'URL_MOVIES/:id', should  return status code 200, res.body to be defined and res.body.name = genre.name", async() => {
    const res= await request(app)
    .get(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Put -> 'URL_MOVIES/:id',should  return status code 200, res.body to be defined ", async () => {
    const res= await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send( {name:"los 7 enanitos"} )

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("los 7 enanitos")

})

test("Post -> 'URL_MOVIES/:id/actors', should status code 200, res.body to be defined", async () => {
    const actor = await Actor.create({ 
        firstName: "Juan",
        lastName:"Camargo",
        nationality:"Argentina",
        image:"😙😙",
        birthday: "1986-07-25"
     })
     const res = await request(app)
     .post(`${URL_MOVIES}/${movieId}/actors`)
     .send([actor.id])

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     await actor.destroy()
})

test("Post -> 'URL_MOVIES/:id/directors', should status code 200, res.body to be defined", async () => {
    const director = await Director.create({ 
        firstName: "James",
        lastName:"Rodriguez",
        nationality:"Colombia",
        image:"🤠🤠",
        birthday: "1996-12-31"
     })
     const res = await request(app)
     .post(`${URL_MOVIES}/${movieId}/directors`)
     .send([director.id])

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     await director.destroy()
})

test("Post -> 'URL_MOVIES/:id/genres', should status code 200, res.body to be defined", async () => {
    const genre = await Genre.create({ 
        name: "Falcao"        
     })
     const res = await request(app)
     .post(`${URL_MOVIES}/${movieId}/genres`)
     .send([genre.id])

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     await genre.destroy()
})


test("delete -> 'URL_MOVIES/:id',should  return status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204)

})
