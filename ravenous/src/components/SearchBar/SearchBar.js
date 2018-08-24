import React from 'react'
import './SearchBar.css'
// import Script from 'react-load-script'
const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count',
}
 
class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    }
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.getSortByClass = this.getSortByClass.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    // this.handleScriptLoad = this.handleScriptLoad.bind(this)
  }

  getSortByClass(value) {
    if(value === this.state.sortBy){
      return 'active'
    } else{
      return ''
    }
  }

  handleSortByChange(value) {
    this.setState({
      sortBy: value,
    })
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value,
    })
  }
  
  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    })
  }

  handleSearch(event) {
    event.preventDefault()
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map(option => {
      let value = sortByOptions[option]
      return <li 
        key={value} 
        className={this.getSortByClass(value)}
        onClick={() => this.handleSortByChange(value)}
        >
          {option}
        </li>
    })
  }

  handleKeyPress(event) {
    event.preventDefault()
    if(event.key === 'Enter'){
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
    }
  }

  // handlePlaceSelect() {
  //   let placeResult = this.autocomplete.getPlace()
  //   let addresses = placeResult.formatted_address
  //   this.setState({
  //     location: addresses
  //   })
  // }

  // handleScriptLoad() {
  //   console.log('script loaded')
  //   this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
  //   this.autocomplete.addListener('place_changed', this.handlePlaceSelect)
  //   console.log(this.autocomplete)
  // }

  render () {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul> 
            {this.renderSortByOptions()}
          </ul>
        </div>  
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" text={this.state.term} onChange={this.handleTermChange} onKeyUp={this.handleKeyPress}/>
          {/* <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfGdfISRPNuVh6svdUPltzOvfCb68Ss9A&libraries=places" onLoad={this.handleScriptLoad} /> */}
          <input placeholder="Where?" onChange={this.handleLocationChange} onKeyUp={this.handleKeyPress} />
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    )

  }

}

export default SearchBar