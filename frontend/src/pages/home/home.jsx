import './home.css';
import Nav from '../../components/nav/nav';
import Header from '../../components/header/header';
import Scroll from '../../components/scroll/scroll';
import Stack from '../../components/stack/stack';

function Home() {
  return (
    <section id='home'>
      <Nav />
      <Header />
      <Scroll />
      <Stack />
    </section>
  );
}

export default Home;
