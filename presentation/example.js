/* EXAMPLE 1 */
"use strict";

var HelloMessage_1 = React.createClass({
  displayName: "HelloMessage_1",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});

React.render(React.createElement(HelloMessage_1, { name: "John" }), document.getElementById("example1"));

/* EXAMPLE 2 */
// External influence
var HelloMessage_2 = React.createClass({
  displayName: "HelloMessage_2",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});

React.render(React.createElement(HelloMessage_2, { name: "John" }), document.getElementById('example2'));

window.setTimeout(function () {
  React.render(React.createElement(HelloMessage_2, { name: "Bob" }), document.getElementById('example2'));
}, 1000);

/* EXAMPLE 3 */
// Internal changes

var HelloMessage_3 = React.createClass({
  displayName: "HelloMessage_3",

  getInitialState: function getInitialState() {
    return {
      lastName: ""
    };
  },
  handleChange: function handleChange(event) {
    this.setState({ lastName: event.target.value });
  },
  render: function render() {
    var name = this.props.firstName + ' ' + this.state.lastName;
    return React.createElement(
      "div",
      null,
      "Hello ",
      name,
      React.createElement("br", null),
      "What is you last name? ",
      React.createElement("input", { type: "text", onChange: this.handleChange })
    );
  }
});

React.render(React.createElement(HelloMessage_3, { firstName: "Bob" }), document.getElementById('example3'));

/* EXAMPLE 4 */
// React-Bootstrap

var PanelGroup = ReactBootstrap.PanelGroup;
var Panel = ReactBootstrap.Panel;
var panelGroupInstance = React.createElement(
  PanelGroup,
  { defaultActiveKey: "2", accordion: true },
  React.createElement(
    Panel,
    { header: "Panel 1", eventKey: "1" },
    "Panel 1 content"
  ),
  React.createElement(
    Panel,
    { header: "Panel 2", eventKey: "2" },
    "Panel 2 content"
  )
);

React.render(panelGroupInstance, document.getElementById("example4"));

/* EXAMPLE 5 */
// d3 - selections
d3.selectAll('#example5 p').style('color', 'blue');

/* EXAMPLE 6 */
// d3 - advanced selections
d3.selectAll("#example6 p").style("color", function (d, i) {
  return i % 2 ? "blue" : "green";
});

/* EXAMPLE 7 */
// d3 - enter/exit/update
var p = d3.select("#example7").selectAll("p").data([4, 8, 15, 16, 23, 42]).text(String);

// Enter…
p.enter().append("p").text(String);

// Exit…
p.exit().remove();

