import { Button, makeStyles, Modal, withStyles } from '@material-ui/core';
import React, { useState } from 'react';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 335,
        height: 124,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
    },
}));

const CloseButton = withStyles((theme) => ({
    root: {
        color: '#FD4145',
        fontWeight: 'bold',
        backgroundColor: 'white',
        border: '1px solid #FD4145',
        width: 143,
        height: 40,
        borderRadius: 8,
        fontSize: 17,
        marginRight: 9,
    },
}))(Button);

const IncompleteModal: React.FC = () => {
    const styles = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [isClose, setClose] = useState(false);

    const handleClose = () => {
        setClose(true);
    };

    const body = (
        <div style={modalStyle} className={styles.paper}>
            <div className="modal__title">구현 중</div>
            <div className="modal__body">
                <CloseButton onClick={handleClose}>닫기</CloseButton>
            </div>
        </div>
    );

    return <Modal open={isClose}>{body}</Modal>;
};

export default IncompleteModal;
