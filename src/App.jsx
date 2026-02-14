import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [nonPos, setNonPos] = useState({ top: "50%", left: "50%" });

  const genderText = {
    Homme: "mon Valentine",
    Femme: "ma Valentine",
    Autre: "mon ami·e",
  };

  const letterMessage = `Chère ${name}, je t'aime beaucoup et je suis tellement content(e) que tu sois là... 💌💖`;


  const moveNon = () => {
    const maxTop = window.innerHeight - 60;
    const maxLeft = window.innerWidth - 120;
    setNonPos({
      top: Math.random() * maxTop + "px",
      left: Math.random() * maxLeft + "px",
    });
    setNoCount((prev) => prev + 1);
  };

  return (
    <div className="container">
      
      {step === 2 && !accepted && (
        <button
          className="no"
          style={{ top: nonPos.top, left: nonPos.left }}
          onMouseEnter={moveNon}
        >
          Non
        </button>
      )}

      
      <div className="centered">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="step"
            >
              <h1>Quel est ton prénom ?</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ton prénom"
              />
              <button disabled={!name} onClick={() => setStep(1)}>
                Suivant
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="step"
            >
              <h1>Quel est ton genre ?</h1>
              {["Homme", "Femme", "Autre", "Préférer ne pas dire"].map(
                (g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGender(g);
                      setStep(2);
                    }}
                  >
                    {g}
                  </button>
                )
              )}
            </motion.div>
          )}

          {step === 2 && !accepted && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="step"
            >
              <h1>Veux-tu être {genderText[gender]} ? ❤️</h1>
              
              <button className="yes" onClick={() => setAccepted(true)}>
                Oui 💕
              </button>
            </motion.div>
          )}

          {step === 2 && accepted && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="step"
            >
              <div className="flowers">🌸🌹🌺🌷✨🌸🌹🌺</div>
              <motion.div
                className="letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2>Une lettre pour toi ❤️</h2>
                <p>{letterMessage}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hearts-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="heart">
            💖
          </div>
        ))}
      </div>
    </div>
  );
}
