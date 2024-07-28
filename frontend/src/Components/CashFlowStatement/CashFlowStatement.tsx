import React, { useEffect, useState } from "react";
import { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router";
import { getCashFlowStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../Helpers/NumberFormating";

type Props = {};
const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

function CashFlowStatement(props: Props) {
  const ticker = useOutletContext<string>();
  const [cashFlowStatement, setCashFlowStatement] =
    useState<CompanyCashFlow[]>();

  useEffect(() => {
    const fetchCashFlow = async () => {
      const value = await getCashFlowStatement(ticker!);
      setCashFlowStatement(value?.data);
    };
    fetchCashFlow();
  }, []);
  return (
    <>
      {cashFlowStatement ? (
        <Table config={config} data={cashFlowStatement} />
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default CashFlowStatement;
