// cypress/integration/login.spec.js

import { loginPage } from '../pageObject/loginPage';

describe('Sauce Demo Login and Logout Test', () => {

    it('should login and logout successfully', () => {
        loginPage.logout();

        cy.url().should('eq', Cypress.env('baseUrl'));
    });

    it('should not access /inventory.html without logging in', () => {
        loginPage.logout();
        cy.visit(`${Cypress.env('baseUrl')}inventory.html`);

        cy.url().should('eq', Cypress.env('baseUrl'));

        cy.contains(`Epic sadface: You can only access '/inventory.html' when you are logged in.`).should('be.visible');
    });
});
