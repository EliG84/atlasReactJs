import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Style/Atlas.css';

const AtlasHeader = (props) => {
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(6);

  let history = useHistory();

  const next = () => {
    if (end >= props.countries.length - 1) {
      return;
    }
    setEnd(end + 1);
    setStart(start + 1);
  };

  const prev = () => {
    if (start <= 0) {
      setStart(0);
      setEnd(6);
      return;
    }
    setEnd(end - 1);
    setStart(start - 1);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (e.target.search.value === '') return alert('Must Enter a value!');
    history.push(`/country/${e.target.search.value}`);
    e.target.search.value = '';
  };

  return (
    <header className='jumbotron text-center p-0 hbg d-flex flex-column flex-lg-row flex-wrap justify-content-between align-items-center justify-items-center'>
      <h2 className='hHeader col-12 font-weight-bold'>ATLAS v2.0</h2>
      <div className='d-flex justify-content-between col-lg-6 col m-0 ml-lg-1 p-0 align-items-center'>
        <svg
          onClick={prev}
          cursor='pointer'
          width='2em'
          height='2em'
          viewBox='0 0 16 16'
          className='bi bi-arrow-left-square-fill'
          fill='white'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.354 10.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z'
          />
        </svg>
        {props.countries
          .filter((item, i) => i > start && i <= end)
          .map((item, i) => (
            <Link key={i} to={`/code/${item.alpha3Code}`}>
              <img
                className='p-0 m-0'
                data-toggle='tooltip'
                title={item.name}
                alt={item.name}
                src={`https://www.countryflags.io/${item.alpha2Code}/shiny/64.png`}
              />
            </Link>
          ))}
        <svg
          cursor='pointer'
          onClick={next}
          width='2em'
          height='2em'
          viewBox='0 0 16 16'
          className='bi bi-arrow-right-square-fill'
          fill='white'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z'
          />
        </svg>
      </div>
      <div className='col-lg-5 mt-lg-2 mt-2 m-0 p-0 mr-lg-2'>
        <form onSubmit={formSubmit} className='d-flex justify-content-between'>
          <input
            className='form-control'
            type='text'
            name='search'
            id='search'
            placeholder='Enter Country Name'
          />
          <input
            className='btn btn-sm btn-danger font-weight-bold'
            type='submit'
            value='Search'
          />
        </form>
      </div>
    </header>
  );
};

export default AtlasHeader;
