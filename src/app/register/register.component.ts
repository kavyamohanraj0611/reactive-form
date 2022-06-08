import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private formBuilder : FormBuilder) {   }

  ngOnInit(): void {

    this.registerForm=this.formBuilder.group({
      'fullname':new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]{1,15}$')]),
      'age':new FormControl('',[Validators.required,Validators.min(18),Validators.max(60)]),
      'gender':new FormControl('',Validators.required),
      'department':new FormControl('',Validators.required),
      'role':new FormControl('Support')  //setting value directly
    })

    //Setting the default values for form using setValue()
    //must include all the keys

    // const detailsObj={
    //   'fullname':'',
    //   'age':21,
    //   'gender':'',
    //   'department':'',
    //   'role':'Support'
    // }
    // this.registerForm.setValue(detailsObj)
    
    //Setting values using patchValue()
    //only required fields can be set

    const detailsObj={
      //'age':25,
      'role':'Developer'
    }
    this.registerForm.patchValue(detailsObj)

    //tracking the status of the form
    this.registerForm.statusChanges.subscribe(data=>{
      console.log(`Form Status : ${data}`)
    })

  }

  submitForm(){
    console.log(this.registerForm.value)
    //Reading the value of specific form-control
    console.log(this.registerForm.get('fullname').value)
  }
  success(){
    if(this.registerForm.valid)
    alert("Successfully registerd");
    else
    alert("Please fill the required fields correctly")
  }
  resetForm(){
    this.registerForm.reset();
  }
  //tracking value changes in form
  trackChange(){
    this.registerForm.get("fullname").valueChanges.subscribe(data=>{
      console.log(data)
    })
  }
  
  get fullname(){
    return this.registerForm.get('fullname')
  }
  get age(){
    return this.registerForm.get('age')
  }
  get gender(){
    return this.registerForm.get('gender')
  }
  get department(){
    return this.registerForm.get('department')
  }
  
}

