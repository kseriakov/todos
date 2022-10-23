import moment from "moment";

export const dateToMoment = (date: string): moment.Moment => {
    return moment(date, "DD-MM-YYYY");
};
