export const maboItem=[
    {
      "id": 1,
      "title":"Tent",
      "estimatedPrice": "8000",
      "addedPrices": [
        {
          "description": "deposit",
          "price": 5
        }
      ]
    },
    {
      "id": 2,
      "title":"Transport",
      "estimatedPrice": "20000",
      "addedPrices": [ {
        "description": "deposit",
        "price": 5
      }]
    },
    {
      "id": 3,
      "title":"Gifts",
      "estimatedPrice": "3000",
      "addedPrices": [
        {
          "description": "blankets",
          "price": 5
        }
      ]
    }
  ]

  export interface ImaboItems {
    title: string,
    estimatedPrice: string,
    addedPrices: Array<any>
  }

  export interface IEvents {
    refToUser: string,
    eventName: string,
    items: Array<ImaboItems>
  }
  