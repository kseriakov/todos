export const reverseDate = (date: string): string => {
    const data = date.match(
        /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/
    )?.groups;
    return `${data?.day}-${data?.month}-${data?.year}`;
};
