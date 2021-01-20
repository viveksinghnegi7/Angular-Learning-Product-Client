import { Component, OnInit } from '@angular/core';  
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
 
//import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public service: UserService,
    //private departmentService: DepartmentService,
    //private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserComponent>) { }

  ngOnInit(): void {
    //this.service.getAllUsers(); 
  } 

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.get('userId').value == 0)
      this.insertRecord(this.service.form.value);
    else
      this.updateRecord(this.service.form.value);
    this.service.form.reset();
    this.service.initializeFormGroup();
   // this.notificationService.success(':: Submitted successfully'); 
     
  }
   
  insertRecord(form: any) {
    this.service.insertUser(form).subscribe(
      res => {
        debugger; 
        //this.toastr.success('Submitted successfully', 'Payment Detail Register');
        this.service.refresh().subscribe();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: any) {
    this.service.updateUser(form).subscribe(
      res => { 
        //this.toastr.info('Submitted successfully', 'Payment Detail Register'); 
        this.service.refresh().subscribe();
      },
      err => {
        console.log(err);
      }
    )
  }
 

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

