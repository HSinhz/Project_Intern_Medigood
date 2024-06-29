import { useEffect, useState } from "react";
import HeaderContainer from "../../Layout/Header/HeaderContainer";
import ListDistribute from "../../Layout/LayoutDistribute/ListDistribute";
import { getDistributeOrderBranch } from "../../../services/DistributeService";
import { toast } from "react-toastify";

const ListPurchaseBranch = ({onComponentClick, showDetailDistribute}) => {
    const action = {
        textHeader: 'Danh sách đơn xin phân phối hàng hóa',
        btnText: 'Xin phân phối hàng hóa',
        componentChildren: 'CreateDistributeBranch',
        path: "/medigood/cua-hang-chi-nhanh/phan-phoi"
    }

    const actionDistribute = {
        role: 'BRANCH'
    }

    const [listDistributeBranch, setListDistributeBranch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimt, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        fetchDataDistributeBranch();
    }, [currentPage])


    const fetchDataDistributeBranch = async () => {
        try {
            let response = await getDistributeOrderBranch(currentPage, currentLimt);
            if(response && response.Success === true ){
                console.log("response.Data: ", response.Data)
                setListDistributeBranch(response.Data);
                setTotalPages(response.totalPages)
            } else {
                toast.error(response.Mess);
            }
        } catch (error) {
            console.log(error);
            toast.error('Vui lòng thử lại sau')
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <div className="list-purchase-branch">
                <HeaderContainer action={action} onComponentClick={onComponentClick} />
                <div className="list-purchase-order">
                    <ListDistribute listDistribute={listDistributeBranch} totalPage={totalPages} actionDistribute={actionDistribute} showDetailDistribute={showDetailDistribute} handlePageClick={handlePageClick} />
                </div>
            </div>
        </>
    )
}

export default ListPurchaseBranch;