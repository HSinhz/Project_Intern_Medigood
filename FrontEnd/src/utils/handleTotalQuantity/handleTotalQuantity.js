const updateTotalQuantity = (listItem) => {
    let currentTotalQuantity = 0;
    for( let index = 0 ; index < listItem.length ; index++){
        currentTotalQuantity = parseInt(currentTotalQuantity) + parseInt(listItem[index].Quantity);
    }

    return currentTotalQuantity;
}

export {
    updateTotalQuantity
}