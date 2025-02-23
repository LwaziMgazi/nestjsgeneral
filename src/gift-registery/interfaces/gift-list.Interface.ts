export interface IGiftList {
    event: string,
    items: Array<gift>
  }
  
 export interface gift {
    name : string;
    link: string,
    claim: {
      email: string;
      status: string;
      taken: boolean;
    }
  }