describe('Test Suit - Booking APi Testing', () => {
    it('1 - Get all booking ids', () => {

        cy.request({
            method: 'GET',
            url: '/booking',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        });     
    });
    

    it('2 - Get booking id]by firstname', () => {

        cy.request({
        method: 'GET',
        url: '/booking',
        qs: { 'firstName' : 'test'},
        headers: { 'Content-Type': 'application/json'}
     }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf.at.least(1);
        expect(response.body[0]).to.have.property('bookingid');
        
        });
    });


    
    it('4 - Get booking by id', () => {

        cy.request({
        method: 'GET',
        url: '/booking/1',
        headers: { 'Accept': 'application/json' }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
        
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('firstname').and.to.be.a('string');
        expect(response.body).to.have.property('lastname').and.to.be.a('string');
        expect(response.body).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');

        });
    });

    it.only('5 - Creating a new booking with success', () => {
        
        cy.request({
        method: 'POST',
        url: '/booking',
        headers: {
        'Content-Type': 'application/json'
        },
        body: {
        firstname: 'Carol',
        lastname: 'Louzada',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');

        expect(response.body.booking).to.have.property('firstname', 'Carol');
        expect(response.body.booking).to.have.property('lastname', 'Louzada');
        expect(response.body.booking).to.have.property('totalprice', 150);
        expect(response.body.booking).to.have.property('depositpaid', true);
        expect(response.body.booking.bookingdates).to.deep.equal({
        checkin: '2018-01-01',
        checkout: '2019-01-01'
        });
        expect(response.body.booking).to.have.property('additionalneeds', 'Breakfast');

        
      });
    });


});