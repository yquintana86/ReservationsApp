export class Reserv{                     //Reservation model class 
    
    idReservation?: number;
    reservationInfo: string;
    reservationDate: Date;
    contactName: string;
    votings: number;
    voters: number;

    constructor (reservationInfo: string, reservationDate: Date, contactName: string,votings: number, voters: number, idReservation?: number)
    {        
        this.reservationInfo = reservationInfo;
        this.reservationDate = reservationDate;
        this.contactName = contactName;
        this.idReservation = idReservation;
        this.votings = votings;
        this.voters = voters;
    }
    
}