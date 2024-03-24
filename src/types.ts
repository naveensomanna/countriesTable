export type Address = {
  type: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
};

export type Customer = {
  firstName: string;
  lastName: string;
  customerId: string;
  age: number;
  spendingLimit: number;
  mobileNumber: string;
  address: Address[];
};

// country

export type Country = {
  abbreviation: string;
  capital: string;
  currency: string;
  name: string;
  phone: string;
  population: number;
  media: Media;
  id: number;
};

export type Media = {
  flag: string;
  emblem: string;
  orthographic: string;
};
