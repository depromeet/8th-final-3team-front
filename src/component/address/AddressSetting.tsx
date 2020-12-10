import React from 'react';
import { useLocation } from 'react-router-dom';
import { AddressProps } from '../../apis/findAddress';
import { useContextDispatch, useContextState } from '../context/Context';
import back from '../../icon/ic_arrow_left.png';

const AddressSetting: React.FC = () => {
    const location = useLocation();
    const address = location.state as AddressProps;
    const state = useContextState();
    const dispatch = useContextDispatch();

    return (
        <div className="header__address">
            <div className="header__address-title">
                <img src={back} alt="back" className="header__address-back"></img>
                <h1>주소 설정</h1>
                <span></span>
            </div>
            <div className="header__address-search"></div>
            <div className="header__address-buttons"></div>
        </div>
    );
};

export default AddressSetting;
