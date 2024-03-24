type HeaderProps = {
  onHandleFetchCountries: () => void;
  onCountrySearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  countryName: string;
  handleClear: () => void;
  handleSelectPopulation: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPopulation: string;
};

export const Header = ({
  onHandleFetchCountries,
  onCountrySearch,
  countryName,
  handleClear,
  handleSelectPopulation,
  selectedPopulation,
}: HeaderProps) => {
  return (
    <section className="flex justify-between items-center">
      <div className="flex gap-8 mt-4 items-center">
        <input
          type="text"
          placeholder="Country Name"
          className="border border-lightgray text-gray-900 text-sm rounded-md p-2"
          onChange={onCountrySearch}
          value={countryName}
        />
        <select
          className=" text-gray-900 text-sm  border-red-100 rounded-md p-4"
          onChange={handleSelectPopulation}
          value={selectedPopulation}
        >
          <option value="" disabled selected>
            Population
          </option>
          <option value="10">&lt; 1M</option>
          <option value="50">&lt; 5M</option>
          <option value="100">&lt; 10M</option>
        </select>
        <span
          className="text-blue-600 cursor-pointer underline"
          onClick={handleClear}
        >
          Clear
        </span>
      </div>
      <button
        className="text-white bg-blue-500 rounded-md p-2"
        onClick={onHandleFetchCountries}
      >
        Show all Countries
      </button>
    </section>
  );
};
