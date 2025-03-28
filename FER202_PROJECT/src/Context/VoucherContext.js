import React, { createContext, useState } from 'react';

export const VoucherContext = createContext();
// nhập mã giảm giá để được giảm giá
export const VoucherProvider = ({ children }) => {
    const [discount, setDiscount] = useState(0);
    

    const applyVoucher = (code) => {
        const validVoucher = {
            "DISCOUNT10": 10, // Giảm 10%
            "DISCOUNT20": 20, // Giảm 20%
        };
        if (validVoucher.hasOwnProperty(code)) {
            setDiscount(validVoucher[code]); // Giảm giá 10%
            return true;
        } else {
            setDiscount(0);
            return false;
        }
    };

    return (
        <VoucherContext.Provider value={{ discount, applyVoucher }}>
            {children}
        </VoucherContext.Provider>
    );
};
