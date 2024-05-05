import get, { AxiosResponse } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import { EpornerVideoSearchResponse } from './interfaces/eporner';
import { EPORNER_VIDEO_SEARCH_URL } from './utils';

// TODO: Break down into smaller components
const App = () => {
  const [inputText, setInputText] = useState('');
  const [searchResults, setSearchResults] = useState<EpornerVideoSearchResponse>();

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

    if (!response) return;
    setSearchResults(response.data);
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
      {!!searchResults?.total_count && (
        searchResults.videos.map(video => (
          <div key={video.id}>
            <div>
              <div>{video.title}</div>
              <a target="_blank" href={video.url}>
                <img src={video.default_thumb.src} />
              </a>
            </div>
            <br />
          </div>
        ))
      )}
      {/* TODO: Display count */}
      {searchResults && !searchResults.total_count && <div>No search results found</div>}
      {/* TODO: Pagination buttons */}
    </>
  );
}

export default App;
