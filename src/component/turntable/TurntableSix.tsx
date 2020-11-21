import React from 'react';
import TurntableNormalSVG from '../svg/six_wheel/6wheel_nomal.svg';

const TurntableSix: React.FC = () => {
    return (
        <div className="turntable">
            <img src={TurntableNormalSVG} alt="Turntable"></img>
        </div>
    );
};

export default TurntableSix;
