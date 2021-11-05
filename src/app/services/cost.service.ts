import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LabourstatInterface} from "../models/labourstat.interface";

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<Array<LabourstatInterface>>('http://localhost:6502/application/labourstats')
  }
}
