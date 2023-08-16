import './card.css';
import { Link } from 'react-router-dom';

function Card( { imgUrl, title, description, stack, liveLink, codeLink } ) {
    return (
        <div className='card'>
            <img className='card-img' src={imgUrl} alt={title} />
            <h3 className='card-title'>{title}</h3>
            <p className='card-description'>{description}</p>
            <p className='card-stack'>Stack : {stack}</p>
            <div className='card-links'>
                <div className='card-live-link'>
                    <i class="fa-solid fa-link"></i>
                    <Link to={liveLink}>Voir en direct</Link>
                </div>
                <div className='card-code-link'>
                    <i class="fa-brands fa-github"></i>
                    <Link to={codeLink}>Voir le code</Link>
                </div>
            </div>
        </div>
    )
};

export default Card;