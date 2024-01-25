import React from "react";
import './style.css'

const index = ({ data, category, name, onChange, origin, required, disabled }) => {

  return (
    <>
      <div mb={2}>
        <select
          disabled={disabled}
          required={required}
          className="select Category"
          name={name}
          onChange={onChange}
          value={category}
        >
          <option value="">{origin}</option>
          {data.map((elm, i) => {
            return (
              <>
                <option value={elm?._id}>{elm?.name}</option>
              </>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default index;
