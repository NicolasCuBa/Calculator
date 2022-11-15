import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactCalculator />
    </div>
  );
}


const Tecla = (props) => {

  function handleClick() {
    props.keyClicked(props.keyId);
  }

  return (
    <div className={props.style} id={props.realId} onClick={handleClick}>{props.keyId}</div>
  )
}

const Display = (props) => {
  return (
    <div className="display" id="display">
      {props.msg}
    </div>
  )
}

const ReactCalculator = () => {

  const [display, setDisplay] = useState("0");
  const [isTotal, setisTotal] = useState(false);

  const ops = ["/", "*", "+", "-"];
  const resetZero = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "-"];
  const combinaciones = ["+-", "--", "/-", "*-"];

  const buscarIndiceMayor = (display) => {
    let result = -1;
    for (let i = 0; i < ops.length; i++) {
      let realIndex = display.indexOf(ops[i]);
      if (realIndex > result) {
        result = realIndex;
      }
    }
    return result;
  }

  const construirEval = (display) => {
    let ret = "";
    let openP = false;
    for (let i = 0; i < display.length; i++) {
      if (i == 0) {
        ret += display[i];
        continue;
      }
      let anterior = display[i - 1];
      let actual = display[i];
      let par = anterior + actual;
      if (ops.includes(actual) && openP == true) {
        ret += ")";
        openP = false;
      }
      if (combinaciones.includes(par)) {
        ret += "(" + actual;
        openP = true;
      } else {
        ret += display[i];
      }
    }
    if (openP == true) {
      ret += ")";
    }
    return ret;
  }


  const pointAllowed = (display) => {
    const realNum = display.substring(buscarIndiceMayor(display) + 1);
    return (!realNum.includes("."));
  }

  const handleChange = (msg) => {

    if(isTotal && !ops.includes(msg) && msg != "AC") {
      setDisplay(msg);
      setisTotal(false);
      return;
    } else {
      setisTotal(false);  
    }

    if (msg === "AC") {
      setDisplay("0");
      return;
    }

    if (msg == ".") {
      if (pointAllowed(display) == false) return;
    }

    if (display == "0" && msg == ".") {
      setDisplay(display + msg);
      return;
    }

    if (display == "0" && resetZero.includes(msg)) {
      setDisplay(msg);
      return;
    }

    if (display.slice(-1) == "(" && ops.includes(msg)) {
      return;
    }

    if (display == "-" && msg == "-") {
      return;
    }

    if (msg == "-" && combinaciones.includes(display.slice(-2))) {
      return;
    }

    if (ops.includes(msg) && ops.includes(display.slice(-1)) && msg != "-") {
      let anterior = display.slice(-1);
      let anteUltimo = display[display.length - 2];
      if (anterior == "-" && ops.includes(anteUltimo)) {
        setDisplay(display.slice(0, -2) + msg);
      } else {
        setDisplay(display.slice(0, -1) + msg);
      }
      return;
    }

    if (display == "0" && msg == "0") {
      return;
    }

      setDisplay(display + msg);

  }

  const calcular = () => {
    setDisplay(eval(construirEval(display)).toString());
    setisTotal(true);
  }

  return (

    <section className="contenedor-page">
      <div className="contenedor-calculator">
        <div className="contenedor-display">
          <Display msg={display} />
        </div>
        <div className="contenedor-keys">
          <div className="contenedor-numeros">
            <div className="numeros">
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key ancho colorRojo fontReset" keyId="AC" realId="clear" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key colorAmarillo tamañoSigno" keyId="/" realId="divide" />
            </div>
            <div className="numeros">
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="7" realId="seven" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="8" realId="eight" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="9" realId="nine" />
            </div>
            <div className="numeros">
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="4" realId="four" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="5" realId="five" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="6" realId="six" />
            </div>
            <div className="numeros">
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="1" realId="one" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="2" realId="two" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key" keyId="3" realId="three" />
            </div>
            <div className="numeros">
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key ancho" keyId="0" realId="zero" />
              <Tecla keyClicked={(msg) => handleChange(msg)} style="key tamañoSigno" keyId="." realId="decimal" />
            </div>
          </div>
          <div className="operadores">
            <Tecla keyClicked={(msg) => handleChange(msg)} style="key colorAmarillo tamañoSigno" keyId="*" realId="multiply" />
            <Tecla keyClicked={(msg) => handleChange(msg)} style="key colorAmarillo tamañoSigno" keyId="-" realId="subtract" />
            <Tecla keyClicked={(msg) => handleChange(msg)} style="key colorAmarillo tamañoSigno" keyId="+" realId="add" />
            <Tecla keyClicked={calcular} style="key altura colorAzul tamañoSigno" keyId="=" realId="equals" />
          </div>
        </div>
      </div>
    </section>

  );
}

export default App;
