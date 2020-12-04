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

const wheels = [WHEEL1, WHEEL2, WHEEL3, WHEEL4, WHEEL5, WHEEL6];

const TurntableSix: React.FC = () => {
    const [isNormal, setNormal] = useState(true);
    const [index, setIndex] = useState(0);

    const totalSpinTime = 4000 + (Math.random() % wheels.length) * 500;
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
            setTimeout(() => setNormal(true), 2000);

            return;
        }
        setIndex(index);
        console.log(spinTime, totalSpinTime, index);
        timer = setTimeout(() => rotateWheel((index + 1) % wheels.length), 50 + acc);
    };

    const handleClickButton = () => {
        if (isNormal) {
            rotateWheel(0);
            setNormal(false);
        }
    };

    return (
        <div className="turntable">
            <img src={isNormal ? WHEEL_NORMAL : wheels[index]} alt="Turntable"></img>
            <img
                className="roulette_button"
                src={!isNormal ? ROULETTE_BUTTON_PRESSED : ROULETTE_BUTTON}
                width="88"
                onClick={handleClickButton}
            />
        </div>
    );
};

export default TurntableSix;
