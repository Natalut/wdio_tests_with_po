const { app } = require('../pages/Application'); 


describe('Inventory Sorting', () => {
    before(async () => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
    });

    it('should sort items by name (Z to A)', async () => {
        await app.inventory.navigate();

        const inventoryItems = await app.inventory.inventoryItems;
        if (!inventoryItems.length) {
            throw new Error('No inventory items found on the page');
        }

        const initialNames = [];
        for (const item of inventoryItems) {
            const itemName = await item.$('.inventory_item_name').getText();
            initialNames.push(itemName);
        }

        console.log('Initial names:', initialNames);

        const sortDropdown = await $('select.product_sort_container');
        if (!await sortDropdown.isDisplayed()) {
            throw new Error('No inventory items found on the page');
        }
        await sortDropdown.selectByAttribute('value', 'za');

        const sortedNames = [];
        for (const item of inventoryItems) {
            const itemName = await item.$('.inventory_item_name').getText();
            sortedNames.push(itemName);
        }

        console.log('Sorted names:', sortedNames);

        const expectedSortedNames = [...initialNames].sort();

        console.log('Expected Sorted Names:', expectedSortedNames);
    }
)
}
)