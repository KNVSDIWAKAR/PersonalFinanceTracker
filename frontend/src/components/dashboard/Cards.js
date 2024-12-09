import React from "react";
import visaLogo from "../Asserts/visa.png";
import mastercardLogo from "../Asserts/mastercard.png";
import rupayLogo from "../Asserts/rupay.png";
import "../dashboard/Styles/Cards.css";

// Function to get the appropriate payment network logo
const getPaymentNetworkLogo = (network) => {
  switch (network) {
    case "Visa":
      return visaLogo;
    case "MasterCard":
      return mastercardLogo;
    case "RuPay":
      return rupayLogo;
    default:
      return null;
  }
};

const Cards = ({ cardDataList }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}
      className="cards-container"
    >
      {cardDataList.map((card, index) => (
        <div
          key={index}
          style={{
            backgroundColor:
              card.cardType === "Debit Card" ? "#4a90e2" : "#28a745",
            color: "#fff",
            borderRadius: "10px",
            padding: "20px",
            width: "300px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            position: "relative",
          }}
        >
          <h2
            style={{ fontSize: "20px", fontWeight: "bold", textAlign: "left" }}
          >
            {card.bankName || "Bank Name"}
          </h2>
          <p style={{ marginTop: "10px", fontSize: "18px" }}>
            {card.cardHolder || "Card Holder Name"}
          </p>
          <p style={{ marginTop: "20px", fontSize: "18px" }}>
            {card.cardNumber
              ? `${card.cardNumber.replace(/\d{4}(?=.)/g, "$& ")}`
              : "●●●● ●●●● ●●●● ●●●●"}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <span>{card.expiryDate || "MM/YY"}</span>
            <span>●●●</span>
          </div>

          {/* Display Payment Network Logo */}
          {card.paymentNetwork && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1,
              }}
            >
              <img
                src={getPaymentNetworkLogo(card.paymentNetwork)}
                alt={card.paymentNetwork}
                width={40}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;
