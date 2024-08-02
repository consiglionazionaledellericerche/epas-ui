import React from 'react';

const RadioEnum = ({ name, items, value, onChange }) => {
  return (
    <>
      {items.map((item) => (
        <label key={item.value}>
          <input
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