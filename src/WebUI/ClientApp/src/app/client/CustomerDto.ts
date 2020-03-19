export class CustomerDto {
  public customerID: number;
  public name: string;
  public pAN: string;
  public addressPremises: string;
  public adressLine1: string;
  public addressLine2: string;
  public city: string;
  public pinCode: string;
  public mobileNo: string;
  public emailID: string;
  public dateOfBirth: Date;
  public stateID_FK: number;
  public isTracesRegistered: boolean;
  public tracesPassword: string;
}

//export class CustomerShareList {
//  public customerID?: number;
//  public name: string | undefined;
//  public share: string | undefined;
//  public form16b?: number | undefined;
//}

export interface CustomerShareList {
  customerID?: number;
  name: string | undefined;
  share: string | undefined;
  form16b?: number | undefined;
}
