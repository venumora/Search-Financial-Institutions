var $ = require('jquery');

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
    $(document).click(function () {
      that.hideFlyout();
    });
  }
  showFlyout = () => {
     this.setState({isOpen: true});
  }
  hideFlyout = () => {
     this.setState({isOpen: false});  
  }
  handleClick = (event) => {
    this.props.setSearchKeyState(event);
    this.hideFlyout();    
    event.preventDefault();
  }
  handleFocus = (event) => {
    $(".focused").removeClass('focused');
    $(event.target).parent('li').addClass('focused');
  }
  handleKeyDown = (event) => {
    let target = $(event.target);
    if (38 === event.which) {
      let prevLi = target.parent('li').prev('li');
      if (prevLi.length) {
        prevLi.find('a').focus();
      } else {
        target.parent('li').parent('ul').find('li:last a').focus();
      }
      event.preventDefault();
    } else if (40 === event.which) {
      let nextLi = target.parent('li').next('li');
      if (nextLi.length) {
        nextLi.find('a').focus();
      } else {
        target.parent('li').parent('ul').find('li:first a').focus();
      }
      event.preventDefault();
    } else if (13 === event.which) {
      this.handleClick(event);
      event.preventDefault();
    } else if (27 === event.which) {
      this.hideFlyout();
    }
  }
  render() {
    return (
      <div className={(this.props.isOpen && this.state.isOpen) ? 'flyout show' : 'flyout hide'}>
        <ul className="flyout__unordered">
          {
            this.props.results.products.slice(0, 10).map(result =>
              <li key={result.id}>
                <a href="#" onClick={this.handleClick} onFocus={this.handleFocus} onKeyDown={this.handleKeyDown} id={"searchResult" + result.id}>{result.name}
                </a>
              </li>
            )}
        </ul>
      </div>
    );
  }
}

export default AutoFlyout;