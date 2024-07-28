import React from "react";

type Props = {
  data: any;
  config: any;
};
const Table = ({ data, config }: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {config.map((val: any) => {
          return <td className="p-3">{val.render(company)}</td>;
        })}
      </tr>
    );
  });
  const renderedHeader = config.map((config: any) => {
    return (
      <th
        key={config.label}
        scope="col"
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shad rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          {renderedHeader}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
