import { Form, Input, Pagination } from "antd";
import get, { AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
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

  const handleSubmit = async () => {
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

  const handlePageChange = (/*page: number*/) => {
    // TODO: Implement
  };

  return (
    <>
      <h1>SpankSearch</h1>
      {/* Search bar */}
      <div className="card">
        <Form onFinish={handleSubmit}>
          <Input
            id="searchBar"
            type="text"
            placeholder="Search"
            value={inputText}
            onChange={handleChange}
          />
        </Form>
      </div>
      {/* Search results */}
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
      {searchResults && !searchResults.total_count && <div>No search results found</div>}
      {/* Pagination buttons */}
      {searchResults && searchResults.total_count && (
        <Pagination
          pageSize={searchResults?.per_page}
          total={searchResults?.total_count}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}

export default App;
