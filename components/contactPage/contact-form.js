import { useEffect, useRef, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

function ContactForm(){
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const commentInputRef = useRef();
    const [requestStatus, setRequestStatus] = useState(); 
    const [errorMessage, setErrorMessage] = useState();
    
    useEffect(() => {
        if(requestStatus==='success' || requestStatus==='error'){
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    let notification;

    function submitHandler(ev) {
        ev.preventDefault();
        setRequestStatus('pending');

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredComment = commentInputRef.current.value;

        // if (
        //     !enteredEmail ||
        //     enteredEmail.trim() === '' ||
        //     !enteredEmail.includes('@') ||
        //     !enteredName ||
        //     enteredName.trim() === '' ||
        //     !enteredComment ||
        //     enteredComment.trim() === ''
        // ) {
        //     setInvalid(true);
        //     return;
        // }

        fetch('/api/new-contact-api', {
            method: 'POST',
            body: JSON.stringify({
                name: enteredName,
                email: enteredEmail,
                comment: enteredComment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((response)=>{
            setRequestStatus(response.status);
            if(response.status === 'error'){
                console.log(response);
                setErrorMessage(response.message);
            } else if(response.status==='success'){
                nameInputRef.current.value='';
                emailInputRef.current.value='';
                commentInputRef.current.value='';
            }

        });
    }

    if(requestStatus==='pending'){
        notification = {
            status: requestStatus,
            title: 'Sending message',
            message: 'message is being sent'
        };
    }
    if(requestStatus==='success'){
        notification={
            status: requestStatus,
            title: requestStatus,
            message: 'this is a success message'
        }
    }
    if(requestStatus==='error'){
        notification={
            status: requestStatus,
            title: requestStatus,
            message: errorMessage
        }
    }


    return (
        <section className={classes.contact}>
            <h1>How can we help??</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' required id='name' ref={nameInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>E-mail</label>
                        <input type='email' required id='email' ref={emailInputRef} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='comment'>Please enter your comment</label>
                    <textarea id='comment' required rows='5' ref={commentInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Submit</button>
                </div>
            </form>
            {requestStatus && <Notification data={notification} />}
        </section>
    )
}

export default ContactForm;