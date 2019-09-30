import React, { Component } from 'react';
import css from './ContactForm.css';
import axios from 'axios';


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject: '',
      description: '',
    };
  }

  send = () => {


      axios.post('http://localhost:4000/api/v1/other/contactUs', {
        name: JSON.stringify(this.state.name),
        email: JSON.stringify(this.state.subject),
        message: JSON.stringify(this.state.description),


      }).then(
        (response) => {
          console.log(response)
        }
      )

  }


  render() {

    return (
      <div className={css.contacUsForm}>
        <div>
          <h2>Contact Us</h2>
          <p>Swing by for a cup of coffee, or leave us a message:</p>
        </div>
        <div className="row">
          <div className="column">

          </div>
          <div className="column">

              <label htmlFor="fname">First Name</label>
              <input value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }}
                     type="text" id="fname" name="firstname" placeholder="Your name.."></input>
              <label htmlFor="lname">subject</label>
              <input value={this.state.subject}
                          onChange={(event)=>{this.setState({subject:event.target.value})}}
                          type="text" id="lname" name="subject" placeholder="subject"></input>

              <label htmlFor="subject">Details</label>
              <textarea value={this.state.description}
                        onChange={(event)=>{this.setState({description:event.target.value})}}
                        id="subject" name="description" placeholder="Write something.."
              ></textarea>
              <input onClick={() => {
                this.send();
              }} type="submit" value="Submit"></input>

          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
