import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.css']
})
export class ViewOneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    
  }
  id: number;
  order: number;
  score: number = 0;
  message: string;
  ngOnInit() {
    this.order = +this.route.snapshot.params["id"];
    console.log("route.params['value'] : ");
    console.log(this.route.params['value']);
    console.log("router.url : ");
    console.log(this.router.url[1]);    
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }
  
  btnSubmit_Click() : void{
    this.message = `입력하신 점수는 ${this.score}입니다`;
  }


}
