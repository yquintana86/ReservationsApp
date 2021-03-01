export class User
{
    contactName: string;
    phoneNumber: number;
    birthDate : Date;
    contactTypeName: string;
    
    
    constructor(contactName: string, phoneNumber: number,birthDate : Date, contactTypeName: string)
    {
        this.contactName = contactName;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.contactTypeName = contactTypeName;
    }
    
}