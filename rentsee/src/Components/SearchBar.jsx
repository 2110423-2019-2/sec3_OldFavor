import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.fetchCars = this.fetchCars.bind(this);
        this.state = {
            searchResults: [],
            searchValue: ''
        };
    }
    componentDidMount() {
        this.fetchCars();
        setInterval(this.fetchCars, 30000);
    }
    fetchCars() {
        fetch('https://rentsee.poomrokc.services/rentsee/api/cars', {
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
        const searchValue = this.state.searchValue;
        const data = this.state.searchResults;
        if (searchValue) {
            const result = data.filter(o =>
                Object.values(o)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
            return (
                <div>
                    {result.map(o => {
                        return <li>{Object.values(o).toString()}</li>;
                    })}
                </div>
            );
        }
        return (
            <div>
                {data.map(o => {
                    return <li>{Object.values(o).toString()}</li>;
                })}
            </div>
        );
    }
    handleOnChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ searchValue: value });
    }
    render() {
        return (
            <div>
                <input
                    className='search-dropdown'
                    type='text'
                    name='search'
                    value={this.state.searchValue}
                    onChange={this.handleOnChange}
                    placeholder='Search..'
                />
                <div className='search-result'>{this.handleFilter()}</div>
            </div>
        );
    }
}

export default SearchBar;
