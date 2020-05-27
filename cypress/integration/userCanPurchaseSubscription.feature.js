describe('user can purchase a subscription', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "**/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com"
      }
    })
    cy.route({
      method: "GET",
      url: "**/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com"
      }
    })
    cy.route({
      method: "POST",
      url: "**/subscription",
      response: { message: "Transaction was successfull" }
    })
    cy.visit('/')
    cy.get('#login-form').within(() => {
      cy.get('#email').type('user@mail.com');
      cy.get('#password').type('password');
      cy.get('button').contains('Submit').click();
    });
  })

  it('by clicking "Buy Subscription"', () => {
    cy.get("button")
      .contains("Buy Subscription")
      .click()
    cy.get("form[id='payment-form']").should('be.visible')
    cy.wait(1000)
    cy.typeInStripeElement("cardnumber", "4242424242424242")
  });

});