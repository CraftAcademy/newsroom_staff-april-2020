describe('Journalist authenticates', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/');
  });

  it('successfully with valid credentials', () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:successful_login.json",
      headers: {
        uid:"user@mail.com"
      }
    })
    cy.get('#login-form').within(() => {
      cy.get('#email').type('user@mail.com');
      cy.get('#password').type('password');
      cy.get('Button').contains('Submit').click();
    });
    cy.get('#message').should('contain', 'Welcome to work user@mail.com');
  });

  it("unsuccessfully with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:unsuccessful_login.json",
      headers: {
        uid:"user@mail.com"
      }
    })
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get('Button').contains('Submit').click()
    });
    cy.get("#message").should("contain", "Invalid login credentials, please try again.");
  });
});
