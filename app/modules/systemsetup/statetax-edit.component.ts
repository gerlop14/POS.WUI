import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-statetax-edit',
  templateUrl: './statetax-edit.component.html'
})
export class StateTaxEditComponent {
  public statetax: StateTax;
  form: FormGroup;
  editMode: boolean;
  isBusy = false;
  activityLog: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    ) {

    // create an empty object from the Question interface
    this.statetax = <StateTax>{};

    // initialize the form
    this.createForm();

    var id = this.activatedRoute.snapshot.params["id"];

    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if (this.editMode) {
      var url = "https://localhost:44390/api/statetax/" + id;
      this.http.get<StateTax>(url).subscribe(res => {
        this.statetax = res;
        //update the form with the question value
        this.updateForm();
      }, error => console.error(error));
    }
    else {

    }
  }


  createForm() {
    this.form = this.fb.group({
      stateTaxId: ['', Validators.required],
      taxAmount: ['', Validators.required]
    });

    this.activityLog = '';

    //react to form changes
    this.form.valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          this.log("Form Model has been loaded.");
        }
        else {
          this.log("Form was updated by the user.");
        }
      });

    // react to changes in the form.Text control 
    this.form.get("taxAmount")!.valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          
        }
        else {
          
        }
      }); 

  }

  log(str: string) {
    this.activityLog += "[" + new Date().toLocaleString() + "] " + str + "<br />";
  }

  updateForm() {
    this.form.setValue({
      stateTaxId: this.statetax.stateTaxId || "",
      taxAmount: this.statetax.taxAmount || 0
    });
  }

  onSubmit() {

    //build a temporaty question object from form values
    var tempStateTax = <StateTax>{};
    tempStateTax.taxAmount = this.form.value.taxAmount;
    tempStateTax.stateTaxId = this.form.value.stateTaxId;

    var url = "https://localhost:44390/api/statetax/";

    if (this.editMode) {
      tempStateTax.stateTaxId = this.statetax.stateTaxId;
      this.http
        .put<StateTax>(url, tempStateTax)
        .subscribe(res => {
          var q = res;
          this.router.navigate(["/statetax"]);
        }, error => console.log(error));
    }
    else {
      this.http
        .post<StateTax>(url, tempStateTax)
        .subscribe(res => {
          var q = res;
          this.router.navigate(["/statetax"]);
        }, error => console.log(error));
    }
  }

  onBack() {
    this.router.navigate(["/statetax"]);
  }

  // retrieve a FormControl
  getFormControl(name: string) {
    return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  // returns TRUE if the FormControl has been changed
  isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }
  //async ngOnInit() {
  //  this.isBusy = true;
  //  try {
  //    this.statetaxes = await this.StateTaxService.loadStateTaxes();
  //  } finally {
  //    this.isBusy = false;
  //  }
  //}
}

