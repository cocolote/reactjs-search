// list of countries, defined with JavaScript object literals (JSON)
var countries = [
      {"name": "Sweden"}, {"name": "China"}, {"name": "Peru"}, {"name": "Czech Republic"},
      {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
      {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
      {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
      {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
      {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
      {"name": "Spain"}, {"name": "Poland"}, {"name": "Haiti"}
];

var CountriesList = React.createClass({

    // set initial state
    getInitialState: function() {
      return {
        countries: countries,
      }
    },

    // refresh list modifying the state of the component
    refreshList: function(in_countries) {
      this.setState({ countries: in_countries });
    },

    render: function() {
      return(
        <div>
            <DynamicSearch refreshList={ this.refreshList } />
            <ul className="countries-list">
                { this.state.countries.map(function(country) {
                    return <li className="country">{ country.name }</li> 
                  })
                }
            </ul>
        </div>
      );
    } });

var DynamicSearch = React.createClass({

    // set initial state
    getInitialState: function() {
      return {
        searchString: '',
      }
    },
  
    // sets state, triggers render method
    handleChange: function(event) {
      // grab value from input box
      var fCountries = {};
      var searchString = event.target.value.trim().toLowerCase();
      this.setState({ searchString: searchString });
      // filter the countries list
      if(searchString.length > 0) {
        fCountries = countries.filter(function(country) {
          return country.name.toLowerCase().match(searchString);
        });
      } else {
        fCountries = countries;
      }
      // pass the filtered countries to the list component
      this.props.refreshList(fCountries);
    },

    render: function() {
      return (
        <div>
            <input className="dynamic-search"
                   type="text"
                   value={ this.state.searchString }
                   onChange={ this.handleChange }
                   placeholder="Search!" />
        </div>
      )
    },
});

// render the application
ReactDOM.render(
  <CountriesList />,
  document.getElementById('main')
);
