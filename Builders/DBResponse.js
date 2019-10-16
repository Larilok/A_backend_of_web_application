'use strict';

class DBResponse {
  constructor(props = {
    Id: null,
    Name: null,
    Description: null,
    Price: null,
    AmInSotck: null
  }) {
    for(let prop in props) this[prop] = props[prop];
  }
}

module.exports = DBResponse;
