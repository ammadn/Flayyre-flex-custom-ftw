import React from 'react';
import css from './ContactForm.css';

const ContactForm = props => {

  return(
    <div className={css.contacUsForm}>
      <div>
        <h2>Contact Us</h2>
        <p>Swing by for a cup of coffee, or leave us a message:</p>
      </div>
      <div className="row">
        <div className="column">

        </div>
        <div className="column">
          <form >
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.."></input>

            <label htmlFor="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write something.."
            ></textarea>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactForm;
