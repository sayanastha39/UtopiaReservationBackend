var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../main');
var should = chai.should();
chai.use(chaiHttp);

describe('Reservation Endpoints', function () {
    it('should list SINGLE reservation on /reservations/{id} GET', function (done) {
        chai.request(server)
        .get('/reservations/' + '2')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
            });
    });
    
    // it('should add a SINGLE reservation on /reservations POST', function (done) {
    //     chai.request(server)
    //         .post('/reservations')
    //         .set({'userId': '6', 'Content-Type': 'application/json', 'Accept': 'application/json' } )
    //         .send({ 'status': '0', 'availableSeats': '100', 'totalTravelers': '3'})
    //         .end(function (err, res) {
    //             res.should.have.status(201);
    //             done();
    //         });
    // });

    it('should update a SINGLE reservation on /reservations/<id> PUT', function (done) {
        chai.request(server)
            .put('/reservations/'+'4')
            .set({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
            .send({ 'userId': '6', 'status': '1'})
            .end(function (error, response) {
                if (error) {
                    console.log("error");
                    done(error);
                }
                else {
                    response.should.have.status(200);
                    done();
                }
            });
    });
    it('should delete a SINGLE reservatiom on /reservatioms/<id> DELETE', function (done) {
        chai.request(server)
            .delete('/reservations/'+'3')
            .set({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
            .end(function (error, response) {
                if (error) {
                    console.log("error");
                    done(error);
                }
                else {
                    response.should.have.status(204);
                    done();
                }
            });
    });
});

// describe('Flight EndPoints', function () {
//     it('should fetch flights on /flights GET', function (done) {
        
//     });
// });