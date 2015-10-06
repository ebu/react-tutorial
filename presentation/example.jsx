/* EXAMPLE 1 */
var HelloMessage_1 = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage_1 name="John" />, document.getElementById("example1"));

/* EXAMPLE 2 */
// External influence 
var HelloMessage_2 = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage_2 name="John" />, document.getElementById('example2'));

window.setTimeout(function() {
  React.render(<HelloMessage_2 name="Bob" />, document.getElementById('example2'));
},1000);

/* EXAMPLE 3 */
// Internal changes

var HelloMessage_3 = React.createClass({
    getInitialState: function() {
      return {
        lastName: ""
      }
    },
    handleChange: function (event) {
      this.setState({lastName: event.target.value});
    },
    render: function () {
      var name = this.props.firstName+' '+this.state.lastName;
      return <div> 
        Hello {name}
        <br/>
        What is you last name? <input type="text" onChange={this.handleChange}/> 
      </div>;
  }
});

React.render(<HelloMessage_3 firstName="Bob" />, document.getElementById('example3'));

/* EXAMPLE 4 */ 
// React-Bootstrap

var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;
const panelGroupInstance = (
  <PanelGroup defaultActiveKey="2" accordion>
    <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
    <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
  </PanelGroup>
);

React.render(panelGroupInstance, document.getElementById("example4"));

/* EXAMPLE 5 */
// d3 - selections 
d3.selectAll('#example5 p').style('color','blue');

/* EXAMPLE 6 */ 
// d3 - advanced selections 
d3.selectAll("#example6 p").style("color", function(d, i) {
  return i % 2 ? "blue" : "green";
});

/* EXAMPLE 7 */ 
// d3 - enter/exit/update
var p = d3.select("#example7").selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .text(String);

// Enter…
p.enter().append("p")
  .text(String);

// Exit…
p.exit().remove();
