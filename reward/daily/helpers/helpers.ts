

/**
 * Removes the time and returns the date value with only Day, Month and Year
 * @param date 
 * @returns string
 */
export function getDMYDate(date: Date): Date {
    const offset = date.getTimezoneOffset();
    const offsetDate = new Date(date.getTime() + (offset * 60 * 1000));
    const isoOffsetDate = offsetDate.toISOString().split('T')[0];
    return new Date(isoOffsetDate);
}

export const dayTime = 1000 * 60 * 60 * 24;

export function getWeekDatesNormalize(): Date[] {
    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() - 3);

    const dates = [
        getDMYDate(minimumDate),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime))),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime * 2))),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime * 3))),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime * 4))),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime * 5))),
        getDMYDate(new Date(minimumDate.getTime() + (dayTime * 6))),
    ];
    
    return dates;
}