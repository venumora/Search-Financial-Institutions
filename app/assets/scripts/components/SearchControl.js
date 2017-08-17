var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');
import AutoFlyout from './AutoFlyout.js';

class SearchControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchKey: ''
    };
  }
  filterBasedOnKey = (searchKey) => {
    let filteredProducts = {
      products: []
    },
      key = searchKey.toLowerCase();
    if (searchKey) {
      filteredProducts.products =
        this.props.catalog.products.filter(
          product => (product.name.toLowerCase().indexOf(key) !== -1 ||
            product.type.toLowerCase().indexOf(key) !== -1 ||
            product.url.toLowerCase().indexOf(key) !== -1)
        );
    }
    this.props.setAppStateCallback({ filteredProducts });
  }
  handleChange = function (event) {
    let that = this,
      searchKey = event.target.value,
      catalog = {
        products: []
      };
    this.setState({ searchKey });
    if (!this.props.catalog.products.length) {
      $.ajax({
        dataType: "json",
        url: "https://api.myjson.com/bins/etsbt",
        success: (result) => {
          const products = result.products.map(function (rObj, index) {
            rObj.id = index + 1;
            return rObj;
          });
          catalog.products = products;
          catalog.products.sort(function (a, b) {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            } else if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          this.props.setAppStateCallback({ catalog });
          that.filterBasedOnKey(searchKey);
        }
      });
    } else {
      that.filterBasedOnKey(searchKey);
    }
  }

  render() {
    let searchKey = this.state.searchKey;
    return (
      <div>
        <input className="search-area__input" type="text" role="search" placeholder="Search here!!"
          value={searchKey}
          onChange={this.handleChange} />
        <AutoFlyout results={this.props.filteredProducts} />
      </div>
    );
  }
}

export default SearchControl;