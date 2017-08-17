var $ = require('jquery');
import AutoFlyout from './AutoFlyout.js';
const Types = {
  "BANK": 1,
  "INVESTMENT": 2,
  "LOAN": 3,
  "CREDIT_CARD": 4,
  "MORTGAGE": 5
};

class SearchControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setSearchKeyState = this.setSearchKeyState.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      searchKey: ''
    };
  }
  handleKeyDown = (event) => {
    let that = this;
    if (this.props.filteredProducts.products.length ||
        event.target.value.length === 0) {
      this.refs.child.showFlyout();
    } else {
      this.refs.child.hideFlyout();
    }
    if (40 === event.which) {
      $(event.target).next("div").find('a:first').focus();
      event.preventDefault();
    } else if (27 === event.which) {
      this.setState({ searchKey: '' });
      setTimeout(function () {
        that.handleChange(event);
      }, 100);
      event.preventDefault();
    }
  }
  setSearchKeyState = (event) => {
    this.setState({ searchKey: event.target.innerText });
    this.handleChange(event);
  }
  filterBasedOnKey = (searchKey) => {
    let filteredProducts = {
      products: []
    },
      key = searchKey.trim().toLowerCase();
    if (key) {
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
      searchKey = event.target ? (event.target.value || event.target.innerText) : '',
      catalog = {
        products: []
      };
    searchKey = searchKey || '';
    this.setState({ searchKey });
    if (!this.props.catalog.products.length) {
      $.ajax({
        dataType: "json",
        url: "https://api.myjson.com/bins/etsbt",
        success: (result) => {
          const products = result.products.map(function (rObj, index) {
            rObj.id = index + 1;
            rObj.typeId = Types[rObj.type] || 0;
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
    let noOfProducts = this.props.filteredProducts.products.length;
    return (
      <div>
        {noOfProducts > 20 && <h5>
          Long way to go!! You have <span className="orange">{noOfProducts}</span> results to check, keep typing.</h5>}
        {(noOfProducts <= 20 && noOfProducts > 1) && <h5>
          You are close!! You have <span className="green">{noOfProducts}</span> results to check.</h5>}
        {noOfProducts === 1 && <h5>
          Yay!! You have found what exactly you want</h5>}
        {(noOfProducts === 0 && !this.state.searchKey.length) && <h5>
          Go ahead!!</h5>}
                  {(noOfProducts === 0 && this.state.searchKey.length !== 0) && <h5>
          Hard luck !! No results for <span className="red" >{this.state.searchKey}</span></h5>}
        <input className="search-area__input" type="text" role="search" placeholder="Search name or URL!!"
          value={this.state.searchKey}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
        <AutoFlyout ref="child" isOpen={noOfProducts ? true : false}
          results={this.props.filteredProducts} setSearchKeyState={this.setSearchKeyState} />
      </div>
    );
  }
}

export default SearchControl;