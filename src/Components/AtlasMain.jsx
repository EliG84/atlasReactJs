import React, { useState, useEffect } from 'react';
import AtlasHeader from './AtlasHeader';
import * as Api from '../Services/apiServices';
import { Route, Switch } from 'react-router-dom';
import '../Style/Atlas.css';
import AtlasStarter from './AtlasStarter';
import AtlasSingle from './AtlasSingle';

const AtlasMain = (pros) => {
  let [countries, setCountries] = useState([]);

  useEffect(() => {
    Api.apiGetAll().then((data) => {
      setCountries(data);
    });
  }, []);
  return (
    <div className='container justify-content-center'>
      <AtlasHeader countries={countries} />
      <Switch>
        <Route
          exact
          path='/'
          render={() => <AtlasStarter countries={countries} />}
        />
        <Route exact path='/country/:country' component={AtlasSingle} />
        <Route exact path='/code/:code' component={AtlasSingle} />
      </Switch>
    </div>
  );
};

export default AtlasMain;
