const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http')
const rewire = require('rewire');

let app = rewire('../app.js');

chai.use(chaiHttp);
chai.should();

describe('Routes', () => {
  describe('GET /', () => {
    it("should get home route", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body).to.equal('Hello world!');
          done();
        })
    })
  })
})
