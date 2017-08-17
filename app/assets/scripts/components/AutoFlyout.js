import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class AutoFlyout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <ul>
            {
                this.props.results.products.slice(0,10).map(result =>
                <li key={result.id}>{result.name}</li>
            )}
          </ul>
        </div>
    );
  }
}

export default AutoFlyout;