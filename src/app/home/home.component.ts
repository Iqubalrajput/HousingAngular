import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { EventEmitter } from 'stream';
import { Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any = {};
  content: any = {};
  number: any = {};
  productId =[];
  login: any;
  ftpstring = GlobalConstants.ftpURL;
  city: any;
  @Output()  wishlistadd= new EventEmitter<string>();


  public constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private idservice: TokenStorageService,
    private router: Router
  ){
  }

// iqbal define funtion
  prod_func(data: string){
    this.idservice.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }


  ngOnInit(): void {
    this.home_call();
    this.amenities();
    this.titleService.setTitle('Housing Street');
    this.currentUser = this.tokenService.getUser().username;
    this.currentUserid = this.tokenService.getUser().id;
    this.login = this.tokenService.getToken();
    
  }
  DeleteProd_function(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.home_call();
          this.wishlistcount();
        },
        err => {
          console.log(err.error);
        }
      );
    }
    else{
      this.redirect_to_home();
    }
    
  }


  prod_function(data: any){
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      console.log(this.isLoggedIn);
    }
    else{
      this.redirect_to_home();
    }
    this.maintenance = true;
    this.parking = false;
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;      
      this.authService.Wishlist(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.home_call();
          this.wishlistcount();
        },
        err => {
          console.log(err.error);
        }
      );

    }
    else{
      this.isLoggedIn = false ;
    }
  }
  // wishlistcount(): void{
  //   this.userService.getwishlistdata().pipe().subscribe(
  //     (wishlistdata: any) => {
  //       this.wishlistcontent = wishlistdata.data;
  //       this.wishlistresult = this.wishlistcontent
  //       console.log(this.wishlistresult);
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }
  
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

    getwishlist(): void{
      this.userService.getwishlistdata().pipe().subscribe(
        (wishlistdata: any) => {
          //  console.log(amenitiesdata);
          this.wishlistcontent = wishlistdata.data;
          this.wishlistresult = this.wishlistcontent;
          console.log(this.wishlistresult);
          //console.log(this.content);
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  
  home_call(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;  
      this.authService.getproductWishlist().pipe().subscribe(
        (product: any) => {  
          this.content = product.data;
          this.number = this.content;
          // console.log(data.data[0]['0']);
          console.log(this.number);
          console.log(this.number[0]);
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );   
    }else{
      this.userService.getproductlistingfeatured().pipe().subscribe(
        (data: any) => {
  
          this.content = data.data.data;
          this.number = this.content;
          console.log(this.number);          
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }
 
  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities;
        console.log(this.amenitiesresult);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  gettestimonialdata(): void{
    this.userService.gettestimonialdata().pipe().subscribe(
      (Reviewdata: any) => {

        this.contenttestimonial = Reviewdata.data;
        this.testimonial = this.contenttestimonial;
        console.log(this.testimonial);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSearch(): void{
    console.log(this.form);
    this.authService.search(this.form).subscribe(
      data => {
        this.tokenService.searchData(data);
      },
      err => {
        this.err_caused = true;
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage);
      }
    );
    console.log(this.tokenService.returnSearch().product.data);
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }
  

  property_search(event: any): void{
    console.log(event)
    this.authService.city_search(event).subscribe(
      data => {
        this.tokenService.searchData(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
    console.log(this.tokenService.returnSearch().product.data);
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }

// carosule image
customOptions: OwlOptions = {
  loop:false,
  dots:true,
  autoplay:false,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    },
    1050: {
      items: 3
    },
    1250: {
      items: 3
    }
  },
  nav: false
}  

}
