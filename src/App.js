import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ReserveTable from './components/ReserveTable';
import Hero from './components/Hero';

function App() {
  
  const [availableTimes, setAvailableTimes] = useState(["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"]);

  return (
    <>
      <Header />
      <Hero />
      <Menu />
      <ReserveTable availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />
      <Footer />
    </>
  );
}

export default App;
