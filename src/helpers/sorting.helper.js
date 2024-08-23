const { sortingOption } = require('./sortingOptions')

    function sortByName(initialArray, option) {
        switch (option) {
            case sortingOption.nameAZ:
                return initialArray.sort();
            case sortingOption.nameZA:
                return initialArray.sort().reverse();
            default:
                throw new Error('Invalid sorting option')        
            }
    }

    function sortByPrice(initialArray, option) {
        switch (option) {
            case sortingOption.priceLowHigh:
                return initialArray.sort((a, b) => a - b);
            case sortingOption.priceHighLow:
                return initialArray.sort((a, b) => b - a);
            default:
                throw new Error('Invalid sorting option')
        }
    }

    module.exports = { sortByName, sortByPrice }