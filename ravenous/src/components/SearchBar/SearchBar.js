import React from 'react'
import './SearchBar.css'

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
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
    event.preventDefault()
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

  render () {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses"  onChange={this.handleTermChange}/>
          <input placeholder="Where?" onChange={this.handleLocationChange}/>
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    )

  }

}

export default SearchBar