export class Reserv{
    
    iD_Reservation?: number;
    reservationInfo: string;
    reservationDate: Date;
    contactName: string;
    votings: number;
    voters: number;

    constructor (reservationInfo: string, reservationDate: Date, contactName: string,votings: number, voters: number, iD_Reservation?: number)
    {        
        this.reservationInfo = reservationInfo;
        this.reservationDate = reservationDate;
        this.contactName = contactName;
        this.iD_Reservation = iD_Reservation;
        this.votings = votings;
        this.voters = voters;
    }
    
}