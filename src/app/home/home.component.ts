import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  currentUser: any;
  form: any = {};
  data: any = {};
  content: any = {};
  number: any = {};
  login
  ftpstring = GlobalConstants.ftpURL
  city


  public constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private idservice: TokenStorageService,
    private router: Router
  ){
  }

// iqbal define funtion
  prod_func(data){
    this.idservice.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }


  ngOnInit(): void {
    this.home_call();
    this.gettestimonialdata();
    this.amenities();
    this.titleService.setTitle('Housing Street');
    this.currentUser = this.tokenService.getUser().username;
    this.login = this.tokenService.getToken();

  }

  home_call(): void{
    this.userService.getproductlistingfeatured().pipe().subscribe(
      (data: any) => {

        this.content = data.data.data;
        this.number = this.content
        console.log(this.number);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  // iqbal  start

  
  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities
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
        this.testimonial = this.contenttestimonial
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
        console.log(err.error.message);
      }
    );
    console.log(this.tokenService.returnSearch().product.data);
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }

  property_search(event): void{
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
