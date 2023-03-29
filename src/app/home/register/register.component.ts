import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rolelist: any;
  editdata: any;
  itemId: any;
  item: any;
  registerform: FormGroup;
  isEdit= false;
  constructor(private builder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService,
    private toastr: ToastrService) {
      this.service.getuserrole().subscribe(res => {
        this.rolelist = res;
      });
      this.itemId = this.route.snapshot.paramMap.get('id');
      console.log(this.itemId, 'this.itemId');
      this.registerform = this.builder.group({
        id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
        name: this.builder.control('', Validators.required),
        password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
        email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
        role: this.builder.control('user'),
        isactive: this.builder.control(true)
      });
  }

  ngOnInit(): void {
    if (this.itemId != '' && this.itemId != null) {
      this.service.GetUserbyId(this.itemId).subscribe( res => {
        this.item = res;
        console.log(this.item);
        this.loaduserdata(this.item);        
        this.isEdit = true;
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
  proceedregister() {
    if (this.registerform.valid) {
      if(this.isEdit) {
        this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(result => {
          this.toastr.success('','Updated successfully')
          this.router.navigate(['/'])
        });
      } else {
        this.service.RegisterUser(this.registerform.value).subscribe(result => {
          this.toastr.success('Please contact admin for enable access.','Registered successfully')
          this.router.navigate(['/'])
        });
      }    
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
