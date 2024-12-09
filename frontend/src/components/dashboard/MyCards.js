import React, { useState, useEffect } from "react";
import "../dashboard/Styles/MyCards.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:814/card/recentCards/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setCards(data); // Update state with the fetched cards
      } catch (error) {
        console.error("Error fetching cards:", error.message);
      }
    };

    fetchCards();
  }, []);

  return (
    <section className="my-cards">
      <div className="cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card-item ${
              index % 2 === 0 ? "blue-card" : "green-card"
            }`}
          >
            <div className="chip"></div>
            <div className="mastercard-logo"></div>
            <div className="card-number">
              {card.cardNumber.replace(/\d{4}(?=.)/g, "$& ")}
            </div>

            <div className="card-id">{card.cardId}</div>
            <div className="card-footer">
              <div className="card-holder">
                <span>Card Holder</span>
                <strong>{card.cardHolder}</strong>
              </div>
              <div className="expiry-date">
                <span>Expiry Date</span>
                <strong>{card.expiryDate}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
