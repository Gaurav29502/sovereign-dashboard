import React from "react";
import styles from "./modal.module.css"; 
import { ToastContainer } from "react-toastify";

const Modal = ({
  isOpen,
  onClose,
  children,
  header,
  size,
}) => {
  const modalClass = `${styles.modalDiv} ${isOpen ? styles.modalOpen : ""}`;

  let modalContentStyle = {
    height: "40vh",
    width: "40vw",
  };

  if (size) {
    switch (size) {
      case "small":
        modalContentStyle = {
          height: "35vh",
          width: "30vw",
        };
        break;
      case "medium":
        modalContentStyle = {
          height: "45vh",
          width: "35vw",
        };
        break;
      case "large":
        modalContentStyle = {
          height: "50vh",
          width: "50vw",
        };
        break;
      case "xlarge":
        modalContentStyle = {
          height: "94vh",
          width: "50vw",
        };
        break;
      case "Mlarge":
        modalContentStyle = {
          height: "60vh",
          width: "60vw",
        };
        break;
      default:
        break;
    }
  }

  return (
    <div className={modalClass}>
      <ToastContainer />
      <div className={styles.modalContent} style={modalContentStyle}>
        <div
          className={styles.headerdiv}
          style={{ display: "grid", gridTemplateColumns: "9fr 1fr"}}
        >
          <p className={styles.headerText}>{header}</p>
          {onClose ? (
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: "3vh",
                cursor: "pointer",
                zIndex: 1000,
                justifySelf: "end",
              }}
              onClick={onClose}
            >
              close
            </span>
          ) : (
            <></>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
