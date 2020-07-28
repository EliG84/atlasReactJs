import React, { useState, useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import * as Api from '../Services/apiServices';
import '../App.css';
import { Link } from 'react-router-dom';

const AtlasSingle = (props) => {
  let [country, setCountry] = useState(null);
  let [notFound, setNotFound] = useState(false);
  let [borders, setBorders] = useState([]);

  useEffect(() => {
    if (props.match.url.includes('country')) {
      const country = props.match.url.split('/');
      Api.apiCountry(country[2]).then((data) => {
        if (data.status === 404) return setNotFound(true);
        if (data[0].latlng.length < 2) {
          data[0].latlng[0] = 0;
          data[0].latlng[1] = 0;
        }
        Api.apiBorders(data[0].borders).then((data) => {
          setBorders(data);
        });
        setNotFound(false);
        setCountry(data[0]);
      });
    }
    if (props.match.url.includes('code')) {
      const code = props.match.url.split('/');
      Api.apiCode(code[2]).then((data) => {
        if (data.status === 404) return setNotFound(true);
        if (data.latlng.length < 2) {
          data.latlng[0] = 0;
          data.latlng[1] = 0;
        }
        Api.apiBorders(data.borders).then((data) => {
          setBorders(data);
        });
        setNotFound(false);
        setCountry(data);
      });
    }
  }, [props.match]);
  return (
    <div className='text-center'>
      {notFound ? (
        <h2>Invalid country name try again!</h2>
      ) : country ? (
        <div className='card row'>
          <h2 className='font-italic font-weight-bold mb-3'>{country.name}</h2>
          <div className='d-flex'>
            <img
              className='img-thumbnail float-left col-6 col-lg-4'
              src={country.flag}
              alt=''
            />
            <div className='d-flex flex-column ml-3 text-left'>
              <p className='font-weight-bold'>
                POP:
                {' ' +
                  country.population
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </p>
              <p className='font-weight-bold'>Region:{'  ' + country.region}</p>
              <p className='font-weight-bold'>
                Languages:
                {country.languages.map((item, i) => (
                  <span key={i}> {item.name} </span>
                ))}
              </p>
              <p className='font-weight-bold'>
                Coin:{' '}
                {country.currencies.map((item, i) => (
                  <span key={i}> {item.code} </span>
                ))}{' '}
              </p>
              <p className='font-weight-bold'>
                Capital: {' ' + country.capital}
              </p>
            </div>
          </div>
          <div>
            <h5 className=''>
              Borders with:
              {country.borders.map((item, i) => (
                <span key={i}>
                  {' '}
                  <Link to={`/code/${item}`}>{borders[i]}</Link>{' '}
                </span>
              ))}
            </h5>
          </div>
          <Map center={[country.latlng[0], country.latlng[1]]} zoom={7}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[country.latlng[0] || 0, country.latlng[1] || 0]}
            />
          </Map>
        </div>
      ) : (
        <h2>Loading Api....</h2>
      )}
    </div>
  );
};
export default AtlasSingle;
