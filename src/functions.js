export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export const spliceNoMutate = (myArray,indexToRemove) => {
    return myArray.slice(0,indexToRemove).concat(myArray.slice(indexToRemove+1));
};