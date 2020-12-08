import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddressResponse } from '../../apis/findAddress';
import arrowDown from '../../icon/ic_arrow_down.png';

const Address: React.FC<AddressResponse> = (address) => {
    const history = useHistory();

    console.log(address);
    const handleClick = () => {
        history.push('/address');
    };

    return (
        <header>
            <div className="address" onClick={handleClick}>
                <span> 찾았다 </span>
                <img src={arrowDown} alt="arrowDown"></img>
            </div>
        </header>
    );
};

export default Address;
