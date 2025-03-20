import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ReserveTable from './components/ReserveTable';
import Hero from './components/Hero';

const seededRandom = function (seed) {
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
      return (s = s * a % m) / m;
  };
}

const fetchAPI = function(date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for(let i = 17; i <= 23; i++) {
      if(random() < 0.5) {
          result.push(i + ':00');
      }
      if(random() < 0.5) {
          result.push(i + ':30');
      }
  }
  console.log('results', result);
  return result;
};

function App() {
  // Change from use state to useReducer
  const [availableTimes, setAvailableTimes] = useState([]);

  function updateTimes(date, time) {
    if (time) {
      setAvailableTimes(availableTimes.filter(t => t !== time));
      return;
    }
    if (date) {
      const data = fetchAPI(date);
      setAvailableTimes(data);
      return;
    }
    const data = fetchAPI(new Date());
    setAvailableTimes(data);
  }

  useEffect(() => {
    updateTimes(new Date());
  }
  , []);

  return (
    <>
      <Header />
      <Hero />
      <Menu />
      <ReserveTable availableTimes={availableTimes} setAvailableTimes={updateTimes} />
      <Footer />
    </>
  );
}

export default App;
