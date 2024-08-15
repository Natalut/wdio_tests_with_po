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

    get addItemToCartButton() {
        return $$('[id^="add-to-cart"]');
    }

    async addItemToCartById(id) {
        await this.addItemToCartButton[id].click();
}

    async getSortedItems(option) {
        const inventoryItems = await this.inventoryItems;

        if (!inventoryItems.length) {
            throw new Error('No inventory items found on the page');
        }

        const itemNames = [];
        for (const item of inventoryItems) {
            const itemName = await this.getItemName(item).getText();
            itemNames.push(itemName);
        }

        switch (option) {
            case 'az':
                return itemNames.sort();
            case 'za':
                return itemNames.sort().reverse();
            case 'lohi':
                return itemNames.sort((a, b) => a - b);
            case 'hilo':
                return itemNames.sort((a, b) => b - a);
            default:
                throw new Error('Invalid sorting option');
        }
    }

    async getItemPrices() {
        const inventoryItems = await this.inventoryItems;
        const itemPrices = [];
        for (const item of inventoryItems) {
            const priceText = await item.$('.inventory_item_price').getText();
            const price = parseFloat(priceText.replace('$', ''));
            itemPrices.push(price);
        }
        return itemPrices;
    }
}

module.exports = { InventoryPage };
