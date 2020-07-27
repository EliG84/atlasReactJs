import React, { useState, useEffect } from 'react';
import AtlasHeader from './AtlasHeader';
import * as Api from '../Services/apiServices';

const AtlasMain = (pros) => {
  let [countries, setCountries] = useState([]);

  useEffect(() => {
    getApi();
    async function getApi() {
      let data = await Api.apiGetAll();
      setCountries(data);
      console.log(countries);
    }
  });
  return (
    <div className='container justify-content-center'>
      <AtlasHeader />
    </div>
  );
};

export default AtlasMain;
