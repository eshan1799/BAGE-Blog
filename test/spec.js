const chai = require('chai');
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
          expect(res.body).to.equal('Hello world!');
          done();
        })
    })
  })
})
