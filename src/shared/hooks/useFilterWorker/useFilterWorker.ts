import { useEffect, useState } from "react";
import { ITEMS_COUNT_TO_USE_WORKER } from "src/constants";

import {
  defaultSearchFilterFunction,
  defaultSelectFilterFunction,
} from "./utils";
import { FieldType, FormValueType, Value } from "src/types";

export const useFilterWorker = <T>(
  items: T[],
  appliedValues: FormValueType | null,
  filterFields: FieldType[],
  filterFunctions: Record<
    string,
    (item: T, key: string, value: NonNullable<Value>) => boolean
  >
) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    let worker: Worker | null = null;

    const filterWithoutWorker = () => {
      const filteredItems = (items || []).filter((item: T) =>
        Object.entries(appliedValues || {}).every(([key, value]) => {
          const fieldDescription: FieldType | undefined = filterFields.find(
            (field: FieldType) => field.name === key
          );
          const filterFn =
            filterFunctions[key] ||
            (fieldDescription && !("options" in fieldDescription)
              ? defaultSearchFilterFunction
              : defaultSelectFilterFunction);
          return !!value &&
            !["page", "perPage", "sortBy", "sortOrder"].includes(key)
            ? filterFn(item, key, value)
            : true;
        })
      );
      setFilteredData(filteredItems);
    };

    const filterWithWorker = async () => {
      const { default: FilterWorker } = await import("./filterWorker?worker");
      worker = new FilterWorker();

      worker.postMessage({
        items,
        appliedValues,
        filterFields,
        filterFunctions,
      });
      setIsWorking(true);

      worker.onmessage = function (event) {
        setFilteredData(event.data);
        setIsWorking(false);
      };

      worker.onerror = function (error) {
        console.error("Worker Error:", error);
        setFilteredData(items || []);
        setIsWorking(false);
      };
    };

    if (items.length > ITEMS_COUNT_TO_USE_WORKER) {
      filterWithWorker();
    } else {
      filterWithoutWorker();
    }

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [items, appliedValues, filterFields, filterFunctions]);

  return { filteredData, isWorking };
};

export default useFilterWorker;
