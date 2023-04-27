module.exports = function (apiClient, cart) {
    const getValue = (checkType, objectKey, ...params) => {
        let ans = null;

        for (const key in apiClient) {
            if (Object.hasOwnProperty.call(apiClient, key)) {
                const element = apiClient[key](...params) || apiClient[key];
                if (element && checkType(element)) {
                    ans = element;
                    if (objectKey && element[0][objectKey]) {
                        ans = element;
                    }
                }
            }
        }

        return ans;
    };

    const defaultCurrency = getValue((value) => typeof value === "string");
    const deliveryCost = getValue((value) => typeof value === "number", null, cart.cityId);

    let totalCost = 0;
    for (const item of cart.items) {
        const prices = getValue((value) => Array.isArray(value), "price", cart.orderDate);
        const price = prices?.find((p) => p.articleId === item.articleId)?.price || 0;
        const currency = prices?.find((p) => p.articleId === item.articleId)?.currency || cart.currency;

        const stocks = getValue((value) => Array.isArray(value), "quantity", cart.orderDate);
        const stock = stocks?.find((s) => s.articleId === item.articleId)?.quantity || 0;

        const itemCost =
            Math.min(item.quantity, stock) *
            getValue((value) => typeof value === "number", currency, defaultCurrency, price);

        totalCost += itemCost;
    }

    const convertedCost = getValue(
        (value) => typeof value === "number",
        null,
        cart.currency,
        defaultCurrency,
        totalCost,
    );

    return convertedCost + deliveryCost;
};
