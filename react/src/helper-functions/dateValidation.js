export const startDateValidation = (startDate, endDate) => {
    return startDate ? startDate : new Date(endDate - 29 * 24 * 60 * 60 * 1000).setHours(3, 0, 0, 0);
};
export const endDateValidation = endDate => {
    return endDate ? endDate : Date.now();
};
