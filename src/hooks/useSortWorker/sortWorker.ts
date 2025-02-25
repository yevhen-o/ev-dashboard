import sortBy from "src/services/sortBy";

globalThis.onmessage = function (event) {
  const { data, sortByField, isSortedAsc, sortType } = event.data;
  // Perform sorting
  const sortedData = sortBy(data, sortByField, isSortedAsc, sortType);

  // Send sorted data back to the main thread
  globalThis.postMessage(sortedData);
};
