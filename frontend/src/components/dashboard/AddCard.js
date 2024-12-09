import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import visaLogo from "../Asserts/visa.png";
import mastercardLogo from "../Asserts/mastercard.png";
import rupayLogo from "../Asserts/rupay.png";
import SideBar from "./SideBar";
import "../dashboard/Styles/AddCard.css";

const AddCard = ({ handleAuthentication }) => {
  const [cardData, setCardData] = useState({
    username: localStorage.getItem("username"),
    bankName: "",
    cardHolder: "",
    cardType: "Debit Card",
    paymentNetwork: "Visa",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [showCvv, setShowCvv] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://personal-finance-tracker-backend-five.vercel.app/card/createCard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Card added successfully!");
        setCardData({
          username: "",
          bankName: "",
          cardHolder: "",
          cardType: "Debit Card",
          paymentNetwork: "Visa",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add card. Please try again.");
      }
    } catch (error) {
      console.error("Error adding card:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const getPaymentNetworkLogo = () => {
    switch (cardData.paymentNetwork) {
      case "Visa":
        return visaLogo;
      case "MasterCard":
        return mastercardLogo;
      case "RuPay":
        return rupayLogo;
      default:
        return "";
    }
  };

  const cardBackgroundColor =
    cardData.cardType === "Debit Card" ? "#4a90e2" : "#28a745";

  return (
    <div className="addcardcontainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="add-card-container">
        <div
          className="bank-card-display"
          style={{ backgroundColor: cardBackgroundColor }}
        >
          <h2>{cardData.bankName || "Bank Name"}</h2>
          <p>{cardData.cardHolder || "Card Holder Name"}</p>
          <p>
            {cardData.cardNumber
              ? `${cardData.cardNumber.replace(/\d{4}(?=.)/g, "$& ")}`
              : "●●●● ●●●● ●●●● ●●●●"}
          </p>
          <div className="expiry-cvv">
            <span>{cardData.expiryDate || "MM/YY"}</span>
            <span>{showCvv ? cardData.cvv : "●●●"}</span>
          </div>
          <div className="payment-network-logo">
            {getPaymentNetworkLogo() && (
              <img
                src={getPaymentNetworkLogo()}
                alt={cardData.paymentNetwork}
                width={40}
                height={24}
              />
            )}
          </div>
        </div>
        <div>
          <form className="card-details-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={cardData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </div>

            <div className="form-field">
              <label>Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                value={cardData.cardHolder}
                onChange={handleChange}
                placeholder="Enter card holder name"
              />
            </div>

            <div className="form-field">
              <label>Type</label>
              <select
                name="cardType"
                value={cardData.cardType}
                onChange={handleChange}
              >
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>

            <div className="form-field">
              <label>Payment Network</label>
              <select
                name="paymentNetwork"
                value={cardData.paymentNetwork}
                onChange={handleChange}
              >
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="RuPay">RuPay</option>
              </select>
            </div>

            <div className="form-field">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleChange}
                maxLength="16"
                placeholder="Enter card number"
              />
            </div>

            <div className="expiry-cvv-fields">
              <div className="form-field">
                <label>Expiry Date</label>
                <input
                  type="month"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
              </div>

              <div className="form-field">
                <label>CVV</label>
                <input
                  type={showCvv ? "text" : "password"}
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  placeholder="CVV"
                  onFocus={() => setShowCvv(true)}
                  onBlur={() => setShowCvv(false)}
                />
              </div>
            </div>

            <button type="submit">Save Card</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
