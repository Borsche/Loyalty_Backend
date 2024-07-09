"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDatesNormalize = exports.dayTime = exports.getDMYDate = void 0;
/**
 * Removes the time and returns the date value with only Day, Month and Year
 * @param date
 * @returns string
 */
function getDMYDate(date) {
    const offset = date.getTimezoneOffset();
    const offsetDate = new Date(date.getTime() + (offset * 60 * 1000));
    const isoOffsetDate = offsetDate.toISOString().split('T')[0];
    return new Date(isoOffsetDate);
}
exports.getDMYDate = getDMYDate;
exports.dayTime = 1000 * 60 * 60 * 24;
function getWeekDatesNormalize() {
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() - 3);
    const dates = [
        getDMYDate(minimumDate),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime))),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime * 2))),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime * 3))),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime * 4))),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime * 5))),
        getDMYDate(new Date(minimumDate.getTime() + (exports.dayTime * 6))),
    ];
    return dates;
}
exports.getWeekDatesNormalize = getWeekDatesNormalize;
