process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Message = require('../models/message');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Messages', () => {
    beforeEach((done) => { //Before each test we empty the database
        Message.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET message', () => {
      it('it should GET all the messages', (done) => {
        chai.request(server)
            .get('/api/messages')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST message', () => {
    it('it should POST a message', (done) => {
      let message = {
          text: 'Hello world',
          textPart: 'This is text part!'
      }
      chai.request(server)
          .post('/api/messages')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(message)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
             res.body.data.should.have.property('text').eql('Hello world');
            done();
          });
    });

});

describe('/GET/:id message', () => {
    it('it should GET a message by the given id', (done) => {
            let message = {
                text: 'Hello world',
                title: 'This is text title!'
            }
            chai.request(server)
                .post('/api/messages')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(message)
                .end((err, res) => {
                    chai.request(server)
                    .get('/api/messages/' + res.body.data._id)
                    .send(message)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
          });
      });

    });
});

describe('/PUT/:id message', () => {
    it('it should UPDATE a message given the id', (done) => {
      let message = new Message({ name: "GoldStar", type: "Black", quantity: 2 });
      message.save((err, book) => {
              chai.request(server)
              .put('/api/messages/' + message.id)
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({ text: "Hello World 3" })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('text').eql("Hello World 3");
                done();
              });
        });
    });
});

describe('/DELETE/:id message', () => {
    it('it should DELETE a message given the id', (done) => {
      let message = new Message({ text: "Hello world 4" });
      message.save((err, message) => {
              chai.request(server)
              .delete('/api/messages/' + message.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                done();
              });
        });
    });
});
});
