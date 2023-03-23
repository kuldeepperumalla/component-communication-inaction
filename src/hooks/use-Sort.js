import { useState } from "react";

function useSort(data, config) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const setSortColumn = (lable) => {
    if (sortBy && lable !== sortBy) {
      setSortOrder("asc");
      setSortBy(lable);
      return;
    }
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(lable);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(lable);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  let sortedData = data;
  if (sortBy && sortOrder) {
    const { sortValue } = config.find((column) => column.label === sortBy);

    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return{
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn
  }
}

export default useSort;