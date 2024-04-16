import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({
  options,
  title,
  onSelectChange,
  height,
  disabled,
  defaultValue,
  resetValue,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      handleSelectChange(defaultValue, defaultValue);
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  useEffect(() => {
    if (resetValue === "") setSelectedOption("");
  }, [resetValue]);

  const handleSelectChange = (value, label) => {
    setSelectedOption(label);
    setIsDropdownOpen(false);
    onSelectChange(value);
  };

  return (
    <div className={styles.multiselect}>
      <div
        className={styles.dropdownWrapper}
        onClick={toggleDropdown}
        style={{
          borderRadius: "6px",
          height: "5vh",
          border: "1px solid #340000",
          backgroundColor: "white",
        }}
      >
        <div className={styles.selectedOptionsDiv}>
          {selectedOption !== "" ? (
            <div key={selectedOption} className={styles.selectedOption}>
              <span>{selectedOption}</span>
            </div>
          ) : (
            <span
              style={{
                fontFamily: "Manrope",
                fontSize: "1.6vh",
                fontWeight: "400",
                color: "#64748B",
                display: "flex",
                alignItems: "center",
              }}
            >
              {title}
            </span>
          )}
        </div>
        <div
          onClick={toggleDropdown}
          style={{
            width: "100%",
            height: "60%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "3vh",
              fontWeight: "100",
              cursor: "pointer",
              color: "black",
            }}
          >
            {isDropdownOpen ? "expand_less" : "expand_more"}
          </span>
        </div>
      </div>
      <div
        className={styles.dropdownOptions}
        style={{
          height: isDropdownOpen ? "13vh" : "0vh",
          opacity: isDropdownOpen ? "1" : "0",
          borderTop: isDropdownOpen ? "transparent" : "1px solid #475569",
          marginTop: "5.5vh",
          borderRadius:"0px",
          border: "1px solid #340000",
        }}
      >
        {options.map((option, idx) => (
          <span
            key={idx}
            onClick={() => handleSelectChange(option.value, option.label)}
            style={{ cursor: "pointer", padding: "5px 10px" }}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
