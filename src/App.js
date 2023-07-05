import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";

function App() {
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

  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [bevetelek, setBevetelek] = useLocalStorage("bevetel", []);
  const [kiadasok, setKiadasok] = useLocalStorage("kiadas", []);

  let bevosszeg = 0;
  let kiaosszeg = 0;
  let total = 0;
  let szazalek = 0;

  const submitData = () => {
    const data = {
      id: uuidv4(),
      type: type,
      amount: Number(amount),
      description: description,
      aktszaz: actualPercent(amount),
    };

    if (type === "bev") {
      setBevetelek((item) => [...item, data]);
    } else if (type === "kia") {
      setKiadasok((item) => [...item, data]);
    }

    setAmount("");
    setType("");
    setDescription("");
  };

  let actualPercent = (actualdata) => {
    if (total > 0) {
      return Math.round((actualdata / total) * 100);
    }
  };

  const totalSum = () => {
    let bev = 0;
    let kia = 0;

    bevetelek.map((akt) => {
      return (bev += akt.amount);
    });

    kiadasok.map((akt) => {
      return (kia += akt.amount);
    });

    return (total = bev - kia);
  };

  const setBevOsszeg = () => {
    bevetelek.map((akt) => {
      return (bevosszeg += akt.amount);
    });
  };
  const setKiaOsszeg = () => {
    kiadasok.map((akt) => {
      return (kiaosszeg += akt.amount);
    });
  };

  const getSzazalek = () => {
    if (bevetelek.length === 0) {
      szazalek = 0;
    }

    szazalek = Math.round((kiaosszeg / bevosszeg) * 100);
  };

  const tetelTorol = (id, type) => {
    if (window.confirm("Biztosan törölni szeretné ezt a tételt?") === true) {
      if (type === "bev") {
        const newArray = bevetelek.filter((item) => item.id !== id);
        setBevetelek(newArray);
      } else if (type === "kia") {
        const newArray = kiadasok.filter((item) => item.id !== id);
        setKiadasok(newArray);
      }
    }

    // if (type === "bev") {
    //   const copy = [...bevetelek];
    //   copy.splice(id, 1);
    //   setBevetelek(copy);
    // } else if (type === "kia") {
    //   const copy = [...kiadasok];
    //   copy.splice(id, 1);
    //   setKiadasok(copy);
    // }

    totalSum();
    setBevOsszeg();
    setKiaOsszeg();
  };

  totalSum();
  setBevOsszeg();
  setKiaOsszeg();
  getSzazalek();

  return (
    <div className="container">
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
              <div className="koltsegvetes__kiadasok--szazalek">
                {szazalek}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="hozzaad">
          <select
            className="hozzaad__tipus"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option hidden>-- Válassz egy típust --</option>
            <option value="bev">Bevétel</option>
            <option value="kia">Kiadás</option>
          </select>
          <input
            type="number"
            className="hozzaad__ertek"
            placeholder="Összeg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            className="hozzaad__leiras"
            placeholder="Leírás"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="hozzaad__gomb" onClick={submitData}>
            HOZZÁAD
          </button>
        </div>

        <div className="kontener">
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
                          <i className="ion-ios-close-outline"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
                          <i className="ion-ios-close-outline"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
