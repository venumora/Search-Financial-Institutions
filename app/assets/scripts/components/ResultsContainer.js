var $ = require('jquery');
import ResultCard from './ResultCard.js';
const SearchCatText = ["Unknown types",
    "Banks",
    "Investments",
    "Loans",
    "Credit cards",
    "Mortgages"]

// Search results container component
class ResultsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let productTypes = [];
        // Get the list of product types (Banks, Loans etc) also the count of
        // results
        this.props.filteredProducts.products.forEach(function (product) {
            let exP = $.grep(productTypes, function (p) { return p.id === product.typeId });
            if (!exP.length) {
                productTypes.push({ id: product.typeId, count: 1 });
            } else {
                exP[0].count++;
            }
        });
        // Sort results in descending order of the count
        productTypes.sort(function (a, b) { return b.count - a.count });
        return (
            <div className="wrapper wrapper--no-padding-until-large">
                {productTypes.map((type) =>
                    <div className="row row--gutters row--gutters">
                        <h2>You have got {type.count} result(s) related to {SearchCatText[type.id]}</h2>
                        {
                            this.props.filteredProducts.products.map(
                                (result, index) => result.typeId === type.id && <ResultCard key={index} result={result} />
                            )
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default ResultsContainer;