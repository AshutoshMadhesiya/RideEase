import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setSuggestions,
  setPickup,
  setDestination,
  activeField,
  setPanelOpen,
  setVehiclePanel,
}) => {
  const handleSuggestionClick = async (value) => {
    if (activeField === "pickup") {
      setPickup(value);
    } else if (activeField === "destination") {
      setDestination(value);
    }
    setSuggestions([]);
    setPanelOpen(false);
    setVehiclePanel(true);
  };

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 border-white active:border-black p-3 rounded-xl items-center justify-start my-4"
        >
          <h2 className="bg-[#eee] h-10 flex items-center justify-center w-15 rounded-full">
            <i className="ri-map-pin-2-fill"></i>
          </h2>
          <h4>{elem}</h4>
        </div>
      ))}
    </div>
  );
};
export default LocationSearchPanel;
