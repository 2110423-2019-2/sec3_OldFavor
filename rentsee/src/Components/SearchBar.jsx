import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
        this.fetchCars = this.fetchCars.bind(this);

        this.state = {
            searchResults: []
        };
    }
    componentDidMount() {
        this.fetchCars();
        setInterval(this.fetchCars, 30000);
    }
    fetchCars() {
        fetch('http://rentsee.krist7599555.ml/api/cars', {
            method: 'GET',
            'Content-Type': 'application/json'
        })
            .then(response => {
                return response.json();
            })
            .then(result => {
                const searchResults = result;
                this.setState({ searchResults: searchResults });
                console.log('fetched new data');
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleFilter() {
        // console.log(this.state.searchResults.map(item => <a href='#'>{item}</a>));
    }
    render() {
        const data = this.state.searchResults;
        return (
            <div>
                <input className='search-dropdown' type='text' name='search' placeholder='Search..' />
                <div className='search-result'>
                    {data.map(function(item, idx) {
                        return (
                            <li key={idx}>
                                {item.ownerId}:{item._id}
                            </li>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default SearchBar;
