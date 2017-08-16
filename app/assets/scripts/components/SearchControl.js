import React from 'react';

class SearchControl extends React.Component {

  constructor(props) {
    super(props);
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    alert('hi');
  }

  render() {
    return (
      <input className="search-area__input" type="text" role="search" placeholder="Search here!!"
      onClick={this.onLike}/>
    );
  }
}

export default SearchControl;