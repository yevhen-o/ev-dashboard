import { useRef } from "react";

import { InputField } from "src/components/Forms/InputField";
import { NativeSelect } from "src/components/Forms/NativeSelect";
import { FilterValueType, FieldType } from "src/types";
import "./Filters.scss";

interface FilterProps {
  filterFields: FieldType[];
  appliedValues: FilterValueType;
  onChange: (values: FilterValueType) => void;
  resetForm: () => void;
}

const Filters: React.FC<FilterProps> = ({
  onChange,
  filterFields,
  appliedValues,
}) => {
  const el = useRef(null);

  const updateValues =
    (field: string) =>
    (e: React.FormEvent<HTMLSelectElement | HTMLInputElement>) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      onChange({ [field]: target.value });
    };

  return (
    <div ref={el} className="filters__wrapper">
      {filterFields.map((field) => {
        if (!("options" in field)) {
          return (
            <InputField
              key={field.name}
              name={field.name}
              type="text"
              placeholder={field.label}
              value={appliedValues[field.name] || ""}
              onChange={updateValues(field.name)}
            />
          );
        }
        if ("options" in field) {
          return (
            <div key={field.name} className="filters__field">
              <label htmlFor={field.id || field.name}>{field.label}</label>
              <NativeSelect
                id={field.id || field.name}
                key={field.name}
                name={field.name}
                type="text"
                placeholder={field.label}
                value={appliedValues[field.name] || ""}
                onChange={updateValues(field.name)}
                options={field.options}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Filters;
