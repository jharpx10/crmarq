'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:4000';

describe('get all clients: ',()=>{

	it('should get all clients', (done) => {
		chai.request(url)
			.get('/admin/client')
			.end( function(err,res){
                console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('get all purchases: ',()=>{

	it('should get all purchases', (done) => {
		chai.request(url)
			.get('/admin/purchase')
			.end( function(err,res){
                console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('Functional Test <Sessions>:', function () {
    it('should login a valid user', function (done) {
        chai.request(url)
        .post('/signin')
        .send({"username": "root", "password": "root"})
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    })
});

