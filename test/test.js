

let chai = require ("chai");
let chaiHttp = require ("chai-http");
// let server = require("../index3.js");
let app = require("../index3.js");
// let faker = require("@faker-js/faker");
const describe  = require("mocha");
const response  = require("express");

chai.should();
chai.use(chaiHttp);

describe("Test one : posts", () => {
    it("get all posts", (done) => {
        chai
            .request(app)
            .get("/api/v1/posts")
            .end((err, res) => {
                res.should.have.status(200);
                res.should;
                done();
            });
    });

    it("get one blog", (done) => {
        chai
            .request(app)
            .get("/api/v1/posts/626eb680d1369f83c8e183e5")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("Create a post", (done) => {
        chai
            .request(app)
            .post("/api/v1/add_post")
            .set({
                Accept: "application/json"
            })
            .send({
                title: "Hello world hello world hello world hellow world hello world ",
                content: "Hello world hello world hello world hellow world hello world Hello world hello world hello world hellow world hello world",
                category: ["java", "code", "programming"],
                comments: ["Hi"],
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });

    it("updating blog post", (done) => {
        chai
            .request(app)
            .put("/api/v1/posts/626eb680d1369f83c8e183e5")
            .set({
                Accept: "application/json"
            })
            .send({
                title: "Java is coffee",
                content: "Java is enjoyable OOP programming language",
                category: ["java", "code", "programming"],
                comments: ["Hello world"],
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });
    it('Comment on an article.', (done) => {

        chai.request(app).post('/api/v1/posts/626eb680d1369f83c8e183e5/comments')
            .set({
                Accept: 'application/json'
            })
            .send({

                "message": "cool"
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body).to.contain.property('success');
                done();
            })
            .catch((err) => done(err))
    })


    it("Deleteing blog", (done) => {
        chai
            .request(app)
            .delete("/api/v1//posts/626eb680d1369f83c8e183e5")
            .set({
                Accept: "application/json"                
            })
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.contain.property("data");
                expect(body.data).to.contain.property("message");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    }).timeout(30000)
});

describe("Test two: Users", () => {
    it("get all users", (done) => {
        chai
            .request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("get one user", (done) => {
        chai
            .request(app)
            .get("/api/v1/users/3")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("Create a user", (done) => {
        chai
            .request(app)
            .post("/api/v1/add_user")
            .set({
                Accept: "application/json"
            })
            .send({
                firstName: "Mfrancoise",
                email: "Mfrancoise@gmail.com",
                password: "98ufder",
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("data");
                expect(body.data).to.contain.property("message");
                expect(body).to.contain.property("success");
                done();
            })
            .catch((err) => done(err));
    });

    it("User logging in", (done) => {
        chai
            .request(app)
            .post("/api/v1/users/login")
            .send({
                "email": "Keza@gmail.com",
                "password": "0Kezau"

            })
            .then((res) => {
                const body = res.body;
                expect(body).to.have.property("token");
                expect(body).to.contain.property("success");
                expect(body).to.contain.property("data");

                done();
            })
            .catch((err) => done(err));
    });

});









// describe('Posts API', () => {

//     /**
//      * Test the GET route
//      */

//     describe("GET /api/v1/posts", () => {
//         it("It should GET all the posts", (done) => {
//             chai.request(server)
//                 .get("/api/v1/posts")
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     // response.body.should.be.a['array'];
//                 done();    
//                 });
//         });
//         it("It should not GET all the posts", (done) => {
//             chai.request(server)
//                 .get("/api/v1/post")
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                 done();    
//                 });
//         });

//     });




//     /**
//      * Test the GET by ID route
//      */
//      describe("GET /api/v1/posts/:postID", () => {
//         it("It should GET post by ID", (done) => {
//             const postID = "626eb680d1369f83c8e183e5";
//             chai.request(server)
//                 .get("/api/v1/posts")
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a('object');
//                     response.body.should.have.property('postID');
//                     response.body.should.have.property("content");
//                     response.body.should.have.property("dateTime");
//                     response.body.should.have.property("downvotes");
//                     response.body.should.have.property("upvotes");
//                     response.body.should.have.property("category");
//                     response.body.should.have.property("Comment");
//                     response.body.should.have.property("postID").eq("626eb680d1369f83c8e183e5");
//                 done();    
//                 });
//         });


//         it("It should NOT GET post by ID", (done) => {
//             const postID = "626eb680d12459f83c8e183e";
//             chai.request(server)
//                 .get("/api/v1/posts")
//                 .end((err, response) => {
//                     response.should.have.status(404);
//                     response.text.should.be.eq('The post with provided ID does not exist');
//                 done();    
//                 });
//         });




//     });
    
//     /**
//      * Test the POST route
//      */



    
//     /**
//      * Test the PUT route
//      */


//     /**
//      * Test the DELETE route
//      */

// });