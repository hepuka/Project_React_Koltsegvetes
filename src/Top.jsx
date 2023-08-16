import React from "react";

let date = new Date();
let ev = date.getFullYear();
let honap = date.getMonth();
const honapok = [
  "január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

const Top = ({ szazalek, total, bevosszeg, kiaosszeg }) => {
  return (
    <div className="top">
      <div className="koltsegvetes">
        <div className="koltsegvetes__cim">
          <span className="koltsegvetes__cim--honap">
            {ev} - {honapok[honap]}
          </span>
        </div>
        <div className="koltsegvetes__ertek">{total}</div>
        <div className="koltsegvetes__bevetelek">
          <div className="koltsegvetes__bevetelek--szoveg">Bevételek</div>
          <div className="inside">
            <div className="koltsegvetes__bevetelek--ertek">{bevosszeg}</div>
          </div>
        </div>
        <div className="koltsegvetes__kiadasok">
          <div className="koltsegvetes__kiadasok--szoveg">Kiadások</div>
          <div className="inside">
            <div className="koltsegvetes__kiadasok--ertek">{kiaosszeg}</div>
            <div className="koltsegvetes__kiadasok--szazalek">{szazalek}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
