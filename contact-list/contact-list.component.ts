import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[]= [];
 
  contactService: any;
  
    constructor(
      private contactServiceService: ContactServiceService,
      private location: Location) { }
      ngOnInit():any {
        this.getContacs();
      } 

  getContacs():void {    
    this.contactServiceService.getContacts().subscribe((data: any) => {
      this.contacts = data;
      console.log(this.contacts);
      
    });
  }

  goBack():void{
    this.location.back();
  }

  
}
