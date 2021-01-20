import { Component, OnInit, ViewChild} from '@angular/core';  
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';  
import { MatSort } from '@angular/material/sort';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit { 
  constructor(private userService: UserService) { }  
  displayedColumns: string[] = ['userId', 'email', 'firstName', 'lastName']; 
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit(): void{
    this.userService.getAllUsers()
      .subscribe(response => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    
  }  
} 
 
 
 




 
