interface Product {
    [key: string]: string;
}

interface ProductEntry {
    date: string;
    total_amount: string;
    payment_length: string;
    [key: string]: string;
}

export const convertStringToObject = (inputString: string): ProductEntry[] => {
    // Split the input string by ', ' to separate each product entry
    const productEntries: string[] = inputString.split(', ');

    // Initialize an empty array to store the result
    const result: ProductEntry[] = [];

    // Iterate over each product entry
    for (const entry of productEntries) {
        // Split each entry by ' - ' to separate product details, date, total amount, and payment length
        const parts: string[] = entry.split(' - ');

        // Extract payment length, total amount, and date
        const payment_length: string = parts.pop()!.trim();
        const total_amount: string = parts.pop()!.trim();
        const date: string = parts.pop()!.trim();

        // Construct product details
        const productDetails: string = parts.join(' - ');

        // Extract product details
        const productObject: Product = {};
        const productEntries: string[] = productDetails.match(/"([^"]+?)":"([^"]+?)"/g) || [];
        productEntries.forEach(entry => {
            const [key, value] = entry.split('":"');
            productObject[key.replace(/"/g, '')] = value.replace(/"/g, '');
        });

        // Construct the final object with date, total_amount, and payment_length included
        const finalObject: ProductEntry = { date, total_amount, payment_length };

        // Merge product details into the final object
        Object.assign(finalObject, productObject);

        // Push the final object into the result array
        result.push(finalObject);
    }

    return result;
}
