import React, { useState } from 'react';
import { translateCode } from '../utils/codeTranslator';

const CodeTranslatorDemo = () => {
  const [inputCode, setInputCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Java');

  const handleTranslate = () => {
    const result = translateCode(inputCode, targetLanguage);
    setTranslatedCode(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Code Translator Demo</h2>
      <textarea
        placeholder="Enter your code here..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        rows="10"
        cols="50"
        style={{ width: '100%', marginBottom: '10px' }}
      ></textarea>
      <br />
      <label htmlFor="language-select" style={{ marginRight: '10px' }}>Translate to:</label>
      <select
        id="language-select"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        <option value="Java">Java</option>
        <option value="COBOL">COBOL</option>
      </select>
      <br />
      <button onClick={handleTranslate} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Translate Code
      </button>
      <h3>Translated Code:</h3>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
        {translatedCode}
      </pre>
    </div>
  );
};

export default CodeTranslatorDemo;