import React, { Component } from "react";
import TracerTable from "./TracerTable";
import DetailsViewer from "./DetailsViewer";
import FilterColumn from "./FilterColumn";
import DOMContextViewer from "./DOMContextViewer";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Navbar from "react-bootstrap/lib/Navbar";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracerID: -1,
			rawEvent: "",
			requestIndex: 0,
			tracerStringLength: 0,
			eventIndex: 0,
			rawRequest: "",
			requestLocationType: 0
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleTracerSelection = this.handleTracerSelection.bind(this);
		this.handleEventSelection = this.handleEventSelection.bind(this);
	}

	/* Called whenever one of the filter buttons is toggled. */
	handleFilterChange(evt, filter) {
		this.setState((prevState, props) => {
			let ret = {};
			ret[evt] = filter;
			return ret;
		});
	}

	/* Called whenever a new tracer row is selected. */
	handleTracerSelection(
		nTracerID,
		nRawRequest,
		nRequestIndex,
		nRequestLocationType,
		nTracerStringLength
	) {
		this.setState({
			tracerID: nTracerID,
			rawRequest: nRawRequest,
			requestIndex: nRequestIndex,
			requestLocationType: nRequestLocationType,
			tracerStringLength: nTracerStringLength
		});
	}

	/* Called whenever a new event is select. */
	handleEventSelection(nRawEvent) {
		this.setState({
			rawEvent: nRawEvent
		});
	}

	render() {
		const contextKeys = [
			"responses",
			"exploitable",
			"archivedContexts",
			"text"
		];

		const tracerKeys = ["archivedTracers", "inactive"];

		const contextFilters = Object.keys(this.state)
			.filter(
				function(n) {
					return contextKeys.includes(n) && this.state[n];
				}.bind(this)
			)
			.map(
				function(n) {
					return this.state[n];
				}.bind(this)
			);

		const tracerFilters = Object.keys(this.state)
			.filter(
				function(n) {
					return tracerKeys.includes(n) && this.state[n];
				}.bind(this)
			)
			.map(
				function(n) {
					return this.state[n];
				}.bind(this)
			);

		return (
			<Row>
				<Col md={12} className="container">
					<Navbar>
						<FilterColumn
							handleChange={this.handleFilterChange}
						/>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#/">TRACY</a>
							</Navbar.Brand>
						</Navbar.Header>
					</Navbar>
					<Row>
						<Col md={6} className="left-column">
							<TracerTable
								tracerFilters={tracerFilters}
								handleTracerSelection={
									this.handleTracerSelection
								}
							/>
						</Col>
						<Col md={6} className="right-column">
							<DOMContextViewer
								tracerID={this.state.tracerID}
								handleEventSelection={this.handleEventSelection}
								contextFilters={contextFilters}
							/>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<DetailsViewer
								rawRequest={this.state.rawRequest}
								requestStart={this.state.requestIndex}
								requestLocationType={
									this.state.requestLocationType
								}
								requestStop={this.state.tracerStringLength}
								rawEvent={this.state.rawEvent}
								eventStart={this.state.eventIndex}
								eventStop={this.state.tracerPayloadLength}
								timingInterval={3000}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default App;
