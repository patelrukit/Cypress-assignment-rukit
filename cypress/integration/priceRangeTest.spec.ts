// priceRangeTest.cy.ts
/// <reference types="cypress" />
import ProductsPage from '../pageObject/productsPage';

describe('Price Range Validation', () => {
  const productsPage = new ProductsPage();

  it('should count items with prices between $9.99 and $15.99', () => {
      cy.fixture('testData').then((data) => {
        const { min, max, expectedCount } = data.priceRange;

        productsPage.countPricesInRange(min, max).then((count: number) => {
          cy.log('Count of Prices in Range:', count);
          expect(count).to.equal(expectedCount);
        });
      });
  });

  it('should add an item to the cart and validate cart count', () => {
      cy.fixture('testData').then((data) => {
        productsPage.addItemToCart(data.products.add);
      });

      productsPage.getCartCount().should('contain', '1');
    });

    it('should remove an item from the cart and validate cart count', () => {
      cy.fixture('testData').then((data) => {
        productsPage.addItemToCart(data.products.add);
        productsPage.getCartCount().should('contain', '1');

        productsPage.removeItemFromCart(data.products.add);
        productsPage.getCartCount().should('not.exist');
      });
});
});