import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router:Router=new Router();
  const token=localStorage.getItem('token');
  if(token){
    if(state.url.indexOf('admin')>=0){
      let role:any=localStorage.getItem('role');
      if(role=='1'){ //admin role id 
        return true;
      }
      else{
        alert('You are not authorized to access this page.'+'  '+ 'Access Denied');
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
       localStorage.removeItem('user')
        router.navigate(['security/login']);
        return false;
      }

    }

  }
  else{
    alert('You are not a registered user.');
    router.navigate(['security/register']);
    return false;
  }
  return true;
};
