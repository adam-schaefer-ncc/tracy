import React, { Component } from "react";

export default class PropertiesTable extends Component {
  render() {
    if (!this.props.eventURL) return <span>CLICK SOMETHING</span>;

    return (
      <table className="properties-table">
        <tbody>
          <tr>
            <th>event URL</th>
            <td>{this.props.eventURL}</td>
          </tr>
          <tr>
            <th>event type</th>
            <td>{this.props.eventType}</td>
          </tr>
          <tr>
            <th>extras</th>
            <td>{this.props.extras}</td>
          </tr>
          <tr>
            <th>event context</th>
            <td>{this.props.eventContext}</td>
          </tr>
          <tr>
            <th>HTML location type</th>
            <td>{this.props.locationType}</td>
          </tr>
          <tr>
            <th>parent node</th>
            <td>{this.props.nodeType}</td>
          </tr>
          <tr>
            <th>severity</th>
            <td>{this.props.sev}</td>
          </tr>
          <tr>
            <th>reason</th>
            <td>{this.props.reason}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
