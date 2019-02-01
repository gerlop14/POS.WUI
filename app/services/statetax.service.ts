import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StateTaxService {
  private readonly apiUri = environment.APIbaseUrl;
  constructor(private readonly http: HttpClient) { }

  loadStateTaxes(): Promise<StateTax[]> {
    return this.http
      .get(`${this.apiUri}statetax/all`)
     
      .toPromise()
      .then(result => result as StateTax[]);
  }

  //loadProduct(id: number) {
  //  return this.http
  //    .get(`${this.apiUri}products/${id}`)
  //    .toPromise()
  //    .then(result => result as Product);
  //}

  //addProduct(product: NewProduct) {
  //  return this.http
  //    .post(`${this.apiUri}products/slim`, product)
  //    .toPromise()
  //    .then(result => result as Product);
  //}
}

