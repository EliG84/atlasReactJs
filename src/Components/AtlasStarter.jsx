import React from 'react';
import { Link } from 'react-router-dom';

const AtlasStarter = (props) => {
  const staterCountries = [
    'Israel',
    'United States of America',
    'Thailand',
    'France',
  ];

  return (
    <div className='bg-light d-flex flex-wrap text-center justify-content-center m-2'>
      {props.countries.length > 0 ? (
        <h2 className='col-12 font-weight-bold font-italic'>Pick a Flag</h2>
      ) : (
        <></>
      )}
      {props.countries.length > 0 ? (
        props.countries
          .filter((item) => staterCountries.includes(item.name))
          .map((item, i) => (
            <Link key={i} to={`/code/${item.alpha3Code}`}>
              <img className='imgMain m-1' alt={item.name} src={item.flag} />
            </Link>
          ))
      ) : (
        <h2>Loading Api....</h2>
      )}
    </div>
  );
};

export default AtlasStarter;
