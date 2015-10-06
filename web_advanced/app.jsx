"use strict"

// This is the main script of the web application. 
//
// This script is written using react JSX (a JavaScript syntax extension), 
// it is necessary to load it with type 'text/babel' and to import babel 
// before in order for it to work. See index.html for more information.  

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var PageHeader = ReactBootstrap.PageHeader; 
var Panel = ReactBootstrap.Panel;
var Table = ReactBootstrap.Table;
var Input = ReactBootstrap.Input;
// React components. If using packagers such as browserify, this is where the 
// require calls would be made. 

var dataAddress = 'http://react-tutorial.ebu.io';
// use 'http:///react-tutorial.ebu.io' if you don't want to create a server. 

var SummaryCountryModal = React.createClass({
  // The modal that shows more information about a particular country
  getDefaultState: function() {
    // When the component is initialized, no additional data has been fetched 
    // in the server yet. 
    return {genderData: {}}
  },
  componentWillReceiveProps: function(newProps) {
    // Fetch more information about the country on the server to show in the modal. 
    var self = this;
    if(newProps.selectedNode!==null) {
      $.get(dataAddress+'/data/country/'+newProps.selectedNode,function(data) {
        self.setState({genderData: data});
      });
    } else {
      this.setState({genderData: {}});
    }
  },
  render: function() {
    if(!this.props.showModal) {
      return null;
    }
    var tableRows = [];
    for(var year in this.props.nodeData) {
      var total = this.props.nodeData[year];
      var yearData = this.state.genderData[year]; 
      var males = typeof yearData!=='undefined'?yearData.Males:null;
      var females = typeof yearData!=='undefined'?yearData.Females:null;
      tableRows.push(<tr key={year}>
        <th>{year}</th>
        <td>{total}</td>
        <td>{males}</td>
        <td>{females}</td>
      </tr>);
    }
    tableRows.sort(function(a,b) {
      return a.key<b.key?1:-1;
    })
    // Create all rows for the table they will be added to the returned table. 

    return <Modal show={this.props.showModal} onHide={this.props.closeModal} bsSize='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{this.props.selectedNode}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead><tr><th>Year</th><th>Total</th><th>Males</th><th>Females</th></tr></thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  }
})

var SummaryFilter = React.createClass({
  // Filters for the minimum year and the country name. 
  // The filters actions are reported to the parent component via this.props.handle* functions. 
  render: function() {
    var years = this.props.years;
    return <form>
      <Input  
        label={"Minimum year: "+this.props.minYear}
        addonBefore={years[0]}
        addonAfter="2000"
        onChange={this.props.handleChangeMinYear}
        type="range" 
        defaultValue={this.props.minYear}
        min={years[0]} 
        max={"2000"}
      />
      <Input
        type="text"
        defaultValue={this.props.countryFilter}
        onChange={this.props.handleChangeCountryFilter}
        placeholder="Country..."
        label="Country"/>
    </form>
  }
})

var SummaryRow = React.createClass({
  // One row of the summary table. 
  render: function() {
    return <tr onClick={this.props.showModal}>
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
  render: function() {
    var rows = []
    for(var country in this.props.data) {
      if(country.toLowerCase().indexOf(this.props.countryFilter.toLowerCase())>=0) {
        rows.push(<SummaryRow 
          key={country} 
          country={country}
          data={this.props.data[country]}
          years={this.props.years}
          showModal={this.props.showModal.bind(null,country)}
        />);
      }
      rows.sort(function(a,b) {
        return a.key>b.key?1:-1;
      })
    }
  

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
  // This component shows a table with date filters and country filters. 
  // It also contains a modal which is shown when a row is clicked. 
  getInitialState: function() {
    return {
      selectedNode: null,
      minYear: 2000, 
      countryFilter:"",
    }
  },
  getDefaultProps: function() {
    // If no data is passed in props, we mock empty data in order to make sure that
    // the component is still functional. It's useful when rendering the initial 
    // page for example.
    return {
      data: {},
    }
  }, 
  showModal: function(node) {
    // Select a node to display. This will trigger showing up the modal since
    // we change the state. 
    this.setState({
      selectedNode: node, 
    })
  },
  closeModal: function(node) {
    // Selecting no node will trigger the modal to be hidden. 
    this.setState({
      selectedNode: null,
    })
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
  yearsToShow: function(allYears) {
    // Filter the years depending on this.state.minYear. 
    var minYear = parseInt(this.state.minYear);
    return allYears.filter(function(d) {
      return parseInt(d) >= minYear;
    })
  },
  handleChangeMinYear: function(event) {
    // This function is called by the filtering component. 
    // It changes the minYear depending on the input value
    this.setState({minYear: event.target.value});
  },
  handleChangeCountryFilter: function(event) {
    // This function is called by the filtering component. 
    // It changes the countryFilter depending on the input value
    this.setState({countryFilter: event.target.value});
  },
  render: function() {
    var allYears = this.allYears();
    var yearsToShow = this.yearsToShow(allYears);
    return <div>
      <SummaryFilter 
        minYear={this.state.minYear} 
        handleChangeMinYear={this.handleChangeMinYear}
        handleChangeCountryFilter={this.handleChangeCountryFilter}
        years={allYears}
      />
      <SummaryTable 
        data={this.props.data}
        showModal={this.showModal}
        countryFilter={this.state.countryFilter}
        years={yearsToShow}
      />
      <SummaryCountryModal 
        showModal={this.state.selectedNode!==null}
        closeModal={this.closeModal}
        selectedNode={this.state.selectedNode}
        nodeData={this.props.data[this.state.selectedNode]}
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
