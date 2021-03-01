export class Reserv{
    
    iD_Reservation?: number;
    reservationInfo: string;
    fecha_Reservacion: Date;
    contactName: string;
    votings: number;
    voters: number;

    constructor (reservationInfo: string, fecha_Reservacion: Date, contactName: string,votings: number, voters: number, iD_Reservation?: number)
    {        
        this.reservationInfo = reservationInfo;
        this.fecha_Reservacion = fecha_Reservacion;
        this.contactName = contactName;
        this.iD_Reservation = iD_Reservation;
        this.votings = votings;
        this.voters = voters;
    }
    
}