import Head from 'next/head';
import { Fragment } from "react";
import ContactForm from "../components/contactPage/contact-form";


function ContactPage () {
    return (
        <Fragment>
            <Head>
                <title>Contact Page</title>
                <meta name='description' content='Send me some message' />
            </Head>
            <h1>ContactPage</h1>
            <ContactForm />
        </Fragment>
    );
}
export default ContactPage;