const dateToString = (date: Date | undefined): string => {
    if (!date) {
        return "";
    }

    const year = `${date.getFullYear()}`;
    const month =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;

    const day =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    return `${day}-${month}-${year}`;
};
export default dateToString;
