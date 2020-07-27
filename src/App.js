import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AtlasMain from './Components/AtlasMain';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <AtlasMain />
      </Router>
    );
  }
}

export default App;
