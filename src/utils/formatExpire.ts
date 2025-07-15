import { formatDistanceStrict, isAfter } from "date-fns";

export const formatExpire = (expireIn: string) => {
    if (!expireIn) {
        return "-";
    }
    const falta = formatDistanceStrict(new Date(), expireIn, {
        unit: "minute",
    });

    const expired = isAfter(new Date(), expireIn);
    const addLess = expired ? "-" : "";

    const minutes = Number(falta.split(" ")[0]);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${addLess}${hours}H:${remainingMinutes}M`;
};