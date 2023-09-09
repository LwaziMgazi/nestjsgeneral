export interface IRsvp {
    _id?:string;
   event?: string;
   people?: Array<invitedPeople>,
   total?:number;
}

interface invitedPeople{
    name: string;
    noOfPeople:  number;
}