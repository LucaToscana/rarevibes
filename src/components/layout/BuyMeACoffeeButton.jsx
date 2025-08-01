import React from "react";
import bmcButton from "../../assets/bmc-button.png";
import CardWrapper from "./CardWrapper";

function BuyMeACoffeeSimpleButton() {
  const imgStyle = {
    height: "48px",
    width: "auto",
  };

  const handleClick = () => {
    window.open("https://buymeacoffee.com/rarevibes", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="w-fit cursor-pointer"
      onClick={handleClick}
      role="link"
      aria-label="Supporta Rare Vibes su Buy Me a Coffee"
    >
      <CardWrapper>
        <img src={bmcButton} alt="Buy Me a Coffee" style={imgStyle} />
      </CardWrapper>
    </div>
  );
}

export default BuyMeACoffeeSimpleButton;
