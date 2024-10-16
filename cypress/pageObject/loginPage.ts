// cypress/support/pages/loginPage.ts

class LoginPage {
    public login(username: string, password: string) {
        cy.get('input[name="user-name"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/inventory.html');
      }
    public logout() {
            cy.get('#react-burger-menu-btn').click();
            cy.get('#logout_sidebar_link').click();
        }
}

export const loginPage = new LoginPage();
