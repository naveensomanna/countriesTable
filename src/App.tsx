// import { ReactElement } from "react";
import { useState } from "react";
// import { customerBasedOnId, zipBasedCustomers } from "./utils";
// import { Customer } from "./types";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Country } from "./types";
import { fetchCountries } from "./utils";
import "./App.css";

function App() {
  // const customersBasedOnId: Customer[] = customerBasedOnId("560078");
  const [countries, setCountries] = useState([] as Country[]);
  const [filteredData, setFilteredData] = useState([] as Country[]);
  const [countryName, setCountryName] = useState("");
  const [selectedPopulation, setSelectedPopulation] = useState("");

  const handleFetchCountries = async () => {
    const result = await fetchCountries();
    setCountries(result);
    setFilteredData(result);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCountryName(value);
    setSelectedPopulation("");
    if (value.trim) {
      const filteredName = countries.filter(({ name }: any) =>
        name.toLowerCase().includes(value.trim())
      );
      setFilteredData([...filteredName]);
    } else {
      setFilteredData([...countries]);
    }
  };

  const handleSelectPopulation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedPopulation(value);
    let result: Country[] = [];
    if (countryName) {
      countries.forEach((item: Country) => {
        const { name, population } = item;
        const numb = population.toString().match(/\d+\.?\d*/g);
        if (
          name.toLowerCase().includes(countryName.toLowerCase()) &&
          parseInt((numb || []).join("")) <= parseInt(value)
        ) {
          result.push({ ...item });
        }
      });
    } else {
      countries.forEach((item: Country) => {
        const numb = item?.population?.toString().match(/\d+\.?\d*/g);
        if (parseInt((numb || []).join("")) <= parseInt(value)) {
          result.push({ ...item });
        }
      });
    }
    setFilteredData([...result]);
  };

  const handleClear = () => {
    setCountryName("");
    setSelectedPopulation("");
    setFilteredData([...countries]);
  };

  return (
    <>
      {/* this changes related first one*/}
      {/* {customersBasedOnId.map(
        (customer: Customer, index: number): ReactElement => (
          <div key={index}>{customer.firstName}</div>
        )
      )} */}

      <h1 className="text-cyan-950">Countries Info</h1>
      <Header
        onHandleFetchCountries={handleFetchCountries}
        onCountrySearch={handleChangeName}
        handleClear={handleClear}
        countryName={countryName}
        handleSelectPopulation={handleSelectPopulation}
        selectedPopulation={selectedPopulation}
      />
      <Table data={filteredData} />
    </>
  );
}

export default App;
