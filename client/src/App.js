import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Search from './component/Search/Search.js'
function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Search />} />
    </Routes>
  </Router>
}

export default App;
