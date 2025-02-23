export interface IBondAttackMemmber  {
      [key: string] : {
        lives: Array<ILives>,
        receivedAmount: Number,
        currentPaidOut: Number,
        amountPaidOut: Number,
        BankDetails: object
      },
    
  }

  export interface ILives   {
    name: String;
    surname: String;
    cellNumber: string;
    payDay: String;
  }