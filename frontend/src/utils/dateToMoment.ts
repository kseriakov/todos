import moment from "moment";

export const dateToMoment = (date: string): moment.Moment | null => {
    const mom = moment(date, "YYYY-MM-DD");
    return mom.isValid() ? mom : null
};
