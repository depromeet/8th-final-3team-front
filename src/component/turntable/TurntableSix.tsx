import React, { useState } from 'react';
import WHEEL1 from '../svg/six_wheel/wheel_1.svg';
import WHEEL2 from '../svg/six_wheel/wheel_2.svg';
import WHEEL3 from '../svg/six_wheel/wheel_3.svg';
import WHEEL4 from '../svg/six_wheel/wheel_4.svg';
import WHEEL5 from '../svg/six_wheel/wheel_5.svg';
import WHEEL6 from '../svg/six_wheel/wheel_6.svg';
import WHEEL_NORMAL from '../svg/six_wheel/wheel_normal.svg';
import ROULETTE_BUTTON from '../../icon/roulette_button.png';
import ROULETTE_BUTTON_PRESSED from '../../icon/roulette_button_pressed.png';
import { Button, makeStyles, Modal, withStyles } from '@material-ui/core';
import { CATEGORIES } from '../../utils/Constant';
import { NearRestaurantProps, RestaurantDetail } from '../home/Home';
import { useHistory } from 'react-router-dom';

const wheels = [WHEEL1, WHEEL2, WHEEL3, WHEEL4, WHEEL5, WHEEL6];

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
        outline: 'none',
    },
}));

const AgreeButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#FD4145'),
        fontWeight: 'bold',
        backgroundColor: '#FD4145',
        '&:hover': {
            backgroundColor: '#FD4145',
        },
        width: 143,
        height: 40,
        borderRadius: 8,
        fontSize: 17,
    },
}))(Button);

const DisAgreeButton = withStyles((theme) => ({
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

const TurntableSix: React.FC<NearRestaurantProps> = (nearRestaurantProps) => {
    const history = useHistory();
    const styles = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [isNormal, setNormal] = useState(true);
    const [isFinish, setFinish] = useState(false);
    const [index, setIndex] = useState(0);

    const handleClose = () => {
        setFinish(false);
    };

    const handleAgree = () => {
        const restaurantProps: RestaurantDetail = {
            id: nearRestaurantProps.restaurants[index].id,
            name: nearRestaurantProps.restaurants[index].name,
            count: nearRestaurantProps.restaurants[index].count,
            icon: nearRestaurantProps.restaurants[index].icon,
            nowLatitude: nearRestaurantProps.restaurants[index].nowLatitude,
            nowLongitude: nearRestaurantProps.restaurants[index].nowLongitude,
            restaurants: nearRestaurantProps.restaurants[index].restaurants,
        };
        history.push(
            `/restaurants/${restaurantProps.id}?latitude=${restaurantProps.nowLatitude}&longitude=${restaurantProps.nowLongitude}&total=${restaurantProps.count}`,
            { restaurants: restaurantProps.restaurants }
        );
    };

    const totalSpinTime = 4000 + Math.random() * wheels.length * 500;
    let spinTime = 0;
    let timer: NodeJS.Timer;
    let acc = 0;

    const rotateWheel = (index: number) => {
        spinTime += 50 + acc;
        if (spinTime > 2000) {
            acc += 10;
        }

        if (spinTime >= totalSpinTime) {
            clearTimeout(timer);
            setTimeout(() => {
                setNormal(true);
                setFinish(true);
            }, 2000);
            return;
        }
        setIndex(index);
        timer = setTimeout(() => rotateWheel((index + 1) % wheels.length), 50 + acc);
    };

    const handleClickButton = () => {
        if (isNormal) {
            rotateWheel(0);
            setNormal(false);
        }
    };

    const body = (
        <div style={modalStyle} className={styles.paper}>
            <div className="modal__title">
                <img src={CATEGORIES[index].icon} alt="menu__image"></img>
                <h1>{CATEGORIES[index].name} 당첨!</h1>
            </div>
            <div className="modal__body">
                <DisAgreeButton onClick={handleClose}>다시 돌리기</DisAgreeButton>
                <AgreeButton onClick={handleAgree}>음식점 보기</AgreeButton>
            </div>
        </div>
    );

    return (
        <div className="turntable">
            <img src={isNormal ? WHEEL_NORMAL : wheels[index]} alt="Turntable"></img>
            <img
                className="roulette_button"
                src={!isNormal ? ROULETTE_BUTTON_PRESSED : ROULETTE_BUTTON}
                width="88"
                onClick={handleClickButton}
                alt="roulette_button"
            />
            <Modal open={isFinish} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    );
};

export default TurntableSix;
