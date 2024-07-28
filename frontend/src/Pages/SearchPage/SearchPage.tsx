import React, { SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../company";

type Props = {};

function SearchPage({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const existingPortfolio = portfolioValues.find(
      (f) => f === e.target[0].value
    );
    if (existingPortfolio) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };
  const handleDeletePortfolio = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((f) => {
      return f !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };
  return (
    <div className="App">
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        handleDeletePortfolio={handleDeletePortfolio}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </div>
  );
}

export default SearchPage;
