import React from 'react';

export default function ContactItemPlaceholder() {
  return (
    <article className="contact">
      <header className="contact-header">
        <div className="contact-profile">
          <div className="contact-media placeholder">
            <div className="avatar avatar--md  avatar--b">
              <div className="avatar-text" />
            </div>
          </div>
          <div className="contact-headline placeholder">
            <h3 className="contact-name">
              <small className="contact-email" />
            </h3>
            <div className="contact-joined" />
          </div>
        </div>
        <div className="contact-actions placeholder">
          <button
            type="button"
            className="btn btn--xs btn--link btn--hover"
          />
          <button
            type="button"
            className="btn btn--xs btn--link btn--hover"
          />
        </div>
      </header>
      <section className="contact-content">
        <div className="contact-biography placeholder">
          <p className="biography-text placeholder" />
        </div>
      </section>
      <footer className="contact-footer placeholder">
        <ul className="contact-social" />
        <button type="button" className="btn btn--xs   btn--primary">
          <span className="btn-text">message</span>
        </button>
      </footer>
    </article>
  );
}
