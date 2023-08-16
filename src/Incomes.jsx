import React from "react";

const Incomes = ({ bevetelek, tetelTorol }) => {
  return (
    <div className="bevetelek">
      <h2 className="bevetelek__cim">Bevételek</h2>

      <div className="bevetelek__lista">
        {bevetelek.map((item) => {
          return (
            <div className="tetel" id={item.id}>
              <div className="tetel__leiras">{item.description}</div>
              <div className="right">
                <div className="tetel__ertek">+ {item.amount}</div>
                <div className="tetel__torol">
                  <button
                    className="tetel__torol--gomb"
                    onClick={() => tetelTorol(item.id, item.type)}
                  >
                    Töröl
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Incomes;
