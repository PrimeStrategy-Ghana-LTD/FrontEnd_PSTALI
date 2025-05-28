import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Result</h1>
      <p className="text-gray-700">You searched for: <span className="font-medium">{query}</span></p>
      {/* Add actual asset detail rendering here */}
    </div>
  );
};

export default SearchResult;
