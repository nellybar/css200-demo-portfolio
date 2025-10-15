import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("xvgwrbwa"); // replace with your ID

  if (state.succeeded) {
    return (
      <div className="contact__thankyou">
        <h1>Thank you!</h1>

        <p>
          Your message has been sent successfully. I’ll get back to you soon 😊
        </p>
      </div>
    );
  }

  return (
    <main id="contact-page" className="contact">
      <h1 className="contact__title">Get in touch</h1>
      <form onSubmit={handleSubmit} className="contact__form">
        <div className="contact__row two-cols">
          <div className="contact__field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              required
            />
          </div>
          <div className="contact__field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              required
            />
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
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
        </div>

        <div className="contact__row">
          <div className="contact__field contact__field--full">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can I help?"
            />
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
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
        </div>
        <div className="contact__actions--outside">
          <button
            type="submit"
            className="contact__btn"
            disabled={state.submitting}
          >
            {state.submitting ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </main>
  );
}
