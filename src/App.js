import useLocalStorage from "use-local-storage";
import Top from "./Top";
import Inputs from "./Inputs";
import Incomes from "./Incomes";
import Expenses from "./Expenses";

function App() {
  const [bevetelek, setBevetelek] = useLocalStorage("bevetel", []);
  const [kiadasok, setKiadasok] = useLocalStorage("kiadas", []);

  let szazalek = 0;
  let total = 0;
  let bevosszeg = 0;
  let kiaosszeg = 0;

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
    bevetelek.reduce((acc, curr) => acc + curr, 0);
  };

  const setKiaOsszeg = () => {
    kiadasok.reduce((acc, curr) => acc + curr, 0);
  };

  const getSzazalek = () => {
    if (bevetelek.length !== 0) {
      szazalek = Math.round((kiaosszeg / bevosszeg) * 100);
    }
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

    totalSum();
    setBevOsszeg();
    setKiaOsszeg();
  };

  (function init() {
    totalSum();
    setBevOsszeg();
    setKiaOsszeg();
    getSzazalek();
  })();

  return (
    <div className="container">
      <Top
        szazalek={szazalek}
        total={total}
        bevosszeg={bevosszeg}
        kiaosszeg={kiaosszeg}
      />
      <div className="bottom">
        <Inputs
          total={total}
          bevetelek={bevetelek}
          kiadasok={kiadasok}
          setBevetelek={setBevetelek}
          setKiadasok={setKiadasok}
        />
        <div className="kontener">
          <Incomes bevetelek={bevetelek} tetelTorol={tetelTorol} />
          <Expenses kiadasok={kiadasok} tetelTorol={tetelTorol} />
        </div>
      </div>
    </div>
  );
}

export default App;
