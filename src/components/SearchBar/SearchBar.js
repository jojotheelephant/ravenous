import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: "",
            location: "",
            sortBy: "best_match",
        };
        //the 'sort by' options
        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rated": "rating",
            "Most Reviewed": "review_count",
        };
        //bind this
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    //this method provides feedback to which 'sort by' has been selected by returning CSS class for a sorting option
    getSortByClass = (sortByOption) => {
        return this.state.sortBy === sortByOption ? "active" : "";
    };

    //this method sets the state of a sorting option when clicked. This method is tied to onClick of list item in renderSortByOptions
    //added function to searchYelp if both input fields have been filled
    handleSortByChange = (sortByOption) => {
        this.setState({ sortBy: sortByOption });
        if (this.state.term !== "" && this.state.location !== "") {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    };

    //accepts user input for "Search Business" and changes state for this.state.term
    handleTermChange = (e) => {
        this.setState({ term: e.target.value });
    };

    //accepts user input for "where" and changes state for this.state.location
    handleLocationChange = (e) => {
        this.setState({ location: e.target.value });
    };

    //runs the searchYelp method in App.js when button is clicked
    handleSearch = (e) => {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        e.preventDefault();
    };

    //runs handleSearch when Enter is pressed on location input
    keyPressed = (e) => {
        if (e.key === "Enter") {
            this.handleSearch(e);
        }
    };

    //this method renders the <li> list of 'sort by' options above the inputs
    renderSortByOptions = () => {
        return Object.keys(this.sortByOptions).map((sortByOption) => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li
                    //onClick value needs to be binded to 'this' with bind() method.
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                    className={this.getSortByClass(sortByOptionValue)}
                    key={sortByOptionValue}
                >
                    {sortByOption}
                </li>
            );
        });
    };

    componentWillUnmount = () => {
        this.setState({ term: "", location: "" });
    };

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>{this.renderSortByOptions()}</ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" value={this.state.term} />
                    <input
                        onChange={this.handleLocationChange}
                        onKeyPress={this.keyPressed}
                        placeholder="Where?"
                        value={this.state.location}
                    />
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Let's Go</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;
