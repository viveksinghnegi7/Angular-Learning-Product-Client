import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from "../../models/Users";
import { UserService } from "../../services/user.service";
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { Observable, throwError } from "rxjs";

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  constructor(private userService: UserService, private dialog: MatDialog) {
    dialog.afterAllClosed
      .subscribe(() => {
        // update a variable or call a function when the dialog closes
        console.log("Ouch");
        this.populateUserData();
      }
      );
  }
  displayedColumns: string[] = ['userId', 'email', 'firstName', 'lastName', 'actions']; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchKey: string;
  dataSource: any;

  ngOnInit(): void {
    this.populateUserData();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent, dialogConfig);
  }

  onEdit(row) {
    this.userService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent, dialogConfig);
  }

  onDelete(userId:any):void {
    if (confirm('Are you sure to delete this record ?')) {
      this.userService.deleteUser(userId).subscribe(res => {
        //debugger;
        this.refresh();
        //this.toastr.warning('Deleted successfully', 'Payment Detail Register');
      },
        err => {
          //debugger;
          console.log(err);
        });
      console.log("out");
      //this.notificationService.warn('! Deleted successfully');
      this.refresh(); 
    }
  }

  refresh() { 
    this.userService.getAllUsers().toPromise()
      .then(res => this.dataSource = res as Users[]);
  }

  populateUserData() { 
    this.userService.getAllUsers()
      .subscribe(response => {
        console.log(response + "helllllll");
        //this.dataSource = response; 
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      }); 
  }
}








