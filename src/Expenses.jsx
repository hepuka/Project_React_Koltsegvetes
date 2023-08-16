import React from "react";

const Expenses = ({ kiadasok, tetelTorol }) => {
  return (
    <div className="kiadasok">
      <h2 className="kiadasok__cim">Kiadások</h2>

      <div className="kiadasok__lista">
        {kiadasok.map((item) => {
          return (
            <div className="tetel" id={item.id}>
              <div className="tetel__leiras">{item.description}</div>
              <div className="right">
                <div className="tetel__ertek">- {item.amount}</div>
                <div className="tetel__szazalek">{item.aktszaz}%</div>
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

export default Expenses;
