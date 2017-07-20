import React from "react"
import PageWrapper from "./components/page-wrapper"
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Form
} from "react-bootstrap"
import { style } from "glamor"
import DatePicker from "react-datepicker"
import moment from "moment"
import uuid from "node-uuid"
import { append, reject, assocPath, compose, assoc, map } from "ramda"
import TimePicker from "rc-time-picker"
import "rc-time-picker/assets/index.css"
import { Redirect } from "react-router"
import { timeZones } from './timeZones'

require("react-datepicker/dist/react-datepicker.css")

const container = style({
  display: "block",
  margin: "0 auto"
})

const AddEvent = React.createClass({
  getInitialState() {
    return {
      type: "event",
      eventtype: "show",
      schedule: [],
      date: moment(),
      contact: [],
      band: this.props.band,
      status: "confirmed",
      scheduleTimeZone: "US/Eastern",
      newcontact: {
        id: uuid.v4(),
        type: "",
        email: "",
        phone: "",
        name: ""
      },
      newevent: {
        id: uuid.v4(),
        event: "",
        starttime: moment("12", "hh"),
        endtime: "",
        duration: ""
      },
      _attachments: {}
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      this.props.getEvent(this.props.params.id).then(res =>
        this.setState({
          ...res.data,
          date: moment(res.data.date.split("T")[0])
        })
      )
    }
  },

  handleSubmit(e) {
    e.preventDefault()
    // if editing PUT
    if (this.props.params.id) {
      this.props
        .updateEvent(this.state)
        .then(res =>
          this.setState({
            success: true
          })
        )
        .catch(err => console.log(err.message))
    } else {
      this.props
        .addEvent(this.state)
        .then(res => {
          this.setState({ success: true })
        })
        .catch(err => console.log(err.message))
    }
  },
  handleChange(path) {
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      this.setState(currentState)
    }
  },
  handleDateChange(date) {
    this.setState({
      date: date
    })
  },
  handleAddContactChange(path) {
    return e => {
      let newcontact = this.state.newcontact
      newcontact[path] = e.target.value
      this.setState({ newcontact })
    }
  },
  addContact(e) {
    e.preventDefault()
    let currentContacts = this.state.contact
    let updated = append(this.state.newcontact, currentContacts)
    this.setState({
      contact: updated,
      newcontact: {
        id: uuid.v4(),
        type: "",
        email: "",
        phone: "",
        name: ""
      }
    })
  },
  removeContact(id) {
    return e => {
      let currentContacts = this.state.contact
      let contact = reject(item => item.id === id, currentContacts)
      this.setState({ contact })
    }
  },
  handleAddEvent(path) {
    return e => {
      let newevent = this.state.newevent
      newevent[path] = e.target.value
      this.setState({ newevent })
    }
  },
  addEvent(e) {
    e.preventDefault()
    const { newevent } = this.state

    const unixStart = newevent.starttime
      ? moment(newevent.starttime).unix()
      : null
    const unixEnd = newevent.endtime ? moment(newevent.endtime).unix() : null

    const updatedTime = compose(
      assoc("starttime", unixStart),
      assoc("endtime", unixEnd)
    )(newevent)

    const updatedSchedule = append(updatedTime, this.state.schedule)

    this.setState({
      schedule: updatedSchedule,
      newevent: {
        id: uuid.v4(),
        event: "",
        starttime: moment("12", "hh"),
        endtime: null,
        duration: ""
      }
    })
  },
  removeEvent(id) {
    return e => {
      let currentEvents = this.state.schedule
      let schedule = reject(item => item.id === id, currentEvents)
      this.setState({ schedule })
    }
  },
  handleTimeChange(path) {
    return value => {
      let newevent = this.state.newevent
      newevent[path] = value
      this.setState({ newevent })
    }
  },
  onDrop([file]) {
    const newFiles = assocPath(
      ["_attachments", file.name],
      {
        type: file.type,
        data: file
      },
      this.state
    )

    this.setState(newFiles)
  },
  render() {
    const contacts = (item, i) => {
      return (
        <FormControl.Static className="form-item-container">
          <span className="form-item-title">{`(${item.type}) ${item.name}`}</span>
          <Button
            className="pull-right remove-btn"
            onClick={this.removeContact(item.id)}
          >
            remove
          </Button>
        </FormControl.Static>
      )
    }

    const renderEvents = item => {
      return (
        <FormControl.Static key={item.event} className="form-item-container">
          <span>
            {`${moment.unix(item.starttime).format("h:mm a")}`} -{" "}
          </span>
          <span className="form-item-title">{`${item.event}`}</span>
          <Button
            className="pull-right remove-btn"
            onClick={this.removeEvent(item.id)}
          >
            remove
          </Button>
        </FormControl.Static>
      )
    }

    const renderTimeZoneOptions = ({ label, offset }) => {
      return <option value={label}>{label}  {offset}</option>
    }

    return (
      <div>
        {this.state.success ? <Redirect to="/manage/events" /> : null}
        <PageWrapper logout={this.props.logOut} title="Add Event">
          <Row {...container} className="show-grid">
            <Col xs={12} md={12} {...style({ width: "100%" })}>
              <form
                className="half-width main-form clearfix"
                onSubmit={this.handleSubmit}
              >
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Event Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    placeholder="Enter text"
                    onChange={this.handleChange("name")}
                  />
                  <ControlLabel {...style({ display: "block" })}>
                    Date
                  </ControlLabel>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                  />
                  <ControlLabel>Type</ControlLabel>
                  <FormControl
                    value={this.state.eventtype}
                    onChange={this.handleChange("eventtype")}
                    componentClass="select"
                    placeholder="type"
                  >
                    <option value="show">Show</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </FormControl>
                  <ControlLabel>Type</ControlLabel>
                  <FormControl
                    value={this.state.status}
                    onChange={this.handleChange("status")}
                    componentClass="select"
                    placeholder="status"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="notconfirmed">Not Confirmed</option>
                  </FormControl>
                </FormGroup>
                <FormGroup className="clearfix main-form">
                  <ControlLabel>Venue Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.venue}
                    placeholder="Enter text"
                    onChange={this.handleChange("venue")}
                  />
                  <div className="form-container">
                    <ControlLabel>Add Contact</ControlLabel>
                    <Form>
                      <FormControl
                        type="text"
                        value={this.state.newcontact.type}
                        placeholder="type ex. Production"
                        onChange={this.handleAddContactChange("type")}
                      />
                      <FormControl
                        type="text"
                        value={this.state.newcontact.name}
                        placeholder="Name"
                        onChange={this.handleAddContactChange("name")}
                      />
                      <FormControl
                        type="text"
                        value={this.state.newcontact.email}
                        placeholder="Email"
                        onChange={this.handleAddContactChange("email")}
                      />
                      <FormControl
                        type="text"
                        value={this.state.newcontact.phone}
                        placeholder="Phone"
                        onChange={this.handleAddContactChange("phone")}
                      />
                    </Form>
                    <div className="add-btn-container clearfix">
                      <Button
                        {...style({ display: "block" })}
                        className="pull-right form-btn"
                        onClick={this.addContact}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="form-items-container">
                      {this.state.contact.map(contacts)}
                    </div>
                  </div>
                  <div className="form-container">
                    <Form>
                      <ControlLabel>Schedule</ControlLabel>
                      <FormControl
                        value={this.state.scheduleTimeZone}
                        onChange={this.handleChange("scheduleTimeZone")}
                        componentClass="select"
                        placeholder="Time Zone *required"
                      >
                        
                        {map(renderTimeZoneOptions, timeZones)}
                      </FormControl>
                      <FormControl
                        type="text"
                        value={this.state.newevent.event}
                        placeholder="Sound Check"
                        onChange={this.handleAddEvent("event")}
                      />

                      <TimePicker
                        value={moment(this.state.newevent.starttime)}
                        format={"h:mm A"}
                        onChange={this.handleTimeChange("starttime")}
                        showSecond={false}
                      />
                      <span className="to-input">to</span>
                      <TimePicker
                        placeholder="optional"
                        format={"h:mm A"}
                        onChange={this.handleTimeChange("endtime")}
                        showSecond={false}
                      />
                      <FormControl
                        type="text"
                        value={this.state.newevent.duration}
                        placeholder="duration"
                        onChange={this.handleAddEvent("duration")}
                      />
                    </Form>
                    <div className="add-btn-container clearfix ">
                      <Button
                        {...style({ display: "block" })}
                        className="pull-right form-btn"
                        onClick={this.addEvent}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="form-items-container">
                      {map(renderEvents, this.state.schedule)}
                    </div>
                  </div>
                  <ControlLabel>Address</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.addressone}
                    placeholder="Street Address 1"
                    onChange={this.handleChange("addressone")}
                  />
                  <FormControl
                    type="text"
                    value={this.state.addresstwo}
                    placeholder="Street Address 2"
                    onChange={this.handleChange("addresstwo")}
                  />
                  <FormControl
                    type="text"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange("city")}
                  />
                  <FormControl
                    type="text"
                    value={this.state.state}
                    placeholder="State"
                    onChange={this.handleChange("state")}
                  />
                  <FormControl
                    type="number"
                    value={this.state.zipcode}
                    placeholder="Zipcode"
                    onChange={this.handleChange("zipcode")}
                  />
                  <ControlLabel>Parking / Load-In</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.parking}
                    placeholder="Parking"
                    onChange={this.handleChange("parking")}
                  />
                  <ControlLabel>Capacity</ControlLabel>
                  <FormControl
                    type="number"
                    value={this.state.capacity}
                    placeholder="Capacity"
                    onChange={this.handleChange("capacity")}
                  />
                  <ControlLabel>Deal</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.deal}
                    placeholder="...deal"
                    onChange={this.handleChange("deal")}
                  />
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.notes}
                    placeholder="Notes"
                    onChange={this.handleChange("notes")}
                  />

                  {/*<Dropzone onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                  {map(key => <div>{key}</div>,keys(this.state._attachments))}*/}

                  <Button className="form-btn pull-right" type="submit">
                    Submit
                  </Button>
                </FormGroup>
              </form>
            </Col>
          </Row>
        </PageWrapper>
      </div>
    )
  }
})

export default AddEvent
