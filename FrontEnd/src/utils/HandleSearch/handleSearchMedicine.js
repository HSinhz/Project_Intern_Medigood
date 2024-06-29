const handleSearchMedicine = (value, listMedicine) => {
    if(value !== ''){
        const filteredMedicine = listMedicine.filter(medicine =>
            medicine.MedicineName.toLowerCase().includes(value.toLowerCase())
        );
        return filteredMedicine;
    } else {
        return [];
    }
}

export {
    handleSearchMedicine
}