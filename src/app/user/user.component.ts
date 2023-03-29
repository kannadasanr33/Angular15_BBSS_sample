import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private service: AuthService) {
    this.LoadUserWithDetails();
  }
  userlist: any;
  userDetailsList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadUserWithDetails() {
    // forkJoin implemented
    forkJoin({
        requestOne: this.service.GetallUsers(),
        requestTwo: this.service.GetallUsersDetails()
      })
      .subscribe(({requestOne, requestTwo}) => {
        this.userlist = requestOne;
        this.userDetailsList = requestTwo;
        this.dataSource = new MatTableDataSource(this.userlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.table(this.userDetailsList);
      });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'phone', 'website'];

}
