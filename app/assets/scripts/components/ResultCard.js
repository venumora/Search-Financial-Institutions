class ResultCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row__large-4">
        <div className="result-card">
          <div className="result-card__bank">
            <h5 className="result-card__type">{this.props.result.type}</h5>
          </div>
          <h3 className="result-card__title">{this.props.result.name}</h3>
          <a target="_blank" className="show result-card__link" href={this.props.result.url || '#'}>Check out more on their website!!</a>
        </div>
      </div>
    );
  }
}

export default ResultCard;