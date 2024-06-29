import { toast } from "react-toastify";

const handleChooseMedicine = (medicine, listMedicine) => {
    let check = true;
    listMedicine.map(item => {
        if(item.MedicineId === medicine.MedicineId){
            check = false;
        }
    })
    if( check === true){
        let nextId = listMedicine.length + 1;
        medicine.Id = nextId;
        medicine.Quantity = 0;
    }
    return {medicine, check};
}

export {
    handleChooseMedicine
}