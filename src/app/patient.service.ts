import { Injectable } from '@angular/core';
import { patient } from './models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients() : patient[] {
   
    return [
      new patient(
        '1',
        'Alfred',
        'Smith',
        '01/01/1950',
        '111-123-1234'),
      new patient(
        '1',
        'Bob',
        'Thomas',
        '02/01/1960',
        '222-123-1234'),
      new patient(
        '1',
        'Carla',
        'Brown',
        '03/01/1970',
        '333-123-1234'),
      new patient(
        '1',
        'Danielle',
        'Jackson',
        '04/01/1980',
        '444-123-1234'),                      
      new patient(
        '1',
        'Ester',
        'Larson',
        '05/01/1990',
        '555-123-1234')                 
      ];
  }

}
