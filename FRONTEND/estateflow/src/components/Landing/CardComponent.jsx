import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardComponent.module.css';

const CardComponent = ({ imgSrc, title, description, buttonText, linkTo }) => {
  return (
    <article className={styles.card}>
      <img
        className={styles.card__background}
        src={imgSrc}
        alt={title}
        width="1920"
        height="2193"
      />
      <div className={`${styles.card__content} ${styles.flow}`}>
        <div className={`${styles.card__content__container} ${styles.flow}`}>
          <h2 className={styles.card__title}>{title}</h2>
          <p className={styles.card__description}>
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CardComponent;
