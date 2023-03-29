import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  rolelist: any;
  editdata: any;
  itemId: any;
  item: any;
  registerform: FormGroup;
  constructor(private builder: FormBuilder, 
    private _router: Router,
    private _route: ActivatedRoute,
    private service: AuthService,
    private toastr: ToastrService) {
      this.registerform = this.builder.group({
        id: this.builder.control(''),
        name: this.builder.control(''),
        password: this.builder.control(''),
        email: this.builder.control(''),
        role: this.builder.control('', Validators.required),
        isactive: this.builder.control(true)
      });
    this.itemId = this._route.snapshot.paramMap.get('id');
    console.log(this.itemId, 'this.itemId');
    if(this.itemId) {
      this.service.GetUserbyId(this.itemId).subscribe( res => {
        this.item = res;
        console.log(this.item);
        this.loaduserdata(this.item);
      });
    }
  }

  
  ngOnInit(): void {
    if (this.itemId != '' && this.itemId != null) {
      this.service.GetUserbyId(this.itemId).subscribe( res => {
        this.item = res;
        console.log(this.item);
        this.loaduserdata(this.item);
      });
    }
    
  }  

  loaduserdata(data: any) {   
      this.registerform.setValue({
        id: data.id, 
        name: data.name,
        password: data.password, 
        email: data.email, 
        role: data.role, 
        isactive: data.isactive
      });
  }

}
