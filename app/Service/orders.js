const mockOrders = [
  {
    "id": 1,
    "userId": 101,
    "item1": 3,
    "item2": 5,
    "item3": 8,
    "items": [
      { "id": 3, "name": "Handmade Soap", "price": 4.50 },
      { "id": 5, "name": "Wool Scarf", "price": 15.00},
      { "id": 8, "name": "Ceramic Mug", "price": 9.75 }
    ],
    "totalPrice": 29.25,
    "orderDate": "2025-04-22"
  },
  {
    "id": 2,
    "userId": 102,
    "item1": 2,
    "item2": 4,
    "item3": null,
    "items": [
      { "id": 2, "name": "Rustic Honey Candle", "price": 12.00 },
      { "id": 4, "name": "Beeswax Food Wraps (3-Pack)", "price": 14.99 },
      { "id": null, "name": null, "price": null }
    ],
    "totalPrice": 27.00,
    "orderDate": "2025-04-22"
  },

  {
    "id": 3,
    "userId": 103,
    "item1": 6,
    "item2": 7,
    "item3": 1,
    "items": [
      { "id": 6, "name": "Herbal Healing Salve", "price": 9.50 },
      { "id": 7, "name": "Cedarwood Beard Oil", "price": 11.75 },
      { "id": 1, "name": "Lavender Goat Milk Soap", "price": 6.99}
    ],
    "totalPrice": 28.24,
    "orderDate": "2025-04-18"
  },

  {
    "id": 4,
    "userId": 104,
    "item1": 8,
    "item2": 9,
    "item3": 10,
    "items": [
      { "id": 8, "name": "Macrame Plant Hanger", "price": 16},
      { "id": 9, "name": "Hand-Painted Ceramic Mug", "price": 20 },
      { "id": 10, "name": "Raw Honey (16 oz)", "price": 13.25 }
    ],
    "totalPrice": 49.25,
    "orderDate": "2025-04-17"
  },

  {
    "id": 5,
    "userId": 105,
    "item1": 2,
    "item2": 2,
    "item3": null,
    "items": [
      { "id": 2, "name": "Rustic Honey Candle", "price": 12 },
      { "id": 2, "name": "Rustic Honey Candle", "price": 12 },
      { "id": null, "name": null, "price": null }
    ],
    "totalPrice": 24.00,
    "orderDate": "2025-04-16"
  }
];

export default mockOrders;