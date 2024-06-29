import './ResultSearch.scss';
import { handleChooseMedicine } from '../../../utils/handleChooseObject/handleChooseMedicine';
import { toast } from 'react-toastify';

const ResultSearchMedic = ({listResult, handleChooseProduct}) => {

    
    return (
        <>
            <div className="results-container ">
                {listResult.length > 0 && (
                    <div className="results-list">
                        {listResult.map((medicine, index) => (
                            <a key={index} className='result-item text-decoration-none'
                                onClick={() => handleChooseProduct(medicine)}
                            >
                                <div className='d-flex row-item'>
                                    <img src={medicine.ImgUrl} className='img-medicine' alt={medicine.MedicineName} />
                                    <div className='text-body mx-2 text-decoration-none'>{medicine.MedicineName}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ResultSearchMedic;