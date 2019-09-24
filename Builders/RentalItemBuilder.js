'use strict';

const RentalItem = require('./RentalItem.js');

class RentalItemBuilder {
  constructor(props = {
    name: null,
    description: null,
    totalAmount: null,
    pricePerH: null
  }) {
    this.item = new RentalItem(props);
  }
  setName(name) {this.item.name = name}
  setDescription(description) {this.item.description = description}
  setAmount(amount) {this.item.amount = amount}
  setPrice(price) {this.item.price = price}
  build() {return this.item}
}

module.exports = RentalItemBuilder;