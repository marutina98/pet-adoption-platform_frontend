import { Injectable } from '@angular/core';

import { Age } from './../interfaces/age';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  getAgeLabelFromDays(ageInDays: number): string {

    // average number of days in a year
    // and in a month (it doesn't account
    // for leap years)

    const daysInYear = 365;
    const daysInMonth = 30;

    // calculate years

    const years = Math.floor(ageInDays / daysInYear);
    const daysAfterYears = ageInDays % daysInYear;

    // calculate months

    const months = Math.floor(daysAfterYears / daysInMonth);
    const days = daysAfterYears % daysInMonth;

    const age = { years, months, days };

    return age.years > 0  ? `${age.years} year${age.years > 1 ? 's' : ''}` :
           age.months > 0 ? `${age.months} month${age.months > 1 ? 's' : ''}` :
           age.days > 0   ? `${age.days} day${age.days > 1 ? 's' : ''}` :
                        '0 days';

  }

  getAgeLabelFromString(birthdate: string): string {

    const age = this.getAgeFromBirthdate(birthdate);

    return age.years > 0  ? `${age.years} year${age.years > 1 ? 's' : ''}` :
           age.months > 0 ? `${age.months} month${age.months > 1 ? 's' : ''}` :
           age.days > 0   ? `${age.days} day${age.days > 1 ? 's' : ''}` :
                        '0 days';

  }

  getAgeFromObjectInDays(age: Age): number {

    // average number of days in a year
    // and in a month (it doesn't account
    // for leap years)

    const daysInYear = 365;
    const daysInMonth = 30;

    // convert years in days
    // convert months in days
    // add remaining days

    return (age.years * daysInYear) + (age.months * daysInMonth) + age.days;

  }

  getAgeFromBirthdate(birthdate: string) {

    // get current date
    // convert string to date

    const now = new Date();
    const date = new Date(birthdate);

    // validate birthdate

    // if (isNaN(date.getTime())) throw new Error('Invalid Birthdate');

    // calculate difference

    let years = now.getFullYear() - date.getFullYear();
    let months = now.getMonth() - date.getMonth();
    let days = now.getDate() - date.getDate();

    // adjust for negative days
    // adjust for negative months

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // return object

    return { years, months, days };

  }

}
