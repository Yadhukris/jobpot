import { Component, OnInit } from '@angular/core';
import { AlumniService } from '../alumni.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { alumnimodel } from './alumni.model';

@Component({
  selector: 'app-alumni-home',
  templateUrl: './alumni-home.component.html',
  styleUrls: ['./alumni-home.component.css']
})
export class AlumniHomeComponent implements OnInit {
  alumnidata =

    { 
      uname: '',
      email: '',
      password: '',
      hq: '',
      city: ''
    }


  // user = {
  //   email: '',
  //   password: ''
  // }

  constructor(private alumniservice: AlumniService, private _auth: AuthService, private router:Router) { }

  ngOnInit(): void {

    // this.alumniservice.getalumnidetails().subscribe((data) => {
    //   this.alumnidata = JSON.parse(JSON.stringify(data));
    //   console.log(this.alumnidata)
    // })

    let email = localStorage.getItem("getuseremail")
    this.alumniservice.getalumnidetails(email).subscribe((data) => {
      this.alumnidata = JSON.parse(JSON.stringify(data));
      console.log(this.alumnidata)
    }) 

  }

  updatealumni(alumnidata:any){ 
    localStorage.setItem("getalumniid", alumnidata._id.toString());
    this.router.navigate(['alumni/update']);

  }


  // getdata(user: any) {
  //   localStorage.setItem("getuserid", user._id.toString());
  //   this.router.navigate(['update']);

  // } 

}


