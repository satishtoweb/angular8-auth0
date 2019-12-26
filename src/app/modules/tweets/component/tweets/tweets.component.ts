import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() { }


}
