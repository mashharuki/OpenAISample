import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

/**
 * Home Component
 * @returns 
 */
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState();
  const [chatResult, setChatResult] = useState();

  /**
   * onSubmit function
   * @param {*} event 
   */
  async function onSubmit(event) {
    event.preventDefault();
    try {
      // call generate api 
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  /**
   * chatAction function
   * @param {*} event 
   */
  async function chatAction(event) {
    event.preventDefault();

    try {
      // call generate api 
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setChatResult(data.result);
      setText("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Sample OpenAI APP</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <p/>
        <h3>Test Chat</h3>
        <form onSubmit={chatAction}>
          <input
            type="text"
            name="text"
            placeholder="Enter something"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="submit" value="Let's chat with Open AI!" />
        </form>
        <div className={styles.result}>{chatResult}</div>
      </main>
    </div>
  );
}
