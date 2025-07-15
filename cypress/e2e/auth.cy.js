describe('Test Suit - Auth APi Testing', () => {
  it('1 - POST credentials to auth endpoint with sucess - 1º version', () => {

    cy.request({
      method: 'POST',
      url:'/auth',
      body:{
            "username": "admin",
            "password": "password123"
            },
      headers: { 'Content-Type': 'application/json'},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body).not.to.be.empty;
  });
});
})