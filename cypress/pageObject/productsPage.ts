
class ProductsPage {
  private priceSelector: string = 'div[class="inventory_item_price"]';

  public getAllPrices(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.priceSelector);
  }

  public countPricesInRange(min: number, max: number): Cypress.Chainable<number> {
    return this.getAllPrices().then(($prices) => {
      let count = 0;

      $prices.each((index, priceElement) => {
        const priceText = Cypress.$(priceElement).text().replace('$', '');
        const price = parseFloat(priceText);

        if (price >= min && price <= max) {
          count++;
        }
      });
      return count;
    });
  }
   public addItemToCart(itemName: string) {
        cy.xpath(`//div[contains(text(), '${itemName}')]/ancestor::div[contains(@class, 'inventory_item')]//button[contains(@class, 'btn_inventory')]`).click();
    }
    public getCartCount() {
        return cy.get('.shopping_cart_badge');
    }
    public removeItemFromCart(itemName: string) {
               cy.contains(itemName).parents('.inventory_item')
                 .find('.btn_inventory')
                 .contains('Remove')
                 .click();
    }
    public goToCart() {
               cy.get('.shopping_cart_link').click();
    }
}

export default ProductsPage;
