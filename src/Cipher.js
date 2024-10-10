import { useState } from 'react';

const Cipher = () => {
  const [text, setText] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [letterFrequencies, setLetterFrequencies] = useState({});

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAnalyze = () => {
    const frequency = {};

    for (const letter of text) {
      if (letter.match(/[a-zA-Z]/)) {
        const lowerCaseLetter = letter.toLowerCase();
        frequency[lowerCaseLetter] = (frequency[lowerCaseLetter] || 0) + 1;
      }
    }

    setLetterFrequencies(frequency);
  };

  const handleDecrypt = () => {
    const frequencyArray = Object.keys(letterFrequencies).sort((a, b) => letterFrequencies[b] - letterFrequencies[a]);
    const decryptionMap = {};

    // Create a mapping for decryption
    if (frequencyArray.length > 0) {
      decryptionMap[frequencyArray[0]] = 'e'; // Map the most frequent letter to 'e'
    }
    if (frequencyArray.length > 1) {
      decryptionMap[frequencyArray[1]] = 't'; // Map the second most frequent letter to 't'
    }

    const decryptedText = text.split('').map(char => {
      const lowerCaseChar = char.toLowerCase();
      if (lowerCaseChar in decryptionMap) {
        return char === char.toLowerCase() ? decryptionMap[lowerCaseChar] : decryptionMap[lowerCaseChar].toUpperCase();
      }
      return char; // Keep non-matching characters unchanged
    }).join('');

    setDecrypted(decryptedText);
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Decryption Cipher</h1>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Text:</label>
        <textarea
          className="p-2 border border-gray-400 rounded"
          value={text}
          onChange={handleTextChange}
          rows={10}
          cols={50}
        />
      </div>
      <div className="flex flex-row mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleAnalyze}
        >
          Analyze
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDecrypt}
        >
          Decrypt
        </button>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Decrypted Text:</label>
        <textarea
          className="p-2 border border-gray-400 rounded"
          value={decrypted}
          rows={10}
          cols={50}
          readOnly
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Letter Frequencies:</label>
        <ul>
          {Object.keys(letterFrequencies).map((letter, index) => (
            <li key={index}>
              {letter}: {letterFrequencies[letter]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cipher;