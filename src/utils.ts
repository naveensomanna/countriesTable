import { API_URL } from "./constant";
import { data } from "./data";
import { Address, Country, Customer } from "./types";

export const customerBasedOnId = (zipCode: string): Customer[] => {
  return data.filter((customer: Customer) => {
    return customer?.address.some(
      (address: Address) => address.zipCode === zipCode
    );
  });
};

export const zipBasedCustomers = (): { [key: string]: Customer[] } => {
  let zipBasedData: { [key: string]: Customer[] } = {};

  data.forEach((customer: Customer) => {
    customer?.address.forEach((address: Address) => {
      if (!zipBasedData[address?.zipCode]) {
        zipBasedData[address?.zipCode] = [{ ...customer }];
      } else {
        zipBasedData[address?.zipCode] = [
          ...zipBasedData[address?.zipCode],
          { ...customer },
        ];
      }
    });
  });
  return zipBasedData;
};

// fetch countries

export const fetchCountries = async () => {
  const res = await fetch(API_URL);
  const result = await res.json();
  return result.map((item: Country) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(item.population || 0);
    return { ...item, population: formattedNumber };
  });
};
