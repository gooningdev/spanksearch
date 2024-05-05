import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(`Submitted form with text '${inputText}'`);
    event.preventDefault();
    // TODO: Search
  };

  return (
    <>
      <h1>SpankSearch</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            id="searchBar"
            type="text"
            placeholder="Search"
            value={inputText}
            onChange={handleChange}
          />
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
