import './header.css';
import Portrait from '../../assets/img/portrait.jpeg';

function Header() {
    return(
        <header>
            <h1>Bonjour 👋🏼,<br />Je m'appelle<br /><span className='my-name'>Sophie Malka</span><br />Développeuse web</h1>
            <img className='portrait' src={Portrait} alt='Sophie Malka' />
        </header>
    )
};

export default Header;