import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
} from '../../components';
import css from './Contact.css';
import ContactForm from './Form/ContactForm';


const ContactUs = () => {
  return (
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ContacUs',
        description: 'Description of this page',
        name: 'Contact Us',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer/>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <ContactForm/>

        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer/>
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactUs;
