import ResultCard from './ResultCard.js';

class ResultsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="wrapper wrapper--no-padding-until-large">
                <div className="row row--gutters row--equal-height-at-large row--gutters">
                    {
                        this.props.filteredProducts.products.map(
                            (result, index) => <ResultCard key={index} result={result} />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ResultsContainer;