context("Access signin/signup", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('TEST_APP'));
    });

    it('signin success', () => {
        cy.get('.sign-up-button').click()  
        cy.contains('.ant-modal','Welcome To Food Steps')

        cy.get('input#username.ant-input')
        .type('user11')
        cy.get('input#password.ant-input')
        .type('12345678')

        cy
        .get('.ant-modal-content')
        .contains('button','Sign In')
        .click({force:true}) 

        cy.wait(500)
        cy.contains('div.ant-message-success', 'Successfully signed in! Welcome user11!')
    })  
    
    it('signin unsuccessful', () => {
      cy.get('.sign-up-button').click()  
      cy.contains('.ant-modal','Welcome To Food Steps')

      cy.get('input#username.ant-input')
      .type('user111')
      cy.get('input#password.ant-input')
      .type('12345678')

      cy
      .get('.ant-modal-content')
      .contains('button','Sign In')
      .click({force:true}) 

      cy.wait(500)
      cy.contains('div.ant-message-notice', 'Username or password is incorrect.')
  })  
  });
  
