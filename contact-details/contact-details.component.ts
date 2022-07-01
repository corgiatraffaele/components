import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactServiceService } from 'src/app/services/contact-service.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  id = Number(this.route.snapshot.paramMap.get('id'));
  contact: Contact = {
    id: this.id,
    firstname: '',
    lastname: '',
    email: '',
    type: '',
    imageUrl: ''
  }
  getContactbyId?: any;
  saveChanges?:any;
  addContact?:any;
  deleteContact?:any;
 //  contactService: any;
  
  
    constructor(
      private location: Location,
      private route: ActivatedRoute, 
      private contactService: ContactServiceService
    ) { }
  
    ngOnInit(): void {
      console.log("contact-details INIT");
      if(this.id>0){
        this.getContactbyId = this.getContactById();
      }
    }
  
    ngOnDestroy():void {
      console.log("contact-details DESTROY");
      this.getContactbyId?.unsubscribe();
      this.saveChanges?.unsubscribe();
      this.addContact?.unsubscribe();
      this.deleteContact?.unsubscribe();
    }
  
    goBack():void{
      this.location.back();
    } 
    
    getContactById(): void {
      this.contactService.getContact(this.id).subscribe((response: Contact) => {
        this.contact = response;
        console.log("Il personaggio cliccato ha Id: "+this.id);
      });
    }
  
    save():void{
      this.saveChanges =this.contactService.updateContact(this.contact).subscribe(()=>{this.goBack()});
    }
    
    add(firstname: string, lastname:string, email: string, type:string, imageUrl:string ):void {

      let contact: Contact = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        type: type,
        imageUrl: imageUrl
      } as Contact;
      
      this.addContact = this.contactService.addContact(contact).subscribe(()=>{this.goBack()});
    }

    deleteUser(){
      this.contactService.deleteContact(this.id).subscribe(()=>{this.goBack()});
        
    }
  
}