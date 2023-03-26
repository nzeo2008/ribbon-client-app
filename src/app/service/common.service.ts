import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getDate(dateToken: string) {
    const date = new Date(dateToken);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    return `${day}/${month}/${year} г.`;
  }

  getDateTime(dateToken: string) {
    const date = new Date(dateToken);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}, ${day}/${month}/${year} г.`;
  }
}
