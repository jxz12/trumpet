import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pressedKeys, setPressedKeys] = useState({});

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      setPressedKeys(prev => {
        // if (!pk.contains(event.code)) {
        if (!(event.code in prev)) {
          prev[event.code] = event.timeStamp;
        }
        return { ...prev }
      });
    });
    document.addEventListener('keyup', (event) => {
      setPressedKeys(prev => {
        delete prev[event.code];
        return { ...prev }
      });
    });
  }, []);

  const G3 = 196.00;
  const Ab3 = 207.65;
  const A3 = 220.00;
  const Bb3 = 233.08;
  let note = Bb3;
  if ('KeyJ' in pressedKeys) {
    note -= Bb3 - Ab3;
  }
  if ('KeyK' in pressedKeys) {
    note -= Bb3 - A3;
  }
  if ('KeyL' in pressedKeys) {
    // is this really how long we make it? It seems to not work with D...
    note -= Bb3 - G3;
  }

  // A1 = 55Hz
  const frequencies = [55];
  const multiplier = Math.pow(2, 1 / 12);
  for (let i = 1; i <= 12; i++) {
    frequencies.push(frequencies[frequencies.length - 1] * multiplier);
  }

  // harmonic series i.e. overtone standing waves
  let waveNumber = null;
  for (let i = 1; i <= 10; i++) {
    if (`Digit${i % 10}` in pressedKeys) {
      waveNumber = i;
      break
    }
  }

  let startingA = 1;
  let closestIdx = null;
  if (waveNumber !== null) {  // will be null if no note is played
    note *= waveNumber;
    // show an A to A scale that matches the note played
    while (note > frequencies[frequencies.length - 1]) {
      startingA += 1;
      frequencies.forEach((_, i) => frequencies[i] *= 2);
    }
    let closestDiff = note * 2;
    frequencies.forEach((f, i) => {
      let diff = Math.abs(note - f);
      if (diff < closestDiff) {
        closestIdx = i;
        closestDiff = diff;
      }
    })
  }

  return (
    <>
      <div>trumpet</div>
      <div>
        <span>{('KeyJ' in pressedKeys) ? 1 : 0}</span>
        <span> {('KeyK' in pressedKeys) ? 1 : 0}</span>
        <span> {('KeyL' in pressedKeys) ? 1 : 0}</span>
      </div>
      <div>{Math.floor(note)}</div>
      <div>notes</div>
      <div>
        {
          frequencies.map((frequency, i) => (
            <div key={i} style={i === closestIdx ? { color: 'red' } : {}}>
              {indexToNote(i, startingA)}: {Math.floor(frequency)}
            </div>
          ))
        }
      </div>
    </>
  )
}

function indexToNote(index, startingA) {
  // A = 0
  const letterIndex = index % 12;
  const letter = [
    'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'
  ][letterIndex];
  const number = startingA + Math.floor(index / 12);
  return `${letter}${number}`
}

export default App
