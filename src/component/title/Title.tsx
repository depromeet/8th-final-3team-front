import React from 'react';
import EDIT_BTN from '../../icon/btn_edit@3x.png';

const Title: React.FC = () => {
    return (
        <div className="main__title">
            <h1 className="main__title-text">오늘 뭐먹지?</h1>
            <img src={EDIT_BTN} alt="edit" className="main__title-edit-icon" />
        </div>
    );
};

export default Title;
