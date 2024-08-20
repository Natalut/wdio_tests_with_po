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

    async getSortedItems(option) {
        const inventoryItems = await this.inventoryItems;

        if (!inventoryItems.length) {
            throw new Error('No inventory items found on the page');
        }

        const itemNames = [];
        const itemPrices = [];

        for (const item of inventoryItems) {
            const itemName = await this.getItemName(item).getText();
            itemNames.push(itemName);

            const itemPrice = await this.getItemPrices(item);
            itemPrices.push(itemPrice);
        }

        switch (option) {
            case 'az':
                return itemNames.sort();
            case 'za':
                return itemNames.sort().reverse();
            case 'lohi':
                return itemPrices.sort((a, b) => a - b);
            case 'hilo':
                return itemPrices.sort((a, b) => b - a);
            default:
                throw new Error('Invalid sorting option');
        }
    }
}

module.exports = { InventoryPage };
