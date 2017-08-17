import React from 'react';
import ReactDOM from 'react-dom';

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="row__large-4">
            <div className="result">
                <span>Name: {this.props.result.name}</span><br/>
                <span>URL: {this.props.result.url}</span><br/>
                <span>Type: {this.props.result.type}</span><br/>               
            </div>
        </div>
    );
  }
}

export default ResultCard;