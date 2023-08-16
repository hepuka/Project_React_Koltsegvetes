import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Inputs = ({ total, bevetelek, kiadasok, setBevetelek, setKiadasok }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const submitData = () => {
    const data = {
      id: uuidv4(),
      type: type,
      amount: Number(amount),
      description: description,
      aktszaz: actualPercent(amount),
    };

    if (type.length === 0 || amount.length === 0 || description.length === 0) {
      alert("Add meg a hiányzó adatokat");
      return;
    }

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

  return (
    <div className="hozzaad">
      <select
        className="hozzaad__tipus"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option hidden>-- Válassz egy típust --</option>
        <option value="bev">Bevétel</option>
        <option value="kia">Kiadás</option>
      </select>
      <input
        type="number"
        className="hozzaad__ertek"
        placeholder="Összeg"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        className="hozzaad__leiras"
        required
        placeholder="Leírás"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="hozzaad__gomb" onClick={submitData}>
        HOZZÁAD
      </button>
    </div>
  );
};

export default Inputs;
