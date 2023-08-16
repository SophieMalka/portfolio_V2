import './item.css';

function Item( { title, business, contract, location, date, infos } ) {
    return(
        <div className='item'>
            <div className='item-header'>
                <div className='item-header-top'>
                    <h3 className='item-title'>{title}</h3>
                    <div className='item-contract-box'>
                        <p className='item-contract'>{contract}</p>
                    </div>
                </div>
                <div className='item-header-bottom'>
                    <p className='item-business'><i class="fa-regular fa-building"></i> {business}</p>
                    <p className='item-location'><i class="fa-solid fa-location-dot"></i> {location}</p>
                    <p className='item-date'><i class="fa-regular fa-calendar-days"></i> {date}</p>
                </div>
            </div>
            <div className='item-infos'>
                    {infos}
            </div>
        </div>
    )
};

export default Item;