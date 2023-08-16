import './scroll.css';

function Scroll() {
    return(
        <div class="arrow-container animated fadeInDown">
            <div class="arrow-2"> 
                <i class="fa fa-angle-down"></i>
            </div>
            <div class="arrow-1 animated hinge infinite zoomIn">
            </div>
        </div>
    )
};

export default Scroll;