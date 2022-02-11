import React from 'react';

const Button = ({disabled = false, type="primary", children, onClick, classes, formType}) => {
    return (
        <button disabled={disabled} type={formType} style={{height: "40px"}} onClick={onClick} className={`btn btn-${type} ${classes}`}>{children}</button>
    );
};

export default Button;
