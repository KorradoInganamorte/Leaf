import { useState, useEffect, useRef } from "react";
import { Routes, Route, json } from "react-router-dom";

import Header from "./component/Header";
import Card from "./component/Card";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);

  const [inputValueError, setInputValueError] = useState(false);
  const [inputSendNullError, setInputSendNullError] = useState(false)
  const [inputClearNullError, setInputClearNullError] = useState(false)

  const inputRef = useRef(null);
  const inputSendNumRef = useRef(null)
  const inputClearNumRef = useRef(null)

  function updateItems() {
    try {
      axios.get("https://64c79dd2a1fe0128fbd50823.mockapi.io/card").then((result) => {
        setItems(result.data)
      })
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    updateItems()
  }, []);

  function clearClick() {
    if(inputClearNumRef.current.value === "1" || inputClearNumRef.current.value === "2") {
      const Num = inputClearNumRef.current.value
      setInputClearNullError(false)
      axios.put(`https://64c79dd2a1fe0128fbd50823.mockapi.io/card/${Num - 1}`, { text: "" }).then(() => {
        updateItems()
        })
    } else if(inputClearNumRef.current.value === "") {
      setInputClearNullError("the field cannot be empty")
    } else {
      setInputClearNullError("invalid value. '1' or '2'")
    }
  }

  function sendClick() {
    if(inputSendNumRef.current.value === "1" || inputSendNumRef.current.value === "2") {
      const num = inputSendNumRef.current.value
      const words = inputRef.current.value.split(" ");
      setInputSendNullError(false)
      words.map((word) => {
        if (word.length > 32) {
          setInputValueError(!inputValueError);
        } else {
          if (num === "1") {
            axios
              .put("https://64c79dd2a1fe0128fbd50823.mockapi.io/card/0", {
                text: inputRef.current.value,
              })
              .then(() => {
                updateItems()
              });
          } else if(num === "2") {
            axios
              .put("https://64c79dd2a1fe0128fbd50823.mockapi.io/card/1", {
                text: inputRef.current.value,
              })
              .then(() => {
                updateItems()
            });
          }
        }
      });
    } else if(inputSendNumRef.current.value === "") {
      setInputSendNullError("the field cannot be empty")
    } else {
      setInputSendNullError("invalid value. '1' or '2'")
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-screen">
              <img
                className="w-screen relative"
                src="/images/background-flower.jpg"
                alt="flower"
              />
              <Header />
              <div className="absolute top-0 pt-[18rem] pl-[7.5rem] max-w-[75.5rem]">
                <h1 className="text-6xl font-bold mb-2">
                  This is my first project
                </h1>
                <p className="text-5xl font-medium mb-8">
                  In it I tried to combine my knowledge in web development and
                  skills in design
                </p>
                <button className="button-border rounded-2xl py-4 px-8 text-3xl font-bold hover:bg-white transition ease-in-out">
                  What exactly?
                </button>
              </div>
            </div>
          }
        />
      </Routes>

      <div className="relative flex align-center justify-center w-screen h-[21rem] bg-gradient-to-b from-[#B6EDFF] to-white">
        <div className="dream-card w-[50%] h-min py-4 px-6 text-3xl font-medium rounded-2xl border border-black">
          While I was doing this project, I imagined myself flying in the
          clouds, eating bounty and drinking green tea
        </div>
      </div>

      <div className="w-screen flex justify-center items-center">
        <img
          className="relative w-screen"
          src="/images/background-sky.jpg"
          alt="sky"
        />

        <div className="absolute translate-y-[-35rem] flex flex-col items-center">
          <input
            ref={inputRef}
            id="set-text-1"
            className="inline-block bg-white rounded-2xl border border-black py-[1.5rem] px-[1.5rem] font-medium text-2xl mb-[.5rem]"
            placeholder="Enter the text"
          />
          {inputValueError ? 
            <p className="text-lg font-regular text-[#FF3333] mb-[.5rem] translate-y-[-.5rem]">
              the word must be less than 32 characters
            </p>
           : null}
          <div className="mb-[1.5rem] text-2xl font-medium">
            <div className="flex mb-[.5rem]">
              <input 
                ref={inputSendNumRef}
                className="w-[12.5rem] flex items-center justify-center bg-white rounded-lg border border-black py-[.5rem] px-[1rem] font-medium text-lg mr-[1.5rem]"
                placeholder="Enter the text"
              />
                <button
                  id="0"
                  onClick={sendClick}
                  className="bg-white/0 hover:bg-white transition ease-in-out rounded-lg border border-black px-[2rem]"
                >
                  Send
                </button>
            </div>
            {inputSendNullError ? <p className="text-lg font-regular text-[#FF3333] translate-y-[-.5rem]">
            {inputSendNullError}
            </p>
           : null}
              <div className="flex mb-[.5rem]">
                <input
                ref={inputClearNumRef}
                className="w-[12.5rem] flex items-center justify-center bg-white rounded-lg border border-black py-[.5rem] px-[1rem] font-medium text-lg mr-[1.5rem]"
                placeholder="Enter the text"
                />
                <button
                  onClick={clearClick}
                  className="bg-white/0 hover:bg-white transition ease-in-out rounded-lg border border-black px-[2rem]"
                >
                  Clear
                </button>
              </div>
              {inputClearNullError ? <p className="text-lg font-regular text-[#FF3333] translate-y-[-.5rem]">
            {inputClearNullError}
            </p> : null}
          </div>
          <p className="text-2xl font-medium max-w-[45rem]">
            The entered text will be displayed inside the card. Enter the text
            and then press "Send"
          </p>
        </div>

        <div className="absolute flex column w-screen justify-evenly">
          {items.map((item) => (
            <Card header={item.header} text={item.text} key={item.key} />
          ))}
        </div>
      </div>

      <div className="w-screen h-[48rem] bg-white flex flex-col items-center py-[3.5rem]">
        <div className="bg-white custom-shadow text-3xl font-bold py-[1.5rem] px-[2.5rem] max-w-[50%] border border-black rounded-2xl mb-[4.5rem]">
          Hi! I have recently started studying web development and delving into
          design, I am just starting my journey, could you support me in this
          matter.
        </div>
        <div className="w-screen flex justify-evenly">
          <div>
            <div className="bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[2.5rem] px-[4rem] mb-[2rem]">
              Subscribe to my social networks:
            </div>
            <div className="inline-block bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[1.4rem] px-[1.6rem]">
              VK
            </div>
          </div>

          <div>
            <div className="bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[2.5rem] px-[4rem] mb-[2rem]">
              Сan you support me with a donation
            </div>
            <div className="inline-block bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[1.4rem] px-[1.6rem] mr-[1.5rem]">
              PayPal
            </div>
            <div className="inline-block bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[1.4rem] px-[1.6rem] mr-[1.5rem]">
              MasterCard
            </div>
            <div className="inline-block bg-white border border-black rounded-2xl custom-shadow text-3xl font-medium py-[1.4rem] px-[1.6rem]">
              Qiwi
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
