import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SideBar from "./SideBar";
import "../dashboard/Styles/Cards.css";

const DisplayCards = ({ handleAuthentication }) => {
  const [cardDataList, setCardDataList] = useState([]);
  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:814/card/getCards/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch card data");
        }
        const data = await response.json();
        setCardDataList(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCardData();
  }, [username]);

  return (
    <div className="cardscontainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="d1">
        <Cards cardDataList={cardDataList} />
      </div>
    </div>
  );
};

export default DisplayCards;
