const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() {
        return $('.title');
    }

    get inventoryItems() {
        return $$('.inventory_item');
    }

    get sortDropdown() {
        return $('select.product_sort_container');
    }

    getItemName(item) {
        return item.$('.inventory_item_name');
    }

    async getItemPrices(item) {
        const priceText = await item.$('.inventory_item_price').getText();
        return parseFloat(priceText.replace('$', ''));
    }

    async getInventoryItemsNames(){
        const names = [];
        for await (const item of this.inventoryItems) {
            const itemName = await this.getItemName(item).getText();
            names.push(itemName);
        }
        return names
        }

        async sortBy(option) {
            await this.sortDropdown.selectByAttribute('value', option);
        }
    }
module.exports = { InventoryPage };
