import React, { useState, useEffect } from 'react';
import MocData from './MocData';
import './CardListing.css'

const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [activeTab, setActiveTab] = useState('your');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');

  useEffect(() => {
    setCards(MocData.data);
    setFilteredCards(MocData.data);
  }, []);

  useEffect(() => {
    let filtered = cards;
    if (activeTab !== 'all') {
      filtered = filtered.filter((card) => card.status === activeTab);
    }

    if (cardTypeFilter) {
      filtered = filtered.filter((card) => card.card_type === cardTypeFilter);
    }

    setFilteredCards(filtered);
  }, [activeTab, cardTypeFilter, cards]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);

    
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredCards(filtered);
  };

  const handleCardTypeFilter = (event) => {
    setCardTypeFilter(event.target.value);
  };

  return (
    <div>
        <center>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'your' ? 'active' : ''}`}
          onClick={() => handleTabClick('your')}
        >
          Your
        </button>
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === 'blocked' ? 'active' : ''}`}
          onClick={() => handleTabClick('blocked')}
        >
          Blocked
        </button>
      </div>
    
       
      <div className="filter-section ">
        <input
          type="text"
          placeholder="Search by card name"
          value={searchQuery}
          onChange={handleSearch}/>

        <select value={cardTypeFilter} onChange={handleCardTypeFilter} >
          <option value="">All Types</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      

      
      </center>
      <div className='card-listing '>
        {
            filteredCards.map((cards,index)=>{
                return(
                    <div className="card " key={index}>
                    <div className="card-type card-title">{cards.card_type}</div>
                    <div className="card-details">
                      <div className="card-name">{cards.name}</div>
                      <div className="budget-name">{cards.budget_name}</div>
                      {cards.card_type==='burner' && <div>Expiry:{cards.expiry} </div>}
                      {cards.card_type==='subscription' && <div>Limit:{cards.limit}</div>}
                      {/* {cards.card_type === 'burner' && <div className="expiry">Expiry: {cards.expiry}</div>} */}
                      {/* {cards.card_type === 'subscription' && <div className="limit">Limit: {cards.limit}</div>} */}
                    </div>
                  </div>
                )
            })
        }
      </div>
    
    </div>
  );
};

export default CardListing;
