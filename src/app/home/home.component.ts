import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  isList = true;
  userRole: any;
  constructor(
    private builder: FormBuilder, 
    private service: AuthService, 
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.LoadUser();
    this.userRole = sessionStorage.getItem('role');
    console.log(this.userRole, 'this.userRole');
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'action'];

  adduser() {
    this.isList = false;
    console.log('New');
    this._router.navigate([`register`]);
        // this._router.navigate([`/crop-management/harvested-crop-detail/${this.cropID}`]);

  }
  updateuser(id: any) {
    this.isList = false;
    console.log(id);
    this._router.navigate([`edit/${id}`]);
  }
  viewuser(id: any) {
    console.log(id);
    this._router.navigate([`view/${id}`]);
  }

  removeuser(id: any) {
    console.log(id);
  }
  
}
