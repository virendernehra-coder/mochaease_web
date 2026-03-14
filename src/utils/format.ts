export const formatCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currency, 
        maximumFractionDigits: 0 
    }).format(val);
};

export const formatCompactNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(val);
};

export const formatCompactCurrency = (val: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(val);
};

export const formatPercentage = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(val) + '%';
};
