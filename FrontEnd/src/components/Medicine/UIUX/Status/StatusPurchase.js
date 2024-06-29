import '../../SCSS/Status.scss';

const Status = ({statusId, statusName}) => {

    let status = '';
    if( statusId === 1 ){
        status = 'success';
    } else if( statusId === 6){
        status = 'cancel';
    } else {
        status = 'loading';
    }
    return (
        <>
            <span className={`text-status ${status}`}>
                {statusName}
            </span>
        </>
    );
};

export default Status;
