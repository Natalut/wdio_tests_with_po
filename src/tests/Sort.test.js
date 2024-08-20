const { app } = require('../pages/Application'); 

describe('Inventory Sorting', () => {
    before(async () => {
        await app.login.navigate();
        await app.login.performLogin();
    });

    it('should sort items by name (Z to A)', async () => {
        await app.inventory.navigate();

        const inventoryItems = await app.inventory.inventoryItems;
        expect(inventoryItems.length).toBeGreaterThan(0);

        const initialNames = [];
        for (const item of inventoryItems) {
            const itemName = await app.inventory.getItemName(item).getText();
            initialNames.push(itemName);
        }

        console.log('Initial names:', initialNames);

        const sortDropdown = await app.inventory.sortDropdown;
        expect(await sortDropdown.isDisplayed()).toBe(true);
        await sortDropdown.selectByAttribute('value', 'za');

        const updatedInventoryItems = await app.inventory.inventoryItems;
        const sortedNames = [];
        for (const item of updatedInventoryItems) {
            const itemName = await app.inventory.getItemName(item).getText();
            sortedNames.push(itemName);
        }

        console.log('Sorted names:', sortedNames);

        const expectedSortedNames = [...initialNames].sort().reverse();
        console.log('Expected Sorted Names:', expectedSortedNames);

        expect(sortedNames).toEqual(expectedSortedNames);
    });
});
