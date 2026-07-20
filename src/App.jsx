import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import './styles/index.css';

export default function App() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
