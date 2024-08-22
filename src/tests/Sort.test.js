const { app } = require('../pages/Application'); 
const {sortByName} = require('../helpers/sorting.helper')
const {sortingOption} = require('../helpers/sortingOptions')


describe('Inventory Sorting', () => {
    before(async () => {
        await app.login.navigate();
        await app.login.performLogin();
    });

    it('should sort items by name (Z to A)', async () => {
        await app.inventory.navigate();

        const initialNames = await app.inventory.getInventoryItemsNames();
        const expectedSortedOrder = sortByName(initialNames, sortingOption.nameZA)
        
        await app.inventory.sortBy(sortingOption.nameZA)

        const sortedItems = await app.inventory.getInventoryItemsNames();

        expect(sortedItems.length).toBeGreaterThan(0);
        expect(sortedItems).toEqual(expectedSortedOrder);
    });
});