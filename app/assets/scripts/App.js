import SearchControl from './components/SearchControl.js';

// Main app component
// initializes all other components
class App extends React.Component {

  constructor(props) {
    super(props);
    this.setAppState = this.setAppState.bind(this);

    this.state = {
      catalog: {
        products: []
      },
      filteredProducts: {
        products: []
      }
    };
  }
  setAppState = (state) => {
    this.setState(state);
  }
  render() {
    return (
      <div className="wrapper">
        <div id="searchControlWrapper" className="search-area">
          <SearchControl catalog={this.state.catalog}
            filteredProducts={this.state.filteredProducts}
            setAppStateCallback={this.setAppState} />
        </div>
      </div>
    );
  }
}

// render App component in main section
ReactDOM.render(
  <App />,
  document.getElementById('main')
)

export default App;