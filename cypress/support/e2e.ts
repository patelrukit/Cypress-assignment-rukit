// cypress/support/e2e.ts
import './commands';
import 'cypress-xpath';

beforeEach(() => {
      console.log('Running beforeEach hook');
      cy.login(Cypress.env('username'), Cypress.env('password'),Cypress.env('baseUrl'));
});
