import SearchControl from './components/SearchControl.js';
import ResultsContainer from './components/ResultsContainer.js';

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
                         setAppStateCallback={this.setAppState}/>          
        </div>
        <div id="searchResults" className="page-section page-section--no-b-padding-until-large">
          <ResultsContainer filteredProducts={this.state.filteredProducts} />
        </div>
    </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)

export default App;