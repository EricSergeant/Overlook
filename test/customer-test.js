import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import customers from './test-data/customer-test-data';

let customer1, customer2;

describe('Customer', () => {
  beforeEach(() => {
    customer1 = new Customer(customers[0]);
    customer2 = new Customer(customers[1]);
  });
  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });
})