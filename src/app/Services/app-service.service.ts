import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
 
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService,private router:Router ) { }

  sendEmail(emailRequest: any) {
    this.http.post('https://localhost:7272/api/Email/send-email', emailRequest).subscribe(
      (resp: any) => {
        console.log('Email sent successfully');
      },
      (err) => {
        console.log('Error sending email');
      }
    );
  }
  
    //users table
  createUserSuccessMessage: string = '';
  CreateUser(body:any){
    this.spinner.show();
    body.Image_Name=this.uploadUserImage;
    this.http.post('https://localhost:7272/api/Users',body).subscribe((resp:any)=>{
      this.createUserSuccessMessage='Created Successfully';
      this.toastr.success('Created Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  }
  users:any=[{}];
  getAllUsers(){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Users').subscribe((resp:any)=>{
      this.users=resp;
      console.log(this.users);
      this.toastr.success('Users Retreived Successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  
  }
  GetAllUsers():Observable<any>{
    return this.http.get('https://localhost:7272/api/Users');
  }

  reports:any=[{}];
  report(){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Users/Report').subscribe((resp:any)=>{
      this.reports=resp;
      console.log(this.reports);
      this.toastr.success('reports Retreived Successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  
  }
  Report():Observable<any>{
    return this.http.get('https://localhost:7272/api/Users/Report');
  }







  deleteUser(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/Users/Delete/'+id).subscribe((resp:any)=>{
      console.log('Deleted Successfully');
      this.toastr.success('Deleted Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  userbyid:any={};
  getUserById(id:number){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Users/GetUserById/'+id).subscribe((resp:any)=>{
      this.userbyid=resp;
      console.log(this.userbyid);
      this.toastr.success('User Retreived Successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }

  GetUserById(id:number):Observable<any>{
    return this.http.get('https://localhost:7272/api/Users/GetUserById/'+id);
  }

  userbyname:any={};
  getUserByName(name:string){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Users/GetUserByName/'+name).subscribe((resp:any)=>{
      this.userbyname=resp;
      console.log(this.userbyname);
      this.toastr.success('User Retreived Successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  GetUserByName(name:string):Observable<any>{
    return this.http.get('https://localhost:7272/api/Users/GetUserByName/'+name);
  }
  updateUser(body: any){
    this.spinner.show();
    console.log("update user",body.image_Name);
    this.http.put('https://localhost:7272/api/Users',body).subscribe((resp:any)=>{
      this.toastr.success('Updated Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  // user image
  uploadUserImage:any;
  uploadAttachment(file:FormData){
    this.http.post('https://localhost:7272/api/Users/uploadImage',file).subscribe((resp:any)=>{
      console.log("Resp Upload function",resp);//for testing
      this.uploadUserImage=resp.image_Name;//because the object just contain an image only as string
    },err=>{
      console.log('Something went wrong'+err.message);
    });

  }
  //we should test the code below
  // numberOfRegisteredUsers: number = 0;
  // getNumberOfRegisteredUsers(){
  //   this.http.get('https://localhost:7272/api/Users/NumberOfRegisteredUsers').subscribe(
  //     (resp: any) => {
  //       this.numberOfRegisteredUsers = resp; 
  //       console.log(this.numberOfRegisteredUsers);
  //     },
  //     (err) => {
  //       console.log(err.status);
  //     }
  //   );
  // }
  getNumberOfRegisteredUsers(): Observable<number> {
    return this.http.get<number>('https://localhost:7272/api/Users/NumberOfRegisteredUsers');
  }  
  //flight table
  createflightSuccessMessage: string = '';
  CreateFlight(body:any){
    this.spinner.show();
    body.Image_Name=this.uploadFlightImage;
    this.http.post('https://localhost:7272/api/Flight',body).subscribe((resp:any)=>{
      this.createflightSuccessMessage='Created Successfully';
      this.toastr.success('Created Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
    
  }
  flights:any=[{}];
  getAllFlights(){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Flight').subscribe((resp:any)=>{
      this.flights=resp;
      this.toastr.success('Flights Retreived Successfully');
      console.log(this.flights);
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  GetAllFlights():Observable<any> {
    return this.http.get('https://localhost:7272/api/Flight');
  }
  deleteFlight(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/Flight/Delete/'+id).subscribe((resp:any)=>{
      console.log('Deleted Successfully');
      this.toastr.success('Deleted Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  flightbyid:any={};
  getFlightById(id: number): Observable<any> {
    return this.http.get<any>('https://localhost:7272/api/Flight/GetFlightById/' + id);
  }
  GetFlightById(id:number):Observable<any>{
    return this.http.get('https://localhost:7272/api/Flight/GetFlightById/'+id);
  }
  updateFlight(body: any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Flight',body).subscribe((resp:any)=>{
      this.toastr.success('Updated Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
    // Flight image
    uploadFlightImage:any;
    uploadAttachmentFlight(file:FormData){
      this.spinner.show();
      this.http.post('https://localhost:7272/api/Flight/uploadImage',file).subscribe((resp:any)=>{
        console.log("Resp Upload function" , resp);//for testing
        this.uploadFlightImage=resp.image_Name;//because the object just contain an image only as string
        console.log(this.uploadFlightImage);
        this.toastr.success('Image Uploaded Successfully');
      },err=>{
        console.log('Something went wrong'+err.message);
        this.toastr.error('Error '+err.message);
      });
      this.spinner.hide();
  
    }
  //we should test the codes below
  // getFlightsWithMaxReservedSeats(){
  //   this.http.get('https://localhost:7272/api/Flight/GetFlightsWithMaxReservedSeats').subscribe((resp:any)=>{
  //     this.flights=resp;
  //     console.log(this.flights);
  //   },err=>{
  //     console.log(err.status);
  //   });

  // }
  getFlightsWithMaxReservedSeats(): Observable<any> {
    return this.http.get('https://localhost:7272/api/Flight/GetFlightsWithMaxReservedSeats');
  }
  flightsbetweeninterval:any=[{}];
  getFlightBetweenInterval(body:any){
    this.http.post('https://localhost:7272/api/Flight/GetFlightBetweenInterval',body).subscribe((resp:any)=>{
      this.flightsbetweeninterval=resp;
    },err=>{
      console.log('Something went wrong')
    });

  }
  flightsByName:any=[{}];
  getFlightByName(body:any){
    this.http.post('https://localhost:7272/api/Flight/GetFlightByName',body).subscribe((resp:any)=>{
      this.flightsByName=resp;
    },err=>{
      console.log('Something went wrong')
    });

  }
  flightsByAirportName:any=[{}];
  searchFlightsByAirportName(body:any){
    this.http.post('https://localhost:7272/api/Flight/SearchFlightsByAirportName',body).subscribe((resp:any)=>{
      this.flightsByAirportName=resp;
    },err=>{
      console.log('Something went wrong')
    });

  }
  GetChartData():Observable<any>{
    return this.http.get('https://localhost:7272/api/Flight/GetChartData');
  }

  //Airport table
  createairportSuccessMessage: string = '';
  createAirport(body:any)
  {
    this.spinner.show();
    this.http.post('https://localhost:7272/api/Airport',body).subscribe((resp:any)=>{
      this.createairportSuccessMessage='Created Successfully';  
      this.toastr.success('Created Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  airports:any=[{}];
  getAllAirports(){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Airport').subscribe((resp:any)=>{
      this.airports=resp;
      this.toastr.success('Airports Retreived Successfully');
      console.log(this.airports);
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  //to replace the id by name
  GetAllAirports():Observable<any> {
    return this.http.get('https://localhost:7272/api/Airport');
  }

  airportbyid:any={}
  getAirportById(id:number){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Airport/GetAirportById/'+id).subscribe((resp:any)=>{
      this.airportbyid=resp;
      this.toastr.success('Airport Retreived Successfully');
      console.log(this.airportbyid);
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  }
  deleteAirport(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/Airport/Delete/'+id).subscribe((resp:any)=>{
      console.log('Deleted Successfully');
      this.toastr.success('Deleted Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
  updateAirport(body: any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Airport',body).subscribe((resp:any)=>{
      this.toastr.success('Updated Successfully');
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();

  }
   //we should test the code below
  //  numberOfAirports: number = 0;
  // getNumberOfAirports(){
  //   this.http.get('https://localhost:7272/api/Airport/NumberOfAirports').subscribe(
  //     (resp: any) => {
  //       this.numberOfAirports = resp; 
  //       console.log(this.numberOfAirports);
  //     },
  //     (err) => {
  //       console.log(err.status);
  //     }
  //   );
  // }
  getNumberOfAirports(): Observable<number> {
    return this.http.get<number>('https://localhost:7272/api/Airport/NumberOfAirports');
  }
  
  //_______Testimonial_______
    testimonial:any=[{}];
    getAlltestimonials()
    {
      this.spinner.show();
     this.http.get('https://localhost:7272/api/Testimonial').subscribe((resp:any)=>{
        this.testimonial=resp;
        console.log(this.testimonial);
        this.toastr.success('get process completed successfully');
        
     },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
     })
    this.spinner.hide();

    }
    GetAlltestimonials():Observable<any>{
      return this.http.get('https://localhost:7272/api/Testimonial');
    }
    
    testimonialById:any={};
    getTestimonialById(id:number){
      this.spinner.show();
      this.http.get('https://localhost:7272/api/getTestimonialById/'+id).subscribe((resp:any)=>{
        this.testimonialById=resp;
        console.log(this.testimonialById);
        this.toastr.success('getById process completed successfully');
      },err=>{
        console.log(err.status);
        this.toastr.error('Error '+err.message);
      });
      this.spinner.hide();
    }

    deleteTestimonial(id:number)
    {
      this.spinner.show();
      this.http.delete('https://localhost:7272/api/Testimonial/Delete/'+id).subscribe((resp:any)=>{
       this.toastr.success('delete process completed successfully');
      },err=>{
       console.log('Something went wrong !!');
       this.toastr.error('Error '+err.message);

      })
      this.spinner.hide();
    } 
   result:any;
   createTestimonial(body:any){
    this.spinner.show();
    this.http.post('https://localhost:7272/api/Testimonial',body).subscribe((resp:any)=>{
      this.toastr.success('create process completed successfully');
    },err=>{
      console.log('Something went wrong !!');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }
   updateTestimonial(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/testimonial/',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }

  //________About_Us_________  
  about:any=[{}];
  getAllabouts()
  {
    this.spinner.show();
     this.http.get('https://localhost:7272/api/AboutUs').subscribe((resp:any)=>{
        this.about=resp;
        console.log(this.about);
        this.toastr.success('get process completed successfully');
     },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
     })
    this.spinner.hide();
  }
  GetAllabouts():Observable<any>{
    return this.http.get('https://localhost:7272/api/AboutUs');
  }
  aboutById:any={};
  getAboutById(id:number){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/AboutUs/GetAboutUsById/'+id).subscribe((resp:any)=>{
      this.getAboutById=resp;
      console.log(this.getAboutById);
      this.toastr.success('getById process completed successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  }

  deleteAbout(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/AboutUs/Delete/'+id).subscribe((resp:any)=>{
     this.toastr.success('delete process completed successfully');
    },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
  } 
  result_Msg:any;
   createAbout(body:any){
    this.spinner.show();
    this.http.post('https://localhost:7272/api/AboutUs',body).subscribe((resp:any)=>{
      this.toastr.success('create process completed successfully');
    },err=>{
      console.log('Something went wrong !!');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }
   updateAbout(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/AboutUs',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }

   upload_About_Image:any;
   uploadAttachmentAbout(file:FormData){
    this.http.post('https://localhost:7272/api/AboutUs/uploadImage',file).subscribe((resp:any)=>{
      console.log("resp",resp);
    this.upload_About_Image=resp.image_Name;
    },err=>{
     console.log('Something went wrong !!');
   
    });
    }


//_________BackGround________
background:any=[{}];
getAllbackgrounds()
{
  this.spinner.show();
   this.http.get('https://localhost:7272/api/Background').subscribe((resp:any)=>{
      this.background=resp;
      console.log(this.background);
      this.toastr.success('get process completed successfully');
   },err=>{
    console.log(err.status);
    this.toastr.error('Error '+err.message);
   })
   this.spinner.hide();
  } 
  GetAllbackgrounds(): Observable<any> {
    this.spinner.show();
    return this.http.get('https://localhost:7272/api/Background');
  }
  
  
  backgroundById:any={};
  getBackgroundById(id:number){
    this.spinner.show();
    this.http.get('https://localhost:7272/api/Background/GetBackgroundById/'+id).subscribe((resp:any)=>{
      this.backgroundById=resp;
      console.log(this.backgroundById);
      this.toastr.success('getById process completed successfully');
    },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  }

deleteBackGround(id:number){
  this.spinner.show();
  this.http.delete('https://localhost:7272/api/Background/Delete/'+id).subscribe((resp:any)=>{
    this.toastr.success('delete process completed successfully');
  },err=>{
    console.log('Something went wrong !!');
    this.toastr.error('Error '+err.message);
  })
  this.spinner.hide();
} 
   msg_success:any;
   createBackGround(body:any){
    this.spinner.show();
    this.http.post('https://localhost:7272/api/Background',body).subscribe((resp:any)=>{
      this.toastr.success('create process completed successfully');
    },err=>{
      console.log('Something went wrong !!');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }
   updateBackGround(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Background',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }
   upload_BackGround_Image:any;
   uploadAttachmentBackGround(file:FormData){
    this.http.post('https://localhost:7272/api/Background/uploadImage',file).subscribe((resp:any)=>{
      console.log("Resp Upload function",resp);//for testing
      this.upload_BackGround_Image=resp.image_Name;//because the object just contain an image only as string
    },err=>{
      console.log('Something went wrong'+err.message);
    });

    }

  //  ---- bank-----
  bank:any=[{}];
  getAllBanks(){
    this.http.get('https://localhost:7272/api/Bank').subscribe((resp:any)=>{
      this.bank=resp;
      console.log(this.bank);
   },err=>{
    console.log(err.status);
   })
  }
  GetAllBanks():Observable<any>{
    return this.http.get('https://localhost:7272/api/Bank');
  }
  updateBank(body: any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Bank',body).subscribe((resp:any)=>{
      console.log("Bank updated succefully");
    },err=>{
      console.log('Something went wrong');
      this.toastr.error('Error '+err.message);
    });
    this.spinner.hide();
  }
  //  ---- payment-----
  createPaymentSuccessMessage: string = '';
  createPayment(body:any){
    this.http.post('https://localhost:7272/api/Payment',body).subscribe((resp:any)=>{
      this.createPaymentSuccessMessage='Created Successfully';
    },err=>{
      console.log('Something went wrong')
    });
  }
  payment:any=[{}];
  getAllPayments(){
    this.http.get('https://localhost:7272/api/Payment').subscribe((resp:any)=>{
      this.payment=resp;
      console.log(this.payment);
    },err=>{
      console.log(err.status);
    });
  
  }
  deletePayment(id:number){
    this.http.delete('https://localhost:7272/api/Payment/Delete/'+id).subscribe((resp:any)=>{
      console.log('Deleted Successfully');
    },err=>{
      console.log('Something went wrong')
    });

  }
  paymentId:any={};
  getPaymentById(id:number){
    this.http.get('https://localhost:7272/api/Payment/GetPaymentById/'+id).subscribe((resp:any)=>{
      this.paymentId=resp;
      console.log(this.paymentId);
    },err=>{
      console.log(err.status);
    });

  }
  //  ---- reserved flight-----
  reservedFlight:any=[{}];
  getAllReservedFlights(){
    this.http.get('https://localhost:7272/api/ReservedFlights').subscribe((resp:any)=>{
      this.reservedFlight=resp;
      console.log(this.reservedFlight);
   },err=>{
    console.log(err.status);
   })
  }
  getAllReservedFlightsObserv(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7272/api/ReservedFlights');
  }

  createReserveFlightSuccessMessage: string = '';
  flighReserved:any=[];
  userReserved:any=[];
  createReservedFlights(body:any){
      this.http.post('https://localhost:7272/api/ReservedFlights',body).subscribe((resp:any)=>{
      this.createUserSuccessMessage='Created Successfully';
    },err=>{
      console.log('Something went wrong')
    });
  }

  reservedFlightById:any=[{}];
  getAllReservedFlightsById(id:number){
    this.http.get('https://localhost:7272/api/ReservedFlights/GetReservedFlightsById/'+id).subscribe((resp:any)=>{
      this.reservedFlightById=resp;
      console.log(this.reservedFlightById);
   },err=>{
    console.log(err.status);
   })
  }
  GetAllReservedFlightsById(id:number):Observable<any>{
    return this.http.get('https://localhost:7272/api/ReservedFlights/GetReservedFlightsById/'+id);
  }
  //login service
  login(email:any,password:any){
    var body={
      User_Name:email.toString(),
      password:password.toString()
    }
    const headerDirc={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOptions={
      headers:new HttpHeaders(headerDirc)
    }
    this.http.post('https://localhost:7272/api/JWT',body,requestOptions).subscribe((resp)=>{

    console.log("ok");
      console.log(resp);//encode token for testing
    const response={
      token:resp.toString()
    }
    localStorage.setItem('token',response.token);
  
    //decode
    let data:any=jwt_decode(response.token);
    localStorage.setItem('role',data.role);
    localStorage.setItem('name',data.name);
    localStorage.setItem('userId',data.userId);
    localStorage.setItem('user',JSON.stringify(data));
    console.log("okokok");
    console.log(data);
    console.log(data.role);
    console.log(data.name);
  
    if(data.role=='1')//admin
    {
      console.log(data.role);
      this.router.navigate(['admin/dashboard']);
    }
    else if(data.role=='2')//registered user
    {
      this.router.navigate(['']);
    }
    },err=>{
      this.toastr.error('Invalid credintials, Please enter valid username and password');
    });
  }

  
    //-----------------Header-------------------
    header:any=[{}];
    GetAllHeader()
    {
      this.spinner.show();
     this.http.get('https://localhost:7272/api/Header').subscribe((resp:any)=>{
        this.header=resp;
        console.log(this.header);
        this.toastr.success('get process completed successfully');
        
     },err=>{
      console.log(err.status);
      this.toastr.error('Error '+err.message);
     })
    this.spinner.hide();

    }
    getAllHeader(): Observable<any> {
      this.spinner.show();
      return this.http.get('https://localhost:7272/api/Header');
    }
    
    DeleteHeader(id:number)
  {
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/Header/Delete/'+id).subscribe((resp:any)=>{
     this.toastr.success('delete process completed successfully');
    },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);

    })
    this.spinner.hide();
  } 

  msg_header:any;
  CreateHeader(body:any){
   this.spinner.show();
   this.http.post('https://localhost:7272/api/Header',body).subscribe((resp:any)=>{
     this.msg_header.success('create process completed successfully');
     this.toastr.success('create process completed successfully');
   },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);
   })
   this.spinner.hide();
  }

  UpdateHeader(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Header/',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }

   HeaderById:any={};
   GetHeaderById(id:number){
      this.spinner.show();
      this.http.get('https://localhost:7272/api/Header/GetHeaderById/'+id).subscribe((resp:any)=>{
        this.HeaderById=resp;
        console.log(this.HeaderById);
        this.toastr.success('Ge by Id process completed successfully');
      },err=>{
        console.log(err.status);
        this.toastr.error('Error '+err.message);
      });
      this.spinner.hide();
    }

    uploadHeaderImage:any;
   uploadAttachmentHeader(file:FormData){
    this.http.post('https://localhost:7272/api/Header/uploadImage',file).subscribe((resp:any)=>{
    this.uploadHeaderImage=resp.imagename;
    },err=>{
     console.log('Something went wrong !!');
   
    });
    }

  //---------------------Contact Us---------------------
  contactUs:any=[{}];
  GetAllContactUs()
  {
    this.spinner.show();
   this.http.get('https://localhost:7272/api/ContactUs').subscribe((resp:any)=>{
      this.contactUs=resp;
      console.log(this.contactUs);
      this.toastr.success('get process completed successfully');
      
   },err=>{
    console.log(err.status);
    this.toastr.error('Error '+err.message);
   })
  this.spinner.hide();

  }

  DeleteContactUs(id:number)
  {
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/ContactUs/Delete/'+id).subscribe((resp:any)=>{
     this.toastr.success('delete process completed successfully');
    },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);

    })
    this.spinner.hide();
  } 
  msg_contact:any;
  CreateContactUs(body:any){
   this.spinner.show();
   this.http.post('https://localhost:7272/api/ContactUs',body).subscribe((resp:any)=>{
     this.toastr.success('create process completed successfully');
   },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);
   })
   this.spinner.hide();
  }

  UpdateContactUs(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/ContactUs',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }

   ContactUsById:any={};
   GetContactUsById(id:number){
      this.spinner.show();
      this.http.get('https://localhost:7272/api/ContactUs/GetContactUsById/'+id).subscribe((resp:any)=>{
        this.ContactUsById=resp;
        console.log(this.ContactUsById);
        this.toastr.success('Get by Id process completed successfully');
      },err=>{
        console.log(err.status);
        this.toastr.error('Error '+err.message);
      });
      this.spinner.hide();
    }


  //----------------------Footer-----------------------

  footer:any=[{}];
  GetAllFooter()
  {
    this.spinner.show();
   this.http.get('https://localhost:7272/api/Footer').subscribe((resp:any)=>{
      this.footer=resp;
      console.log(this.footer);
      this.toastr.success('get process completed successfully');
      
   },err=>{
    console.log(err.status);
    this.toastr.error('Error '+err.message);
   })
  this.spinner.hide();
  }
  getAllFooter(): Observable<any> {
    return this.http.get('https://localhost:7272/api/Footer');
  }

  DeleteFooter(id:number)
  {
    this.spinner.show();
    this.http.delete('https://localhost:7272/api/Footer/Delete/'+id).subscribe((resp:any)=>{
     this.toastr.success('delete process completed successfully');
    },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);

    })
    this.spinner.hide();
  } 

  msg_footer:any;
  CreateFooter(body:any){
   this.spinner.show();
   this.http.post('https://localhost:7272/api/Footer',body).subscribe((resp:any)=>{
     this.toastr.success('create process completed successfully');
   },err=>{
     console.log('Something went wrong !!');
     this.toastr.error('Error '+err.message);
   })
   this.spinner.hide();
  }

  UpdateFooter(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7272/api/Footer/',body).subscribe((resp:any)=>{
      this.toastr.success('update process completed successfully');
    },err=>{
      console.log('Something wrong');
      this.toastr.error('Error '+err.message);
    })
    this.spinner.hide();
   }

   FooterById:any={};
   GetFooterById(id:number){
      this.spinner.show();
      this.http.get('https://localhost:7272/api/Footer/GetFooterById/'+id).subscribe((resp:any)=>{
        this.FooterById=resp;
        console.log(this.FooterById);
        this.toastr.success('Get by Id process completed successfully');
      },err=>{
        console.log(err.status);
        this.toastr.error('Error '+err.message);
      });
      this.spinner.hide();
    }


    uploadFooterImage:any;
   uploadAttachmentFooter(file:FormData){
    this.http.post('https://localhost:7272/api/Footer/uploadImage',file).subscribe((resp:any)=>{
      console.log('resp',resp);
    this.uploadFooterImage=resp.logo;
    console.log(this.uploadFooterImage);

    },err=>{
     console.log('Something went wrong !!');
   
    });
    }

}
