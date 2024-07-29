import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  header: any = null;
  constructor(private appservice:AppServiceService, private router:Router){}
  ngOnInit(): void {
    this.appservice.getAllHeader().subscribe(
      (header: any) => {
        this.header = header; 
        console.log(this.header);
      },
      (err) => {
        console.log(err.status);
      }
    );

  }

  LoggedIn()
  {
   return  localStorage.getItem('token')
  }

  LogoutUser()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
    localStorage.removeItem('user')
    this.router.navigate(['/security/login']);
  }


}
