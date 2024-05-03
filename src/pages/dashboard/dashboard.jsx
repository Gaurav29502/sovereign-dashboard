import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/modal";
import logo from "../../assets/SovereignReportHeader copy.bmp";
import Dropdown from "../../components/Dropdown/dropdown";
import axios from "axios";

export const Dashboard = ({ header }) => {
  const [addEntryModal, setAddEntryModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [EntryDate, setEntryDate] = useState("");
  const [BillingCarats, setBillingCarats] = useState("");
  const [Type, setType] = useState("");
  const [Size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [Color, setColor] = useState("");
  const [Rate, setRate] = useState("");
  const [Amount, setAmount] = useState("");
  const [DiscountPerc, setDiscountPerc] = useState("");
  const [DiscountAmt, setDiscountAmt] = useState("");
  const [NetAmount, setNetAmount] = useState("");
  const [PartyId, setPartyId] = useState("");
  const [parties, setParties] = useState([]);
  const [types, setTypes] = useState([]);
  const [ParcelWeight, setParcelWeight] = useState("");
  const [Details, setDetails] = useState("");
  const [Billed, setBilled] = useState(false);
  const [selectedRowOk, setSelectedRowOk] = useState(false);
  const [BillNo, setBillNo] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [BillDate, setBillDate] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [updateEntryDateType, setUpdateEntryDateType] = useState("text");
  const [updateBillDateType, setUpdateBillDateType] = useState("text");

  const handleTypeChange = (typeInput) => {
    setType(typeInput);
  };

  const handlePartyChange = (partyInput) => {
    setPartyId(partyInput);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setEntryDate(rowData.EntryDate);
    setBillingCarats(rowData.BillingCarats);
    setType(rowData.Type);
    setSize(rowData.Size);
    setColor(rowData.Color);
    setRate(rowData.Rate);
    setAmount(rowData.Amount);
    setDiscountPerc(rowData.DiscountPerc);
    setDiscountAmt(rowData.DiscountAmt);
    setNetAmount(rowData.NetAmount);
    setPartyId(rowData.PartyId);
    setParcelWeight(rowData.ParcelWeight);
    setDetails(rowData.Details);
    setBilled(rowData.Billed);
    setBillNo(rowData.BillNo);
    setBillDate(rowData.BillDate);
    setUpdateModal(true);
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getTypes = () => {
    axios
      .get("http://103.197.221.123:5005/GetSize")
      .then((response) => {
        console.log(response);
        const transformedTypes = response.data.map((type) => ({
          value: type.SieveSizeName,
          label: type.SieveSizeName,
        }));
        setTypes(transformedTypes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getPurchases();
    getParty();
    getTypes();
  }, []);

  const handleCalculateDiscount = (e) => {
    const discountInputValue = e.target.value;
    setDiscountPerc(discountInputValue);

    const parsedPrice = parseFloat(Rate);
    const parsedCarats = parseFloat(BillingCarats);
    const parsedDiscountPercentage = parseFloat(discountInputValue);

    const calculatedAmount = parsedPrice * parsedCarats;
    const calculatedDiscountAmount =
      (calculatedAmount * parsedDiscountPercentage) / 100;
    const calculatedNetAmount = calculatedAmount - calculatedDiscountAmount;

    setAmount(calculatedAmount.toFixed(2));
    setDiscountAmt(
      isNaN(calculatedDiscountAmount) ? 0 : calculatedDiscountAmount.toFixed(2)
    );
    setNetAmount(
      isNaN(calculatedNetAmount) ? 0 : calculatedNetAmount.toFixed(2)
    );
  };

  const handleCalculateDiscountUpdate = (e) => {
    const discountInputValue = e.target.value;
    setDiscountPerc(discountInputValue);

    const parsedPrice = parseFloat(Rate);
    const parsedCarats = parseFloat(BillingCarats);
    const parsedDiscountPercentage = parseFloat(discountInputValue);

    const calculatedAmount = parsedPrice * parsedCarats;
    const calculatedDiscountAmount =
      (calculatedAmount * parsedDiscountPercentage) / 100;
    const calculatedNetAmount = calculatedAmount - calculatedDiscountAmount;

    setAmount(calculatedAmount.toFixed(2));
    setDiscountAmt(
      isNaN(calculatedDiscountAmount) ? 0 : calculatedDiscountAmount.toFixed(2)
    );
    setNetAmount(
      isNaN(calculatedNetAmount) ? 0 : calculatedNetAmount.toFixed(2)
    );
  };

  const handleCloseModal = () => {
    setAddEntryModal(false);
    setSelectedRow(null);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
    setDetails("");
    setAmount("");
    setDiscountAmt("");
    setNetAmount("");
    setRate("");
    setBillingCarats("");
    setSelectedRow(null);
    setUpdateEntryDateType("text");
    setUpdateBillDateType("text");
  };

  useEffect(() => {
    if (selectedRow) {
      setSelectedRowOk(selectedRow.Billed);
    }
  }, [selectedRow]);

  const getPurchases = () => {
    axios.get("http://103.197.221.123:5005/GetPurchase").then((response) => {
      setPurchases(response.data);
    });
  };

  const handleAddPurchase = () => {
    const insertData = {
      SaveType: "I",
      EntryDate: EntryDate,
      BillingCarats: BillingCarats,
      Type: Type,
      Size: Size,
      Color: Color,
      Rate: Rate,
      Amount: Amount,
      DiscountPerc: DiscountPerc,
      DiscountAmt: DiscountAmt,
      NetAmount: NetAmount,
      PartyId: PartyId,
      ParcelWeight: ParcelWeight,
      Details: Details,
      Billed: Billed,
      BillNo: BillNo,
      BillDate: BillDate,
    };

    if (EntryDate && ParcelWeight) {
      axios
        .post("http://103.197.221.123:5005/AddPurchase", insertData)
        .then((response) => {
          toast.success("Purchase Added Successfully", {
            autoClose: 5000,
            position: "top-center",
          });
          getPurchases();
          setAddEntryModal(false);
        })
        .catch((error) => {
          toast.error("Error Adding Purchase", {
            autoClose: 5000,
            position: "top-center",
          });
        });
    } else {
      toast.error("Please enter all details.", {
        autoClose: 5000,
        position: "top-center",
      });
    }
  };

  const handleUpdatePurchase = () => {
    const updateData = {
      SaveType: "U",
      PurchaseId: selectedRow.PurchaseId,
      EntryDate:
        selectedRow.EntryDate === EntryDate ? selectedRow.EntryDate : EntryDate,
      BillingCarats:
        selectedRow.BillingCarats === BillingCarats
          ? selectedRow.BillingCarats
          : BillingCarats,
      Type: selectedRow.Type === Type ? selectedRow.Type : Type,
      Size: selectedRow.Size === Size ? selectedRow.Size : Size,
      Color: selectedRow.Color === Color ? selectedRow.Color : Color,
      Rate: selectedRow.Rate === Rate ? selectedRow.Rate : Rate,
      Amount: selectedRow.Amount === Amount ? selectedRow.Amount : Amount,
      DiscountPerc:
        selectedRow.DiscountPerc === DiscountPerc
          ? selectedRow.DiscountPerc
          : DiscountPerc,
      DiscountAmt:
        selectedRow.DiscountAmt === DiscountAmt
          ? selectedRow.DiscountAmt
          : DiscountAmt,
      NetAmount:
        selectedRow.NetAmount === NetAmount ? selectedRow.NetAmount : NetAmount,
      PartyId: selectedRow.PartyId === PartyId ? selectedRow.PartyId : PartyId,
      ParcelWeight:
        selectedRow.ParcelWeight === ParcelWeight
          ? selectedRow.ParcelWeight
          : ParcelWeight,
      Details: selectedRow.Details === Details ? selectedRow.Details : Details,
      Billed: selectedRow.Billed === Billed ? selectedRow.Billed : Billed,
      BillNo: selectedRow.BillNo === BillNo ? selectedRow.BillNo : BillNo,
      BillDate:
        selectedRow.BillDate === BillDate ? selectedRow.BillDate : BillDate,
    };

    axios
      .post("http://103.197.221.123:5005/AddPurchase", updateData)
      .then((response) => {
        toast.success("Purchase Updated Successfully", {
          autoClose: 5000,
          position: "top-center",
        });
        getPurchases();
        setUpdateModal(false);
      })
      .catch((error) => {
        toast.error("Error Updating Purchase", {
          autoClose: 5000,
          position: "top-center",
        });
      });
  };

  function formatDateToDDMMYY(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  }

  const handleSelectedRowBilled = () => {
    setSelectedRowOk(!selectedRowOk);
    setBilled(true);
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
              <p className="rowHeader" style={{ width: "5vw" }}>
                SR NO
              </p>
              <p className="rowHeader" style={{ width: "5vw" }}>
                DATE
              </p>
              <p className="rowHeader" style={{ width: "6vw" }}>
                CARATS
              </p>
              <p className="rowHeader" style={{ width: "6vw" }}>
                TYPE
              </p>
              <p className="rowHeader" style={{ width: "7vw" }}>
                SIZE
              </p>
              <p className="rowHeader" style={{ width: "7vw" }}>
                COLOR
              </p>
              <p className="rowHeader" style={{ width: "7vw" }}>
                PRICE
              </p>
              <p className="rowHeader" style={{ width: "7vw" }}>
                AMOUNT
              </p>
              <p className="rowHeader" style={{ width: "15vw" }}>
                DISCOUNT PERCENTAGE
              </p>
              <p className="rowHeader" style={{ width: "10vw" }}>
                DISCOUNT AMOUNT
              </p>
              <p className="rowHeader" style={{ width: "10vw" }}>
                NET AMOUNT
              </p>
              <p className="rowHeader" style={{ width: "10vw" }}>
                PARTY
              </p>
              <p className="rowHeader" style={{ width: "7vw" }}>
                GROSS
              </p>
              <p className="rowHeader" style={{ width: "10vw" }}>
                DETAILS
              </p>
              <p className="rowHeader" style={{ width: "5vw" }}>
                BILL DATE
              </p>
              <p className="rowHeader" style={{ width: "5vw" }}>
                BILLED
              </p>
            </div>

            <div className="rowsWrapper">
              {purchases.map((purchase, index) => {
                const partyName =
                  parties.find((party) => party.value === purchase.PartyId)
                    ?.label || "Unknown Party";
                return (
                  <div
                    onClick={() => handleRowClick(purchase)}
                    className="tableRow"
                    key={index}
                  >
                    <p className="tableRowText" style={{ width: "5vw" }}>
                      {purchase.PurchaseId}
                    </p>
                    <p className="tableRowText" style={{ width: "5vw" }}>
                      {formatDateToDDMMYY(purchase.EntryDate)}
                    </p>
                    <p className="tableRowText" style={{ width: "6vw" }}>
                      {purchase.BillingCarats}
                    </p>
                    <p className="tableRowText" style={{ width: "6vw" }}>
                      {purchase.Type}
                    </p>
                    <p className="tableRowText" style={{ width: "7vw" }}>
                      {purchase.Size}
                    </p>
                    <p className="tableRowText" style={{ width: "7vw" }}>
                      {purchase.Color}
                    </p>
                    <p className="tableRowText" style={{ width: "7vw" }}>
                      {purchase.Rate}
                    </p>
                    <p className="tableRowText" style={{ width: "7vw" }}>
                      {purchase.Amount}
                    </p>
                    <p className="tableRowText" style={{ width: "15vw" }}>
                      {purchase.DiscountPerc} %
                    </p>
                    <p className="tableRowText" style={{ width: "10vw" }}>
                      {purchase.DiscountAmt}
                    </p>
                    <p className="tableRowText" style={{ width: "10vw" }}>
                      {purchase.NetAmount}
                    </p>
                    <p className="tableRowText" style={{ width: "10vw" }}>
                      {partyName}
                    </p>
                    <p className="tableRowText" style={{ width: "7vw" }}>
                      {purchase.ParcelWeight}
                    </p>
                    <p className="tableRowText" style={{ width: "10vw" }}>
                      {purchase.Details}
                    </p>
                    <p className="tableRowText" style={{ width: "5vw" }}>
                      {formatDateToDDMMYY(purchase.BillDate)}
                    </p>
                    <div className="tableRowText" style={{ width: "5vw" }}>
                      {purchase.Billed ? (
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
        header={"New Purchase"}
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
                id="entryDate"
                type="date"
                placeholder="Enter Date"
                className="entryInput"
                onChange={(e) => {
                  setEntryDate(e.target.value);
                }}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Parcel Weight</p>
              <input
                id="parcelWeight"
                placeholder="Enter Parcel Weight"
                className="entryInput"
                onChange={(e) => {
                  setParcelWeight(e.target.value);
                }}
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
                onSelectChange={(value) => {
                  handlePartyChange(value);
                }}
                title={selectedRow ? selectedRow.PartyId : PartyId}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Billing Carats</p>
              <input
                id="carats"
                placeholder="Enter Billing Carats"
                className="entryInput"
                onChange={(e) => {
                  setBillingCarats(e.target.value);
                }}
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
                options={types}
                height="8vh"
                onSelectChange={(value) => {
                  handleTypeChange(value);
                }}
                title={selectedRow ? selectedRow.Type : Type}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Price</p>
              <input
                id="rate"
                placeholder="Enter Price"
                className="entryInput"
                onChange={(e) => {
                  setRate(e.target.value);
                }}
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
                id="color"
                placeholder="Enter Color"
                className="entryInput"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Amount</p>
              <input
                id="amount"
                value={Rate * BillingCarats}
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
              <p className="entryLabels">Size</p>
              <input
                id="size"
                placeholder="Enter Size"
                className="entryInput"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div
              className="entryInputDiv"
              style={{ width: "70%", height: "100%" }}
            >
              <p className="entryLabels">Discount Percentage</p>
              <input
                id="perc"
                placeholder="Enter Discount Percentage"
                className="entryInput"
                onChange={(e) => {
                  handleCalculateDiscount(e);
                }}
              />
            </div>
          </div>
          <div className="entryInputRow">
            <div style={{ height: "100%", width: "70%" }}>
              <div
                className="entryInputDiv"
                style={{ width: "100%", height: "100%" }}
              >
                <p className="entryLabels">Details</p>
                <textarea
                  defaultValue={selectedRow ? selectedRow.Details : Details}
                  placeholder="Enter Details"
                  className="entryInput"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                height: "100%",
                width: "70%",
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gap: "1vh",
              }}
            >
              <div
                className="entryInputDiv"
                style={{ width: "100%", height: "100%" }}
              >
                <p className="entryLabels">Discount Amount</p>
                <input
                  id="discAmt"
                  defaultValue={DiscountAmt}
                  className="entryInput"
                  disabled
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "100%", height: "100%" }}
              >
                <p className="entryLabels">Net Amount</p>
                <input
                  id="netAmt"
                  defaultValue={NetAmount}
                  className="entryInput"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="entryInputRow" style={{ display: "flex" }}>
            {selectedRow === null && (
              <div
                className="entryInputDiv"
                style={{ width: "22%", height: "100%" }}
              >
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
                    style={{
                      display: "flex",
                      gap: "1vh",
                      alignItems: "center",
                    }}
                  >
                    <input
                      id="billed2"
                      type="checkbox"
                      checked={Billed}
                      onChange={() => setBilled(!Billed)}
                      style={{
                        height: "4vh",
                        width: "1.3vw",
                        backgroundColor: "#624FC2",
                      }}
                    />
                    Billed
                  </label>
                </div>
              </div>
            )}
            {Billed && selectedRow === null && (
              <div
                style={{
                  height: "100%",
                  width: "70%",
                  display: "flex",
                  gap: "4vh",
                }}
              >
                <div
                  className="entryInputDiv"
                  style={{ width: "70%", height: "100%" }}
                >
                  <p className="entryLabels">Bill Number</p>
                  <input
                    id="billNo2"
                    placeholder="Enter Bill Number"
                    className="entryInput"
                    onChange={(e) => {
                      setBillNo(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="entryInputDiv"
                  style={{ width: "70%", height: "100%" }}
                >
                  <p className="entryLabels">Bill Date</p>
                  <input
                    id="billDate2"
                    type={selectedRow ? "text" : "date"}
                    className="entryInput"
                    onChange={(e) => {
                      setBillDate(e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            className="newPurchaseButton"
            onClick={() => handleAddPurchase()}
            style={{
              width: "25%",
              height: "5vh",
              marginTop:
                selectedRow && selectedRow.Billed === true ? "0vh" : "2vh",
            }}
          >
            Confirm Purchase
          </button>
        </div>
      </Modal>
      {selectedRow && (
        <Modal
          size="xlarge"
          isOpen={updateModal}
          header={"Update Purchase"}
          onClose={handleCloseUpdateModal}
        >
          <div className="addPurchaseDiv">
            <div className="entryInputRow">
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Date</p>
                <input
                  id="entryDate"
                  defaultValue={formatDateToDDMMYY(selectedRow.EntryDate)}
                  type={updateEntryDateType}
                  onClick={() => setUpdateEntryDateType("date")}
                  placeholder="Enter Date"
                  className="entryInput"
                  onChange={(e) => {
                    setEntryDate(e.target.value);
                  }}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Parcel Weight</p>
                <input
                  id="parcelWeight"
                  defaultValue={
                    selectedRow ? selectedRow.ParcelWeight : ParcelWeight
                  }
                  placeholder="Enter Parcel Weight"
                  className="entryInput"
                  onChange={(e) => {
                    setParcelWeight(e.target.value);
                  }}
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
                  onSelectChange={(value) => {
                    handlePartyChange(value);
                  }}
                  title={
                    selectedRow
                      ? parties.find(
                          (party) => party.value === selectedRow.PartyId
                        )?.label
                      : ""
                  }
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Billing Carats</p>
                <input
                  id="carats"
                  defaultValue={
                    selectedRow ? selectedRow.BillingCarats : BillingCarats
                  }
                  placeholder="Enter Billing Carats"
                  className="entryInput"
                  onChange={(e) => {
                    setBillingCarats(e.target.value);
                  }}
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
                  options={types}
                  height="8vh"
                  onSelectChange={(value) => {
                    handleTypeChange(value);
                  }}
                  title={selectedRow ? selectedRow.Type : Type}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Price</p>
                <input
                  id="rate"
                  defaultValue={selectedRow ? selectedRow.Rate : Rate}
                  placeholder="Enter Price"
                  className="entryInput"
                  onChange={(e) => {
                    setRate(e.target.value);
                  }}
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
                  id="color"
                  defaultValue={selectedRow ? selectedRow.Color : Color}
                  placeholder="Enter Color"
                  className="entryInput"
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Amount</p>
                <input
                  id="amount"
                  defaultValue={
                    selectedRow ? selectedRow.Amount : Rate * BillingCarats
                  }
                  value={Rate * BillingCarats}
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
                <p className="entryLabels">Size</p>
                <input
                  id="size"
                  defaultValue={selectedRow ? selectedRow.Size : Size}
                  placeholder="Enter Size"
                  className="entryInput"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                />
              </div>
              <div
                className="entryInputDiv"
                style={{ width: "70%", height: "100%" }}
              >
                <p className="entryLabels">Discount Percentage</p>
                <input
                  id="perc"
                  defaultValue={
                    selectedRow ? selectedRow.DiscountPerc : DiscountPerc
                  }
                  placeholder="Enter Discount Percentage"
                  className="entryInput"
                  onChange={(e) => {
                    handleCalculateDiscountUpdate(e);
                  }}
                />
              </div>
            </div>
            <div className="entryInputRow">
              <div style={{ height: "100%", width: "70%" }}>
                <div
                  className="entryInputDiv"
                  style={{ width: "100%", height: "100%" }}
                >
                  <p className="entryLabels">Details</p>
                  <textarea
                    defaultValue={selectedRow ? selectedRow.Details : Details}
                    placeholder="Enter Details"
                    className="entryInput"
                    onChange={(e) => {
                      setDetails(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "70%",
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  gap: "1vh",
                }}
              >
                <div
                  className="entryInputDiv"
                  style={{ width: "100%", height: "100%" }}
                >
                  <p className="entryLabels">Discount Amount</p>
                  <input
                    id="discAmt"
                    value={DiscountAmt}
                    defaultValue={
                      selectedRow ? selectedRow.DiscountAmt : DiscountAmt
                    }
                    className="entryInput"
                    disabled
                  />
                </div>
                <div
                  className="entryInputDiv"
                  style={{ width: "100%", height: "100%" }}
                >
                  <p className="entryLabels">Net Amount</p>
                  <input
                    id="netAmt"
                    value={NetAmount}
                    defaultValue={
                      selectedRow ? selectedRow.NetAmount : NetAmount
                    }
                    className="entryInput"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="entryInputRow" style={{ display: "flex" }}>
              {selectedRow && (
                <>
                  <div
                    className="entryInputDiv"
                    style={{ width: "22%", height: "100%" }}
                  >
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
                        style={{
                          display: "flex",
                          gap: "1vh",
                          alignItems: "center",
                        }}
                      >
                        <input
                          id="billed1"
                          type="checkbox"
                          checked={selectedRowOk}
                          onChange={() => handleSelectedRowBilled()}
                          disabled={selectedRow.Billed}
                          style={{
                            height: "4vh",
                            width: "1.3vw",
                            backgroundColor: "#624FC2",
                          }}
                        />
                        Billed
                      </label>
                    </div>
                  </div>
                </>
              )}
              {selectedRow && selectedRowOk && !selectedRow.Billed && (
                <div
                  style={{
                    height: "100%",
                    width: "70%",
                    display: "flex",
                    gap: "4vh",
                  }}
                >
                  <div
                    className="entryInputDiv"
                    style={{ width: "70%", height: "100%" }}
                  >
                    <p className="entryLabels">Bill Number</p>
                    <input
                      id="billNo1"
                      defaultValue={selectedRow ? selectedRow.BillNo : BillNo}
                      placeholder="Enter Bill Number"
                      className="entryInput"
                      onChange={(e) => {
                        setBillNo(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className="entryInputDiv"
                    style={{ width: "70%", height: "100%" }}
                  >
                    <p className="entryLabels">Bill Date</p>
                    <input
                      id="billDate1"
                      type={"date"}
                      defaultValue={
                        selectedRow
                          ? formatDateToDDMMYY(selectedRow.BillDate)
                          : BillDate
                      }
                      className="entryInput"
                      onChange={(e) => {
                        setBillDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
              {selectedRow && selectedRow.Billed && (
                <div
                  style={{
                    height: "100%",
                    width: "70%",
                    display: "flex",
                    gap: "4vh",
                  }}
                >
                  <div
                    className="entryInputDiv"
                    style={{ width: "70%", height: "100%" }}
                  >
                    <p className="entryLabels">Bill Number</p>
                    <input
                      id="billNo3"
                      defaultValue={selectedRow ? selectedRow.BillNo : BillNo}
                      placeholder="Enter Bill Number"
                      className="entryInput"
                      disabled={selectedRow.Billed}
                      onChange={(e) => {
                        setBillNo(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className="entryInputDiv"
                    style={{ width: "70%", height: "100%" }}
                  >
                    <p className="entryLabels">Bill Date</p>
                    <input
                      id="billDate3"
                      type={updateBillDateType}
                      disabled={selectedRow.Billed}
                      defaultValue={
                        selectedRow
                          ? formatDateToDDMMYY(selectedRow.BillDate)
                          : BillDate
                      }
                      className="entryInput"
                      onChange={(e) => {
                        setBillDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              className="newPurchaseButton"
              onClick={() => handleUpdatePurchase()}
              style={{
                width: "25%",
                height: "5vh",
                marginTop:
                  selectedRow && selectedRow.Billed === true ? "0vh" : "2vh",
              }}
            >
              Update Purchase
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
