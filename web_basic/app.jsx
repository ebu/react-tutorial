"use strict"

// This is the main script of the web application. 
//
// This script is written using react JSX (a JavaScript syntax extension), 
// it is necessary to load it with type 'text/babel' and to import babel 
// before in order for it to work. See index.html for more information.  

var PageHeader = ReactBootstrap.PageHeader; 
var Panel = ReactBootstrap.Panel;
var Table = ReactBootstrap.Table;
// React components. If using packagers such as browserify, this is where the 
// require calls would be made. 

var dataAddress = 'http://react-tutorial.ebu.io';
// use 'http:///react-tutorial.ebu.io' if you don't want to create a server. 

var SummaryRow = React.createClass({
  // One row of the summary table. 
  render: function() {
    return <tr>
      <th>{this.props.country}</th>
      { 
        this.props.years.map(function(year) {
          var data = this.props.data[year]; 
          var total = null;
          if(typeof data!=='undefined'&&data!=="") {
            total = parseInt(data);
          } 
          return <td key={year}>{total}</td>
        },this)
      }
    </tr>
  }
});

var SummaryTable = React.createClass({
  // The whole summary table.
  render: function() {
    var rows = []
    for(var country in this.props.data) {
      rows.push(<SummaryRow 
        key={country} 
        country={country}
        data={this.props.data[country]}
        years={this.props.years}
      />);
    }
    rows.sort(function(a,b) {
      return a.key>b.key?1:-1;
    })
    return <Table striped bordered condensed hover>
      <thead><tr>
        <th>Country</th>
        {this.props.years.map(function(y) {return <th key={y}>{y}</th>})}
      </tr></thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  }
});

var Summary = React.createClass({
  // This component shows a table. 
  getDefaultProps: function() {
    // If no data is passed in props, we mock empty data in order to make sure that
    // the component is still functional. It's useful when rendering the initial 
    // page for example.
    return {
      data: {},
    }
  }, 
  allYears: function() {
    // Select all years from the data received from the server. 
    var years = [];
    for(var country in this.props.data) {
      for(var year in this.props.data[country]) {
        if(years.indexOf(year)<0) {
            years.push(year);
        }
      }
    }
    return years.sort();
  },
  render: function() {
    var allYears = this.allYears();
    return <div>
      <SummaryTable 
        data={this.props.data}
        years={allYears}
      />
    </div>
  },
});

var Page = React.createClass({
  // The main component that contains the whole page. 
  render: function() {
    return <div className="container">
      <PageHeader>
         Immigration data exploration 
      </PageHeader>
      <Summary data={this.props.summaryData}/>
    </div>
  }
});

React.render(<Page/>,document.getElementById('container'));
// Render the page as soon as the page loads, to show all information already present

$.get(dataAddress+"/data/summary",function(data) {
  React.render(<Page summaryData={data}/>,document.getElementById('container'));
  // Render the page filled with data. 
});
