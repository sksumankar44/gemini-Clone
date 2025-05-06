import { createContext, useState, useRef } from "react";
import runChat from "../config/gemini";

export const ContextNew = createContext();

const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevprompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const generationIdRef = useRef(0);
  const timeouts = useRef([]);

  // Clear all pending timeouts
  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };
  // ✅ Modified: Animation now only works for the current prompt using ID check
  const delayPara = (index, nextWord, currentId) => {
    const timeout = setTimeout(() => {
      if (generationIdRef.current === currentId) {
        setResultData((prev) => prev + nextWord);
      }
    }, 75 * index);
    timeouts.current.push(timeout);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    try {
      clearAllTimeouts();
      const currentId = Date.now(); // ✅ Unique ID for current prompt session
      generationIdRef.current = currentId;
      setResultData("");
      setLoading(true);
      setShowResult(true);

      //** */
      let actualPrompt = prompt?.trim() || input.trim();
      const response = await runChat(actualPrompt);

      setRecentPrompt(actualPrompt);

      // ✅ Prevent duplicates in prevprompt
      setPrevPrompt((prev) => {
        const updated = [...prev, actualPrompt];
        return [...new Set(updated)];
      });

      // **
      // let response;
      // if (prompt !== undefined) {
      //   response = await runChat(prompt);
      //   setRecentPrompt(prompt);
      //   setPrevPrompt((prev) => [...prev, prompt]);
      // } else {
      //   response = await runChat(input);
      //   setRecentPrompt(input);
      //   setPrevPrompt((prev) => [...prev, input]);
      // }

      //Not inc
      // setRecentPrompt(input);
      // setPrevPrompt((prev) => [...prev, prompt]);

      // const response = await runChat(input);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      // setResultData(newResponse2);
      let newResponseArray = newResponse2.split(" ");
      newResponseArray.forEach((word, index) => {
        delayPara(index, word + " ", currentId);
      });

      setLoading(false);
      setInput("");

      //   setResponse(result);
      //   console.log("Gemini API Response:", result); // ✅ Console output here
    } catch (error) {
      console.error("Error from Gemini API:", error);
    }
  };

  // ✅ Give prompt here for testing
  //   useEffect(() => {
  //     onSent("What is React JS?");
  //   }, []);
  const contextValue = {
    prevprompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    response,
    newChat,
  };

  return (
    <ContextNew.Provider value={contextValue}>{children}</ContextNew.Provider>
  );
};

export default ContextProvider;

//Perfect Code for giving response in console

// import { createContext, useEffect, useState } from "react";
// import runChat from "../config/gemini";

// export const ContextNew = createContext();

// const ContextProvider = ({ children }) => {
//   const [response, setResponse] = useState("");

//   const onSent = async (prompt) => {
//     try {
//       const result = await runChat(prompt);
//       setResponse(result);
//       console.log("Gemini API Response:", result); // ✅ Console output here
//     } catch (error) {
//       console.error("Error from Gemini API:", error);
//     }
//   };
//   // ✅ Give prompt here for testing
//   useEffect(() => {
//     onSent("What is React JS?");
//   }, []);
//   const contextValue = {
//     onSent,
//     response,
//   };

//   return (
//     <ContextNew.Provider value={contextValue}>{children}</ContextNew.Provider>
//   );
// };

// export default ContextProvider;
