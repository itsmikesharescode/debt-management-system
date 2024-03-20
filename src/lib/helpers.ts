export const parseStringToObjectArray = (inputString: string) => {
    // Split the string into individual objects
    const objectsArray = inputString.split('},');

    // Define an array to store the result
    const resultArray: any[] = [];

    // Iterate through each object string, parse it, and construct objects
    objectsArray.forEach((objectString, index) => {
        // Add back the '}' if it's not the last object
        if (index < objectsArray.length - 1) {
            objectString += '}';
        }
        // Parse the string into an object
        const obj = JSON.parse(objectString);
        // Push the parsed object into the result array
        resultArray.push(obj);
    });

    return resultArray;
}