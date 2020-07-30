const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http')
const rewire = require('rewire');
// const fetch = require('node-fetch');
// const sinon = require('sinon');
// const puppeteer = require('puppeteer');
// const fs = require('fs-extra');
// const jest = require('jest-mock');
// const spyOn = require('jest-mock').spyOn;
// const sinonChai = require('sinon-chai');
// require('jsdom-global')();

let app = rewire('../app.js');
// let index = rewire('../client/index.js');

chai.use(chaiHttp);
// chai.use(sinonChai);
chai.should();

let browser;
let page;

// before(async () => {
//     try {
//         browser = await puppeteer.launch({headless: true});
//         page = await browser.newPage();
//         const html = fs.readFileSync('../client/index.html', {encoding: 'utf-8'});
//         await page.setContent(html)
//     } catch {
//
//     }
//
// });

describe('Routes', () => {
  describe('GET /', () => {

    it("should get home route", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          // expect(res.text).to.eql('Hello world!');
          done();
        });
    });

    it("should return all blogs", (done) => {
      chai.request(app)
        .get('/blogs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should create new blog", (done) => {
      chai.request(app)
        .post('/blogs/new')
        .send({"blogs":{"title":"hello"}})
        // .expect(200)        
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should return comments", (done) => {
      chai.request(app)
        .get('/blogs/1/comments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });

    it("should return search results", (done) => {
      chai.request(app)
      .get('/blogs/search?q=technology')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should return # tagged search results", (done) => {
      chai.request(app)
      .get('/blogs/search?q=%23technology')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should return no search results", (done) => {
      chai.request(app)
      .get('/blogs/search?q=supercalifragilisticexpialidocious')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.text).to.eql(`"supercalifragilisticexpialidocious" did not return any results!`);
        done();
      });
    });

    it("should increment and return emoji counter", (done) => {
      chai.request(app)
      .get('/blogs/0/emojis/smiley')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  });

  describe('POST /', () => {

  //     // in progress
  //     it("should create new comment", (done) => {
  //       chai.request(app)
  //       .post('/blogs/1/comments')
  //       .end((err, req) => {
  //         req.body.should.be.a('object');
  //         // req.should.have.status(200);
  //         done();
  //       });
  //     });
  // //
  //     // in progress
  //     it("should create new blog", (done) => {
  //       chai.request(app)
  //       .post('/blogs/new')
  //       // .send({“blogs”:{“title”:“hello”}})
  //       // .expect(200)
  //       .end((err, res) => {
  //         // res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         done();
  //       });
  //     });
  });
});

describe("Server Functions", () => {

  describe('Blog Search', () => {
    let blogSearch = app.__get__('blogSearch');
      it('should exist', () => {
          expect(blogSearch).to.be.a('function');
      });

      it('should return an array of results', () => {
        expect(blogSearch('technology')).to.be.a('array');
      });

      it('should return empty array for no results', () => {
        expect(blogSearch('supercalifragilisticexpialidocious').length).to.equal(0);
      })
  });

  describe('Write Blog', () => {
    let writeBlog = app.__get__('writeBlog');
      it('should exist', () => {
        expect(writeBlog).to.be.a('function');
      })
  })
});

// describe("Client Side", () => {
//
//   describe("Load Blogs", () => {
//     let loadBlogs = index.__get__('loadBlogs');
//       it('should exist', () => {
//         expect(loadBlogs).to.be.a('function');
//       });
//   });
//
//   describe("Refresh Blogs", () => {
//     let deleteBlogs = index.__get__('deleteBlogs');
//     it('should exist', () => {
//       expect(deleteBlogs).to.be.a('function');
//     });
//
//     // it('should reload blogs', () => {
//     //   expect(deleteBlogs).to
//     // })
//   });
//   describe('Giphy Functions', () => {
//     describe("Giphy Search", () => {
//       let gifySearch = index.__get__('gifySearch');
//       it('should exist', () => {
//         expect(gifySearch).to.be.a('function');
//       })
//     })
//
//     describe('Display Giphy Results', () => {
//       let displayGify = index.__get__('displayGify');
//       it('should exist', () => {
//         expect(displayGify).to.be.a('function');
//       })
//     })
//   })
//
//
//   // describe('Blog Posting', () => {
//   //   describe('Save New Post', () => {
//   //     let savePost = index.__get__('savePost');
//   //     it('should exist', () => {
//   //       expect(savePost).to.be.a('function');
//   //     })
//   //
//   //     it('fetches data from server when server returns a successful response', (done) => {
//   //       const mockSuccessResponse = {};
//   //       const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//   //       const mockFetchPromise = Promise.resolve({
//   //         json: () => mockJsonPromise,
//   //       });
//   //
//   //       global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
//   //
//   //       expect(global.fetch).calledOnce;
//   //       expect(global.fetch).calledWith('http://localhost:3000/blogs/new');
//   //
//   //       global.fetch.mockClear();
//   //       delete global.fetch;
//   //       done();
//   //
//   //   })
//   describe('event listener', () => {
//     it('should exist', async () => {
//       const addNew = await index.__get__('addNew');
//       console.log(addNew);
//       expect(addNew).to.not.exist;
//       sinon.spy(addNew,"addEventListener")
//
//       expect(addNew.addEventListener.calledOnce).not.to.be.true
//       addNew.showNewPost();
//       expect(addNew.addEventListener.calledOnce).to.be.true
//     })
//   })
// })
// // })
// // })
// after(async () => {
//     await browser.close();
// });
