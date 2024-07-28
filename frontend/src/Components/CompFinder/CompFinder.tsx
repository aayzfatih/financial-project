import React, { useEffect, useState } from "react";
import { CompanyCompData } from "../../company";
import { getCompData } from "../../api";
import CompFinderItem from "./CompFinderItem/CompFinderItem";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyCompData>();

  useEffect(() => {
    const fetchCompData = async () => {
      const value = await getCompData(ticker!);
      setCompanyData(value?.data[0]);
    };
    fetchCompData();
  }, [ticker]);
  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyData?.peersList.map((ticker) => {
        return <CompFinderItem ticker={ticker} />;
      })}
    </div>
  );
};

export default CompFinder;
