import React from 'react';

interface Item {
  value: string;
  label: string;
}

interface RadioEnumProps {
name: string;
items: Item[];
value: string | null;
onChange: (type: string) => void;
className?: string;
}

const RadioEnum: React.FC<RadioEnumProps> = ({ name, items, value, onChange,className }) => {
  return (
    <>
      {items.map((item) => (
        <label key={item.value} className="radio-inline">
          <input
            className={className}
            type="radio"
            name={name}
            value={item.value}
            checked={value === item.value}
            onChange={(e) => onChange(e.target.value)}
            required
          />
          {item.label}
        </label>
      ))}
    </>
  );
};

export default RadioEnum;