
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

    cy.conditionalRoute({
      method: "POST",
      url: "/api/subscriptions",
      requiredKey: 'stripeToken',
      response: { message: "Transaction was successful" }
    })
    cy.conditionalRoute({
      method: "POST",
      url: "/api/subscriptions",
      // status: 422,
      response: { error: "Transaction was NOT successful" }
    })



    // cy.route({
    //   method: "POST",
    //   url: /\/api\/subscriptions*/,
    //   response: xhr => {
    //     if (xhr.request) {
    //       if (xhr.request.body.hasOwnProperty('stripeToken')) {
    //         console.log('has right key')

    //         return {
    //           message: "Transaction was successfull"
    //         }
    //       } else {
    //         console.warn('missing key')
    //         return {
    //           message: "Transaction was NOT successfull"
    //         }
    //       }
    //     }

    //     console.table(xhr.request);

    //   }
    //   // response: { message: "Transaction was successfull" },

    //   // onRequest: xhr => {
    //   //   if (xhr.request.body.hasOwnProperty('stripeToken')) {
    //   //     console.log('has right key')
    //   //   } else {
    //   //     console.warn('missing key')
    //   //   }
    //   //   console.table(xhr.request);

    //   // },

    // }).as('subscriptionRequest')

    cy.route({
      method: "POST",
      url: /subscriptions\/stripeeToken\?/,
      data: {
        stripeeToken: '*'
      },
      response: { message: "another stub" }
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
    cy.get("[id='payment-interface']").should('be.visible')
    cy.wait(1000)
    cy.typeInStripeElement("cardnumber", "4242424242424242")
    cy.typeInStripeElement("exp-date", "1221")
    cy.typeInStripeElement("cvc", "123")
    cy.get('button').contains('Submit').click()

    // cy.wait('@subscriptionRequest')
    //   .its('requestBody')
    //   .should('have.property', 'stripeToken')

    cy.get('#subscription-message')
      .should(
        "contain",
        "Transaction was successful")
  });

});