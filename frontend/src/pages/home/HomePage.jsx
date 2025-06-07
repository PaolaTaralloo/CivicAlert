import HeroSection from '../../components/home/HeroSectionComp.jsx';
import ComeFunziona from '../../components/home/ComeFunzionaComp.jsx';
import PercheUsare from '../../components/home/PercheUsareComp.jsx';
import SegnalazioniMap from '../../components/home/MapSegnalazioneComp.jsx';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ComeFunziona />
      <PercheUsare />
      <SegnalazioniMap /> {/* nuova sezione map */}
    </>
  );
};

export default Home;
