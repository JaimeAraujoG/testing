const request = require("supertest")
const app = require('../app')

const URL_DIRECTORS = '/directors'

const director = {
    firstName: "Miguel",
    lastName:"Lopez",
    nationality:"Colombia",
    image:"😴",
    birthday:"1996-10-31"
}

let directorId;

test("post -> 'URL_DIRECTORS', should return status code 201, and res.body to be defined and res.body.name = newBody.name", async () => {
    const res= await request(app)
        .post(URL_DIRECTORS) 
        .send(director)

        directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)

})

test("Get -> 'URL_DIRECTORS', should  return status code 200, res.body to be defined and res.body.length = 1", async() => {
    const res= await request(app)
    .get(URL_DIRECTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> 'URL_DIRECTORS/:id', should return status code 200, res.body to be defined, and res.body.name = actor.name", async () => {
    const res= await request(app)
    .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
})
    
test("Put -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
    .put( `${URL_DIRECTORS}/${directorId}`)
    .send( {lastName : "Santiago"} )

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe("Santiago")
})
test("Delete -> 'URL_ACTORS/:id' ,should return status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(204)
})