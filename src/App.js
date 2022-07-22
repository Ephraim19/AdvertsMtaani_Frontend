import './App.css';
import Navbar from './components/Navbar';
import Motto from './components/Motto';
import About from './components/About';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <Navbar />
      <Motto />
      <About title = 'About Us' info = 'We are a revolutionary marketing and advertising agency based in Kenya that focuses on last mile streets. We are located in Kahawa west,Ruiru,Kikuyu, Kiambu and we are still growing' />
      <About title = 'Contact Us' info= 'Email: machayoephraim@gmail.com' />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
