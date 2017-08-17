var $ = require('jquery');
import AutoFlyout from './AutoFlyout.js';

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
    return (
      <div>
        {this.props.filteredProducts.products.length > 20 && <h5>
          Long way to go!! You have {this.props.filteredProducts.products.length} results to check, keep typing.</h5>}
        {(this.props.filteredProducts.products.length <= 20 && this.props.filteredProducts.products.length > 1) && <h5>
          You are close!! You have {this.props.filteredProducts.products.length} results to check.</h5>}
        {this.props.filteredProducts.products.length === 1 && <h5>
          Yay!! You have found what exactly you want</h5>}
        {this.props.filteredProducts.products.length === 0 && <h5>
          It's time!!</h5>}
        <input className="search-area__input" type="text" role="search" placeholder="Search name or URL!!"
          value={this.state.searchKey}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
        <AutoFlyout ref="child" isOpen={this.props.filteredProducts.products.length ? true : false}
          results={this.props.filteredProducts} setSearchKeyState={this.setSearchKeyState} />
      </div>
    );
  }
}

export default SearchControl;