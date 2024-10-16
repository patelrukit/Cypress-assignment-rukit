/// <reference types="cypress" />
import ProductsPage from '../pageObject/productsPage';
import { checkoutPage } from '../pageObject/checkoutPage';

describe('Checkout Flow Test', () => {
const productsPage = new ProductsPage();


  it('should complete the checkout flow successfully', function () {
    cy.fixture('testData').then((data) => {
      productsPage.addItemToCart(0);

      productsPage.goToCart();

      cy.get('.btn_action').contains('Checkout').click();

      // Use the loaded data here
      checkoutPage.fillFirstName(data.checkoutInfo.firstName);
      checkoutPage.fillLastName(data.checkoutInfo.lastName);
      checkoutPage.fillZipCode(data.checkoutInfo.zipCode);
      checkoutPage.continue();

      checkoutPage.finish();

      checkoutPage.verifyOrderConfirmation();
    });
  });

   it('should complete the checkout flow successfully and verify total amount', function () {
     cy.fixture('testData').then((data: { cartItems: Array<{ price: number }>; checkoutInfo: { firstName: string; lastName: string; zipCode: string } }) => {
        data.cartItems.forEach((item) => {
             productsPage.addItemToCart(item.name);
           });

       productsPage.goToCart();

       const expectedTotal: number = data.cartItems.reduce((sum, item) => sum + item.price, 0);


       cy.get('.btn_action').contains('Checkout').click();

       checkoutPage.fillFirstName(data.checkoutInfo.firstName);
       checkoutPage.fillLastName(data.checkoutInfo.lastName);
       checkoutPage.fillZipCode(data.checkoutInfo.zipCode);
       checkoutPage.continue();
         cy.get('.summary_subtotal_label').invoke('text').then((text: string) => {
                 const actualSubtotal: number = parseFloat(text.replace('Item total: $', ''));
                 expect(actualSubtotal).to.equal(expectedTotal);
               });
       checkoutPage.finish();

       checkoutPage.verifyOrderConfirmation();
     });
   });

    it('should complete the checkout flow successfully, verify total amount, and validate order tax', function () {
      cy.fixture('testData').then((data: { cartItems: Array<{ name: string; price: number }>; checkoutInfo: { firstName: string; lastName: string; zipCode: string } }) => {

        data.cartItems.forEach((item) => {
          productsPage.addItemToCart(item.name);
        });

        productsPage.goToCart();

        const expectedTotal: number = data.cartItems.reduce((sum, item) => sum + item.price, 0);

        cy.get('.btn_action').contains('Checkout').click();

        checkoutPage.fillFirstName(data.checkoutInfo.firstName);
                checkoutPage.fillLastName(data.checkoutInfo.lastName);
                checkoutPage.fillZipCode(data.checkoutInfo.zipCode);
                checkoutPage.continue();

        cy.get('.summary_subtotal_label').invoke('text').then((text: string) => {
          const actualSubtotal: number = parseFloat(text.replace('Item total: $', ''));
          expect(actualSubtotal).to.equal(expectedTotal);
        });

        const expectedTaxMin: number = expectedTotal * 0.05;
        const expectedTaxMax: number = expectedTotal * 0.10;

        cy.get('.summary_tax_label').invoke('text').then((text: string) => {
          const actualTax: number = parseFloat(text.replace('Tax: $', ''));
          expect(actualTax).to.be.gte(expectedTaxMin);
          expect(actualTax).to.be.lte(expectedTaxMax);
        });
        checkoutPage.finish();

        checkoutPage.verifyOrderConfirmation();
      });
    });

    it('should correctly update cart count when adding and removing items', function () {
      cy.fixture('testData').then((data: { cartItems: Array<{ name: string; price: number }> }) => {

        cy.get('.shopping_cart_badge').should('not.exist');

        const firstItem = data.cartItems[0];
        productsPage.addItemToCart(firstItem.name);

        cy.get('.shopping_cart_badge').should('contain', '1');

        const secondItem = data.cartItems[1];
        productsPage.addItemToCart(secondItem.name);

        cy.get('.shopping_cart_badge').should('contain', '2');

        productsPage.removeItemFromCart(firstItem.name);

        cy.get('.shopping_cart_badge').should('contain', '1');

        productsPage.removeItemFromCart(secondItem.name);

        cy.get('.shopping_cart_badge').should('not.exist');
      });
    });


});
