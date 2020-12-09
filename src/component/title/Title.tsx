import React, { useState } from 'react';
import EDIT_BTN from '../../icon/btn_edit@3x.png';
import IncompleteModal from '../incomplete/IncompleteModal';

const Title: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {};

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <div className="main__title">
            <h1 className="main__title-text">오늘 뭐먹지?</h1>
            <img src={EDIT_BTN} alt="edit" className="main__title-edit-icon" onClick={handleModalOpen} />
            {isOpen ? <IncompleteModal isOpen={isOpen} handleClose={handleModalClose}></IncompleteModal> : null}
        </div>
    );
};

export default Title;
