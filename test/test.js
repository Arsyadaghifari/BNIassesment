const request = require('supertest');
const { expect } = require('chai');
const config = require('../env.js');
const TOKEN = config.token;
const url = config.baseUrl;

let userId, userName, userEmail, postId, postTitle, commentId, todoId;

//POST API TESTING

/// POSITIVE TESTING
describe("Positive - Post New User", () => { 
    it("Response status equal to 201", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "usertest007@mail.com",
          "name": "USER TEST7",
          "gender": "male",
          "status": "active"
        });

      userId = response.body.id;
      userName =  response.body.name;
      userEmail =  response.body.email;
      console.log('User ID:', userId);
      console.log('User Name:', userName);
      console.log('User Email:', userEmail);
      expect(response.status).to.equal(201);
    });
});

/// NEGATIVE TESTING
describe("Negative - Post New User", () => { 
    it("Expected the POST request to fail", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "....",
          "name": "USER TEST1",
          "gender": "male",
          "status": "active"
        });
        expect(response.status).to.equal(422);
        console.log('User ID:', userId);
      console.log('User Name:', userName);
      console.log('User Email:', userEmail);
    });

/// GET API TESTING

// POSTIVE TESTING
  describe("Positive - GET selected user details", () =>{  
    it("Response status equal to 200", async () => {
        const response = await request(url)
      .get(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })
 
// NEGATIVE TESTING
describe("Negative - GET selected user details", () =>{  
    it("Response status equal to 404", async () => {
        const response = await request(url)
      .get(`/public/v2/users/12345?access-token=${TOKEN}`)
        expect(response.status).to.equal(404)
        })
  })  

/// PUT API TESTING

// POSITIVE TESTING

 describe("Positive - PUT selected user details", () =>{
    it("Response status equal to 200", async () => {
      const response = await request(url)
        .put(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        .send({
          "email": "usertest007@mail.com",
          "name": "USER TEST7",
          "gender": "male",
          "status": "inactive"
      });
        expect(response.status).to.equal(200)
        })
  }) 

// NEGATIVE TESTING

describe("Negative - PUT selected user details", () =>{
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .put(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        .send({
          "email": "usertest007@mail.com",
          "name": "USER TEST7",
          "gender": "transgender",
          "status": "inactive"
      });
        expect(response.status).to.equal(422)
        })
  }) 

// DELETE API TESTING

//POSITIVE TESTING

describe("Positive - Delete selected user", () =>{
    it("Response status equal to 204", async () => {
        const response = await request(url)
        .delete(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(204)
        })
  })

  //NEGATIVE TESTING
describe("Negative - Delete selected user", () =>{
    it("Response status equal to 404", async () => {
        const response = await request(url)
        .delete(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(404)
        })
  })  

});
