const request = require("supertest")
const app = require('../app')

const URL_ACTORS = '/actors'

const actor = {
    firstName: "Jaime",
    lastName:"Araujo",
    nationality:"Colombia",
    image:"😎",
    birthday:"1998-07-01"
}

let actorId;

test("post -> 'URL_ACTORS', should return status code 201, and res.body to be defined and res.body.name = newBody.name", async () => {
    const res= await request(app)
        .post(URL_ACTORS) 
        .send(actor)

        actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)

})

test("Get -> 'URL_ACTORS', should  return status code 200, res.body to be defined and res.body.length = 1", async() => {
    const res= await request(app)
    .get(URL_ACTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined, and res.body.name = actor.name", async () => {
    const res= await request(app)
    .get(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})
    
test("Put -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
    .put( `${URL_ACTORS}/${actorId}`)
    .send( {lastName : "Andres"} )

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe('Andres')
})
test("Delete -> 'URL_ACTORS/:id' ,should return status code 204", async () => {
    const res = await request(app)
    .delete( `${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(204)
})