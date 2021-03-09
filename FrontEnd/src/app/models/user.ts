export class User               //User model class 
{
    contactName: string;
    phoneNumber: string;
    birthDate : Date;
    contactTypeName: string;
    
    
    constructor(contactName: string, phoneNumber: string,birthDate : Date, contactTypeName: string)
    {
        this.contactName = contactName;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.contactTypeName = contactTypeName;
    }
    
}