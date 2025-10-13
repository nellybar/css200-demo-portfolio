import React, { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xvgwrbwa";

function ValidationMessage({ message, id }) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className="contact__error" id={id}>
      {message}
    </p>
  );
}

export default function Contact() {
  const [state, setState] = useState({
    submitting: false,
    succeeded: false,
    errors: {},
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ submitting: true, succeeded: false, errors: {} });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setState({ submitting: false, succeeded: true, errors: {} });
        return;
      }

      let errorMessage = null;
      const data = await response.json().catch(() => null);

      if (data && Array.isArray(data.errors)) {
        const fieldErrors = {};
        data.errors.forEach((error) => {
          if (error.field) {
            fieldErrors[error.field] = error.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
        });

        const combinedErrors = { ...fieldErrors };
        if (errorMessage && Object.keys(fieldErrors).length === 0) {
          combinedErrors.form = errorMessage;
        }

        setState({ submitting: false, succeeded: false, errors: combinedErrors });
        return;
      }

      setState({
        submitting: false,
        succeeded: false,
        errors: {
          form:
            errorMessage || "There was a problem sending your message. Please try again.",
        },
      });
    } catch (error) {
      setState({
        submitting: false,
        succeeded: false,
        errors: {
          form: "We couldn't submit your message because of a network error. Please try again.",
        },
      });
    }
  };

  if (state.succeeded) {
    return (
      <div className="contact__thankyou" role="status">
        <h1>Thank you!</h1>
        <p>Your message has been sent successfully. I’ll get back to you soon 😊</p>
        <button
          type="button"
          className="contact__btn"
          onClick={() => setState({ submitting: false, succeeded: false, errors: {} })}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <main id="contact-page" className="contact" aria-labelledby="contact-title">
      <h1 className="contact__title" id="contact-title">
        Get in touch
      </h1>
      <p className="contact__intro">
        Have a question or want to work together? Fill out the form below and I’ll respond as soon
        as possible.
      </p>
      <form onSubmit={handleSubmit} className="contact__form" noValidate>
        <div className="contact__row two-cols">
          <div className="contact__field">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" placeholder="First name" required />
          </div>
          <div className="contact__field">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" placeholder="Last name" required />
          </div>
        </div>

        <div className="contact__row">
          <div className="contact__field contact__field--full">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              aria-invalid={state.errors.email ? "true" : "false"}
              aria-describedby={state.errors.email ? "email-error" : undefined}
            />
            <ValidationMessage id="email-error" message={state.errors.email} />
          </div>
        </div>

        <div className="contact__row">
          <div className="contact__field contact__field--full">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="How can I help?" />
          </div>
        </div>

        <div className="contact__row">
          <div className="contact__field contact__field--full">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message…"
              required
              aria-invalid={state.errors.message ? "true" : "false"}
              aria-describedby={state.errors.message ? "message-error" : undefined}
            />
            <ValidationMessage id="message-error" message={state.errors.message} />
          </div>
        </div>

        {state.errors.form && (
          <div className="contact__form-error" role="alert">
            {state.errors.form}
          </div>
        )}

        <div className="contact__actions--outside">
          <button type="submit" className="contact__btn" disabled={state.submitting}>
            {state.submitting ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </main>
  );
}
