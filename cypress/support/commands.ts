// cypress/support/commands.ts
import { loginPage } from '../pageObject/loginPage';
/// <reference types="cypress" />
Cypress.Commands.add('login', (username: string, password: string,baseUrl: string) => {
        cy.visit(baseUrl);
        loginPage.login(username, password);
});