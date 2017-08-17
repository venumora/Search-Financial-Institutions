const ClassTypes = [
  "result-card__default",
  "result-card__bank",
  "result-card__invest",
  "result-card__loan",
  "result-card__cc",
  "result-card__mortgage"
];

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row__large-4">
        <div className="result-card">
          <div className={ClassTypes[this.props.result.typeId]}>
            <h5 className="result-card__type">{this.props.result.type.replace("_", " ")}</h5>
          </div>
          <h3 className="result-card__title">{this.props.result.name}</h3>
          <a target="_blank" className="show result-card__link" href={this.props.result.url || '#'}>Check out more on their website!!</a>
        </div>
      </div>
    );
  }
}

export default ResultCard;