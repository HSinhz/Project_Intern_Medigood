export  const handleTotalOrder = (listItemOreder) => {
    let total = 0;
    listItemOreder.map(item => {
        total = total + item.totalPriceItem;
    })
    return total;
}
