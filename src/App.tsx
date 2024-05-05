import get, { AxiosResponse } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { EpornerVideoSearchResponse } from './interfaces/eporner';
import { EPORNER_VIDEO_SEARCH_URL } from './utils';

const App = () => {
  const [inputText, setInputText] = useState('');
  // TODO: Store search results

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Search videos
    let response: AxiosResponse<EpornerVideoSearchResponse> | null = null;
    try {
      const url = EPORNER_VIDEO_SEARCH_URL.replace('{0}', encodeURIComponent(inputText));
      response = await get(url);
    } catch (e) {
      console.error('Error searching videos.', e);
      // TODO: Indicate error to user
    }
    console.log('Video search results:', response?.data);
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
      </div>
    </>
  );
}

export default App;
