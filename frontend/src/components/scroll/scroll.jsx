import './scroll.css';
import { Link, animateScroll as scroll } from "react-scroll";

function Scroll( { link } ) {
    return(
        <Link to={link} smooth={true} duration={500}>
            <button class="arrow-container animated fadeInDown">
                <div class="arrow-2"> 
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="arrow-1 animated hinge infinite zoomIn">
                </div>
            </button>
        </Link>
    )
};

export default Scroll;