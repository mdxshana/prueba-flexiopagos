import {Component, OnInit} from '@angular/core';
import {CostService} from "./services/cost.service";
import {DetailRowInteface, LabourstatInterface} from "./models/labourstat.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataTable: Array<DetailRowInteface> = [];
  dataPrincipal: any = null;
  sortAsc = true;
  field = 'name';

  constructor(private _costService: CostService) {
  }

  ngOnInit(): void {
    this._costService.getData().subscribe((resp: Array<LabourstatInterface>) => {
      this.dataPrincipal = resp[0];
      this.dataPrincipal.directContractors.forEach((data: DetailRowInteface) => {
        this.dataAdjust(data);
      });
      this.dataPrincipal.providers.forEach((data: DetailRowInteface) => {
        this.dataAdjust(data);
      });
      this.dataPrincipal.total.forEach((data: DetailRowInteface) => {
        this.dataAdjust(data);
      });
      this.orderFinally('name', this.sortAsc);
    });
  }

  dataAdjust(data: DetailRowInteface) {
    data.grossPayTotal = Math.round(data.grossPayTotal / 100);
    data.labourCostTotal = Math.round(data.labourCostTotal / 100);
    data.complianceScore = data.complianceStats ? Math.round(data.complianceStats.Total) : 0;
    data.workForce = data.workerCount*100/this.dataPrincipal.total[0].workerCount;
    data.workForce = Number((Math.round(data.workForce * 10) / 10).toFixed(1));
    return data;
  }





  order(arrayRow: Array<DetailRowInteface>) {
    arrayRow.sort((a: any, b: any) => {
      if(typeof  a[this.field] == 'number'){
        return (a[this.field] > b[this.field]) ? 1 : (b[this.field] > a[this.field]) ? -1 : 0;
      }else{
        return (a[this.field].toLowerCase() > b[this.field].toLowerCase()) ? 1 : (b[this.field].toLowerCase() > a[this.field].toLowerCase()) ? -1 : 0;
      }
    })
    if (!this.sortAsc) {
      arrayRow = arrayRow.reverse();
    }
    return arrayRow;
  }

  orderFinally(field: string, order: boolean) {
    this.dataTable = [];
    if (this.field == field) {
      this.sortAsc = order;
    } else {
      this.sortAsc = true;
    }
    this.field = field;
    if (field == 'name') {
      this.dataPrincipal.directContractors = this.order(this.dataPrincipal.directContractors);
      this.dataPrincipal.providers = this.order(this.dataPrincipal.providers);
      this.dataTable = [...this.dataPrincipal.directContractors, ...this.dataPrincipal.providers];
    } else {
      this.dataTable = [...this.dataPrincipal.directContractors, ...this.dataPrincipal.providers];
      this.dataTable = this.order(this.dataTable);
    }
  }

  getOrder(field:string){
    if(this.field == field){
      if(this.sortAsc){
        return `<i class="fas fa-angle-up"></i>`
      }else{
        return `<i class="fas fa-angle-down"></i>`
      }
    }else {
      return
    }
  }
}
