const Tracker = () => {
  const tableHeaders = [
    "Time",
    "Milk amount",
    "Food type",
    "Food amount",
    "Poop",
  ];
  const testData = ["11:45", 100, "Solid food", 50, "yes"];

  return (
    <table>
      <tr className="border-2 bg-secondary text-foreground">
        {tableHeaders.map((header, index) => (
          <th key={index} className="py-2 px-4 border   ">
            {header}
          </th>
        ))}
      </tr>
      <tr className="bg-background text-foreground">
        {testData.map((data, index) => (
          <td key={index} className="p-2 px-4 border">
            {data}
          </td>
        ))}
      </tr>
    </table>
  );
};

export default Tracker;
