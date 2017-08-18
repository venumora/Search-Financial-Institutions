var $ = require('jquery');
const SearchCatText = ["Unknown types",
  "Banks",
  "Investments",
  "Loans",
  "Credit cards",
  "Mortgages"]

// Search drop down component
class AutoFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpen: false
    }
    let that = this;
    // handles document click and closes drop down
    $(document).click(function () {
      that.hideFlyout();
    });
  }
  // show drop down
  showFlyout = () => {
    this.setState({ isOpen: true });
  }
  // hide drop down
  hideFlyout = () => {
    this.setState({ isOpen: false });
  }
  handleClick = (event) => {
    this.props.setSearchKeyState(event);
    this.hideFlyout();
    event.preventDefault();
  }
  handleFocus = (event) => {
    $(".focused").removeClass('focused');
    $(event.target).parent('div').addClass('focused');
  }
  // Handles search results keyboard accessibility.
  handleKeyDown = (event) => {
    let target = $(event.target);
    // Up arrow, focuses previous item and rotates when reaches first item.
    if (38 === event.which) {
      let prevDiv = target.parent('div').prev('div');
      if (prevDiv.length) {
        prevDiv.find('a:visible').focus();
      } else {
        let prevLi = target.parents('li').prev('li');
        if (prevLi.length) {
          prevLi.find('a:visible:last').focus();
        } else {
          target.parents('ul').find('a:visible:last').focus();
        }
      }
      event.preventDefault();
    } else if (40 === event.which) {
      // Down arrow, focuses next item and rotates when reaches last item.
      let nextDiv = target.parent('div:visible').next('div:visible');
      if (nextDiv.length) {
        nextDiv.find('a').focus();
      } else {
        let nextLi = target.parents('li').next('li');
        if (nextLi.length) {
          nextLi.find('a:first').focus();
        } else {
          target.parents('ul').find('a:first').focus();
        }
      }
      event.preventDefault();
    } else if (13 === event.which) {
      // Enter key sets the state.
      this.handleClick(event);
      event.preventDefault();
    } else if (27 === event.which) {
      // Esc closes the dropdown
      this.hideFlyout();
    }
  }
  render() {
    let productTypes = [];
    this.props.results.products.slice(0, 15).forEach(function (product) {
      let exP = $.grep(productTypes, function (p) { return p.id === product.typeId });
      if (!exP.length) {
        productTypes.push({ typeId: product.typeId, count: 1 });
      } else {
        exP[0].count++;
      }
    });
    productTypes.sort(function (a, b) { return b.count - a.count });
    return (
      <div className={(this.props.isOpen && this.state.isOpen) ? 'flyout show' : 'flyout hide'}>
        <ul className="flyout__unordered">
          {productTypes.map((product) =>
            <li key={product.typeId} >
              { product.count !== 0 && <label className="show" >{SearchCatText[product.typeId]}</label> }
              { product.count !== 0 && <div className="flyout__unordered-inner">
                {
                  this.props.results.products.slice(0, 15).map((result, index) =>
                    product.typeId === result.typeId && <div key={result.id}>
                      <a href="#" className="show"
                        onClick={this.handleClick}
                        onFocus={this.handleFocus}
                        onKeyDown={this.handleKeyDown}
                        id={"searchResult_" + result.id}>{result.name}
                      </a>
                    </div>
                  )}
              </div> }
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default AutoFlyout;