import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
import Modal from "../../components/Modal/modal";
import logo from "../../assets/SovereignReportHeader copy.bmp";
import Dropdown from "../../components/Dropdown/dropdown";
import axios from "axios";

export const Dashboard = ({ header }) => {
  const [addEntryModal, setAddEntryModal] = useState(false);
  const [date, setDate] = useState("");
  const [carats, setCarats] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [customer, setCustomer] = useState("");
  const [parties, setParties] = useState([]);
  const [gross, setGross] = useState("");
  const [details, setDetails] = useState("");
  const [ok, setOk] = useState(false);
  const [billNumber, setBillNumber] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [billDate, setBillDate] = useState("");
  const purchases = [
    {
      date: "02-04-2024",
      srNo: "1",
      carats: "5.98",
      type: "MQ B",
      size: "-7",
      color: "TLC",
      pricePerCarat: "30,000",
      amount: "1,80,400",
      discountPercentage: "1",
      discountAmount: "1000",
      netAmount: "1,79,400",
      customer: "S HARSH",
      gross: "11.76",
      details: "Q3.150",
      ok: true,
    },
    {
      date: "03-04-2024",
      srNo: "2",
      carats: "3.50",
      type: "VS B",
      size: "-6",
      color: "FCC",
      pricePerCarat: "40,000",
      amount: "1,40,000",
      discountPercentage: "1",
      discountAmount: "2800",
      netAmount: "1,37,200",
      customer: "J SMITH",
      gross: "7.00",
      details: "Q2.750",
      ok: false,
    },
    {
      date: "04-04-2024",
      srNo: "3",
      carats: "6.25",
      type: "VS C",
      size: "-5",
      color: "GFC",
      pricePerCarat: "35,000",
      amount: "2,18,750",
      discountPercentage: "1.5",
      discountAmount: "3281.25",
      netAmount: "2,15,468.75",
      customer: "A JOHNSON",
      gross: "13.25",
      details: "Q3.500",
      ok: false,
    },
    {
      date: "05-04-2024",
      srNo: "4",
      carats: "4.80",
      type: "MQ A",
      size: "-4",
      color: "TFB",
      pricePerCarat: "28,000",
      amount: "1,34,400",
      discountPercentage: "1.25",
      discountAmount: "1680",
      netAmount: "1,32,720",
      customer: "D WILLIAMS",
      gross: "9.60",
      details: "Q2.000",
      ok: true,
    },
    {
      date: "02-04-2024",
      srNo: "5",
      carats: "5.98",
      type: "MQ B",
      size: "-7",
      color: "TLC",
      pricePerCarat: "30,000",
      amount: "1,80,400",
      discountPercentage: "1",
      discountAmount: "1000",
      netAmount: "1,79,400",
      customer: "S HARSH",
      gross: "11.76",
      details: "Q3.150",
      ok: false,
    },
    {
      date: "03-04-2024",
      srNo: "6",
      carats: "3.50",
      type: "VS B",
      size: "-6",
      color: "FCC",
      pricePerCarat: "40,000",
      amount: "1,40,000",
      discountPercentage: "2",
      discountAmount: "2800",
      netAmount: "1,37,200",
      customer: "J SMITH",
      gross: "7.00",
      details: "Q2.750",
      ok: false,
    },
    {
      date: "04-04-2024",
      srNo: "7",
      carats: "6.25",
      type: "VS C",
      size: "-5",
      color: "GFC",
      pricePerCarat: "35,000",
      amount: "2,18,750",
      discountPercentage: "1.5",
      discountAmount: "3281.25",
      netAmount: "2,15,468.75",
      customer: "A JOHNSON",
      gross: "13.25",
      details: "Q3.500",
      ok: false,
    },
    {
      date: "05-04-2024",
      srNo: "8",
      carats: "4.80",
      type: "MQ A",
      size: "-4",
      color: "TFB",
      pricePerCarat: "28,000",
      amount: "1,34,400",
      discountPercentage: "1.25",
      discountAmount: "1680",
      netAmount: "1,32,720",
      customer: "D WILLIAMS",
      gross: "9.60",
      details: "Q2.000",
      ok: true,
    },
  ];

  const handleTypeChange = (typeInput) => {
    setType(typeInput);
    console.log(typeInput);
  };

  const handlePartyChange = (partyInput) => {
    setCustomer(partyInput);
    console.log(partyInput);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setAddEntryModal(true);
  };

  const getParty = () => {
    axios
      .get("http://103.197.221.123:5005/GetParty")
      .then((response) => {
        const transformedParties = response.data.map((party) => ({
          value: party.PartyId,
          label: party.PartyName,
        }));
        setParties(transformedParties);
        console.log(parties);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getParty();
  }, []);

  const handleCalculateDiscount = (e) => {
    const discountInputValue = e.target.value;
    setDiscountPercentage(discountInputValue);

    const parsedPrice = parseFloat(price);
    const parsedCarats = parseFloat(carats);
    const parsedDiscountPercentage = parseFloat(discountInputValue);

    const calculatedAmount = parsedPrice * parsedCarats;
    const calculatedDiscountAmount =
      (calculatedAmount * parsedDiscountPercentage) / 100;
    const calculatedNetAmount = calculatedAmount - calculatedDiscountAmount;

    setAmount(calculatedAmount.toFixed(2));
    setDiscountAmount(
      isNaN(calculatedDiscountAmount) ? 0 : calculatedDiscountAmount.toFixed(2)
    );
    setNetAmount(
      isNaN(calculatedNetAmount) ? 0 : calculatedNetAmount.toFixed(2)
    );
  };

  const handleCloseModal = () => {
    setAddEntryModal(false);
    setSelectedRow(null);
    setOk(false)
  };

  return (
    <>
      <div className="main">
        <div className="headerDiv">
          <img src={logo} className="logo"></img>
          <button
            className="newPurchaseButton"
            onClick={() => setAddEntryModal(true)}
          >
            New Purchase
          </button>
        </div>
        <div className="tableWrapper">
          <div className="table">
            <div className="headerRow">
              <p className="rowHeader">SR NO</p>
              <p className="rowHeader">DATE</p>
              <p className="rowHeader">CARATS</p>
              <p className="rowHeader">TYPE</p>
              <p className="rowHeader">SIZE</p>
              <p className="rowHeader">COLOR</p>
              <p className="rowHeader">PRICE</p>
              <p className="rowHeader">AMOUNT</p>
              <p className="rowHeader" style={{ width: "15vw" }}>
                DISCOUNT PERCENTAGE
              </p>
              <p className="rowHeader">DISCOUNT AMOUNT</p>
              <p className="rowHeader">NET AMOUNT</p>
              <p className="rowHeader">PARTY</p>
              <p className="rowHeader">GROSS</p>
              <p className="rowHeader">DETAILS</p>
              <p className="rowHeader">BILLED</p>
            </div>
            <div className="rowsWrapper">
              {purchases.map((purchase, index) => {
                return (
                  <div
                    onClick={() => handleRowClick(purchase)}
                    className="tableRow"
                    key={index}
                  >
                    <p className="tableRowText">{purchase.srNo}</p>
                    <p className="tableRowText">{purchase.date}</p>
                    <p className="tableRowText">{purchase.carats}</p>
                    <p className="tableRowText">{purchase.type}</p>
                    <p className="tableRowText">{purchase.size}</p>
                    <p className="tableRowText">{purchase.color}</p>
                    <p className="tableRowText">{purchase.pricePerCarat}</p>
                    <p className="tableRowText">{purchase.amount}</p>
                    <p className="tableRowText" style={{ width: "15vw" }}>
                      {purchase.discountPercentage} %
                    </p>
                    <p className="tableRowText">{purchase.discountAmount}</p>
                    <p className="tableRowText">{purchase.netAmount}</p>
                    <p className="tableRowText">{purchase.customer}</p>
                    <p className="tableRowText">{purchase.gross}</p>
                    <p className="tableRowText">{purchase.details}</p>
                    <div className="tableRowText">
                      {purchase.ok ? (
                        <span
                          className="material-symbols-rounded"
                          style={{ fontSize: "2.8vh", color: "#15803D" }}
                        >
                          verified
                        </span>
                      ) : (
                        <span
                          className="material-symbols-rounded"
                          style={{ fontSize: "2.8vh", color: "#B91C1C" }}
                        >
                          cancel
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="xlarge"
        isOpen={addEntryModal}
        header={selectedRow ? "Update Purchase" : "New Purchase"}
        onClose={handleCloseModal}
      >
        <div className="addPurchaseDiv">
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Date</p>
              <input
                value={selectedRow ? selectedRow.date : date}
                type={selectedRow ? "text" : "date"}
                placeholder="Enter Date"
                className="entryInput"
                onChange={(e) => {setDate(e.target.value)}}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Billing Carats</p>
              <input
                value={selectedRow ? selectedRow.carats : carats}
                placeholder="Enter Billing Carats"
                className="entryInput"
                onChange={(e) => {setCarats(e.target.value)}}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Type</p>
              <Dropdown
                options={parties}
                height="8vh"
                onSelectChange={(value) => {handleTypeChange(value)}}
                title={selectedRow ? selectedRow.type : type}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Size</p>
              <input
                value={selectedRow ? selectedRow.size : size}
                placeholder="Enter Size"
                className="entryInput"
                onChange={(e) => {setSize(e.target.value)}}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Color</p>
              <input
                value={selectedRow ? selectedRow.color : color}
                placeholder="Enter Color"
                className="entryInput"
                onChange={(e) => {setColor(e.target.value)}}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Price</p>
              <input
                value={selectedRow ? selectedRow.pricePerCarat : price}
                placeholder="Enter Price"
                className="entryInput"
                onChange={(e) => {setPrice(e.target.value)}}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Amount</p>
              <input
                value={selectedRow ? selectedRow.amount :price * carats}
                className="entryInput"
                disabled
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Discount Percentage</p>
              <input
                value={selectedRow ? selectedRow.discountPercentage : discountPercentage}
                placeholder="Enter Discount Percentage"
                className="entryInput"
                onChange={(e) => {handleCalculateDiscount(e)}}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Discount Amount</p>
              <input
                value={selectedRow ? selectedRow.discountAmount : discountAmount}
                className="entryInput"
                disabled
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Net Amount</p>
              <input
                value={selectedRow ? selectedRow.netAmount : netAmount}
                className="entryInput"
                disabled
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Party Name</p>
              <Dropdown
                options={parties}
                height="8vh"
                onSelectChange={(value) => {handlePartyChange(value)}}
                title={selectedRow ? selectedRow.customer : customer}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Parcel Weight</p>
              <input
                value={selectedRow ? selectedRow.gross : gross}
                placeholder="Enter Parcel Weight"
                className="entryInput"
                onChange={(e) => {setGross(e.target.value)}}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Details</p>
              <input
                value={selectedRow ? selectedRow.details : details}
                placeholder="Enter Details"
                className="entryInput"
                onChange={(e) => {setDetails(e.target.value)}}
              />
            </div>
            {selectedRow && <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Billed</p>
              <div
                style={{
                  height: "90%",
                  width: "100%",
                  display: "grid",
                  gridAutoFlow: "column",
                  placeItems: "center",
                }}
              >
                <label
                  className="entryLabels"
                  style={{ display: "flex", gap: "1vh", alignItems: "center" }}
                >
                  <input
                    type="radio"
                    value="yes"
                    checked={selectedRow ? selectedRow.ok === true : false}
                    onChange={() => setOk(true)}
                    style={{
                      height: "4vh",
                      width: "1.3vw",
                      backgroundColor: "#624FC2",
                    }}
                  />
                  Yes
                </label>
                <label
                  className="entryLabels"
                  style={{ display: "flex", gap: "1vh", alignItems: "center" }}
                >
                  <input
                    type="radio"
                    value="no"
                    checked={selectedRow ? selectedRow.ok === false : false}
                    onChange={() => setOk(false)}
                    style={{
                      height: "4vh",
                      width: "1.3vw",
                      backgroundColor: "red",
                    }}
                  />
                  No
                </label>
              </div>
            </div>}
            {selectedRow === null && 
            <div
            className="entryInputDiv"
            style={{ width: "70%", height: "100%" }}
          >
            <p className="entryLabels">Billed</p>
            <div
              style={{
                height: "90%",
                width: "100%",
                display: "grid",
                gridAutoFlow: "column",
                placeItems: "center",
              }}
            >
              <label
                className="entryLabels"
                style={{ display: "flex", gap: "1vh", alignItems: "center" }}
              >
                <input
                  type="radio"
                  value="yes"
                  checked={ok}
                  onChange={() => setOk(true)}
                  style={{
                    height: "4vh",
                    width: "1.3vw",
                    backgroundColor: "#624FC2",
                  }}
                />
                Yes
              </label>
              <label
                className="entryLabels"
                style={{ display: "flex", gap: "1vh", alignItems: "center" }}
              >
                <input
                  type="radio"
                  value="no"
                  checked={!ok}
                  onChange={() => setOk(false)}
                  style={{
                    height: "4vh",
                    width: "1.3vw",
                    backgroundColor: "red",
                  }}
                />
                No
              </label>
            </div>
          </div>
            }
          </div>
          {ok && (
            <div className="entryInputRow">
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Bill Number</p>
                <input
                  value={selectedRow ? selectedRow.billNumber : billNumber}
                  placeholder="Enter Bill Number"
                  className="entryInput"
                  onChange={(e) => {setBillNumber(e.target.value)}}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Bill Date</p>
                <input
                  type={selectedRow ? "text" : "date"}
                  value={selectedRow ? selectedRow.billDate : billDate}
                  className="entryInput"
                  onChange={(e) => {setBillDate(e.target.value)}}
                />
              </div>
            </div>
          )}
          {selectedRow && selectedRow.ok && (
            <div className="entryInputRow">
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Bill Number</p>
                <input
                  value={selectedRow ? selectedRow.billNumber : billNumber}
                  placeholder="Enter Bill Number"
                  className="entryInput"
                  onChange={(e) => {setBillNumber(e.target.value)}}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Bill Date</p>
                <input
                  type={selectedRow ? "text" : "date"}
                  value={selectedRow ? selectedRow.billDate : billDate}
                  className="entryInput"
                  onChange={(e) => {setBillDate(e.target.value)}}
                />
              </div>
            </div>
          )}
          <button
            className="newPurchaseButton"
            onClick={() => {}}
            style={{
              width: "25%",
              height: "5vh",
              marginTop: selectedRow && selectedRow.ok === true ? "0vh" : "2vh",
            }}
          >
            {selectedRow ? "Update Purchase" : "Confirm Purchase"}
          </button>
        </div>
      </Modal>
    </>
  );
};
