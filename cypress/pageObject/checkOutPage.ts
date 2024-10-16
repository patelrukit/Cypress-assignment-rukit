class CheckoutPage {
  fillFirstName(firstName: string) {
    cy.get('input[name="firstName"]').type(firstName);
  }

  fillLastName(lastName: string) {
    cy.get('input[name="lastName"]').type(lastName);
  }

  fillZipCode(zipCode: string) {
    cy.get('input[name="postalCode"]').type(zipCode);
  }

  continue() {
    cy.get('.btn_primary').contains('Continue').click();
  }

  finish() {
    cy.get('.cart_button').contains('Finish').click();
  }

  verifyOrderConfirmation() {
    cy.contains('THANK YOU FOR YOUR ORDER').should('be.visible');
  }
}

export const checkoutPage = new CheckoutPage();
