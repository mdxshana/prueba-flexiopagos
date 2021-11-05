
export interface LabourstatInterface {
  directContractors:Array<DetailRowInteface>;
  providers:Array<DetailRowInteface>;
  total: Array<DetailRowInteface>;
}


export interface DetailRowInteface {
  complianceStats:any;
  grossPayTotal:number;
  complianceScore?:number;
  workForce?:number;
  labourCostTotal: number;
  name:string;
  payrollAdminTotal:number;
  providerId:number;
  rebatesTotal:number;
  workerCount:number;
}


