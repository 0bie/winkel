import React from 'react';
import {
  Avatar,
  Button,
  Icon
} from '@0bie/pattern-lib-react';
import {parseDate} from '../utils';
import {editIcon, deleteIcon} from '../data/icon';

export default function ContactCard({user, handleEdit, handleDelete, handleMessage}) {
  const fullName = user.firstName + ' ' + user.lastName;
  return (
    <article className="contact">
      <header className="contact-header">
        <div className="contact-profile">
          <div className="contact-media">
            <Avatar
              size="md"
              user={user}
              classNames={[`avatar--${user.lastName.charAt(0).toLowerCase()}`]}
            />
          </div>
          <div className="contact-headline">
            <h3 className="contact-name">
              {user.firstName} {user.lastName}
              {user.email &&
                <small className="contact-email">
                  <a href={`mailto:${user.email}`} title={`Email ${fullName}`}>
                    <Icon id="envelope-closed" size="sm" title={`Email ${fullName}`} />
                  </a>
                </small>}
            </h3>
            <div className="contact-joined">
              {`added ${parseDate({date: user.createdAt})} ago`}
            </div>
          </div>
        </div>
        <div className="contact-actions">
          <Button
            size="xs"
            icon={editIcon}
            classNames={['btn--link', 'btn--hover']}
            title={`Edit ${fullName}`} onClick={handleEdit}
          />
          <Button
            size="xs"
            icon={deleteIcon}
            onClick={handleDelete}
            title={`Delete ${fullName}`}
            classNames={['btn--link', 'btn--hover']}
          />
        </div>
      </header>
      {user.bio &&
        <section className="contact-content">
          <div className="contact-biography">
            <p className="biography-text">{user.bio}</p>
          </div>
        </section>}
      <footer className="contact-footer">
        {(user.social && user.social.length > 0) &&
          <ul className="contact-social">
            {user.social.map((social) =>
              <a href={social.link} key={`${social.platform}`} className="btn btn--xs btn--link">
                <Icon
                  size="md"
                  id={social.platform}
                  classNames={['vert--mid']}
                  title={`follow on ${social.platform}`}
                />
              </a>)}
          </ul>}
        <Button
          size="xs"
          label="message"
          onClick={handleMessage}
          title={`Message ${fullName}`}
          classNames={['btn--primary']}
        />
      </footer>
    </article>
  );

}
