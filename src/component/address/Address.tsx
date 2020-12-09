import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddressProps } from '../../apis/findAddress';
import arrowDown from '../../icon/ic_arrow_down.png';
import IncompleteModal from '../incomplete/IncompleteModal';

const Address: React.FC<AddressProps> = (address) => {
    const history = useHistory();
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        history.push('/address', address);
    };

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <header>
            <div className="address" onClick={handleModalOpen}>
                <span> {address.address.address_name} </span>
                <img src={arrowDown} alt="arrowDown"></img>
            </div>
            {isOpen ? <IncompleteModal isOpen={isOpen} handleClose={handleModalClose}></IncompleteModal> : null}
        </header>
    );
};

export default Address;
