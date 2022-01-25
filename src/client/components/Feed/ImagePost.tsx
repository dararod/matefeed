import React from 'react';

import styles from './Feed.module.css';

export default function ImagePost({
  pictures,
}: {
  pictures: {
    src: string;
  }[];
}): JSX.Element {
  if (pictures.length === 1) {
    return (
      <figure className={styles.pictures}>
        <img src={pictures[0].src} alt="" />
      </figure>
    );
  }

  if (pictures.length === 2) {
    return (
      <figure className={styles.two_pictures}>
        <img src={pictures[0].src} alt="" />
        <img src={pictures[1].src} alt="" />
      </figure>
    );
  }

  if (pictures.length === 3) {
    return (
      <figure className={styles.three_pictures}>
        <div className={styles.picture_1}>
          <img src={pictures[0].src} alt="" />
        </div>
        <div className={styles.picture_1}>
          <img src={pictures[1].src} alt="" />
        </div>
        <div className={styles.picture_3}>
          <img src={pictures[2].src} alt="" />
        </div>
      </figure>
    );
  }

  if (pictures.length === 4) {
    return (
      <figure className={styles.four_pictures}>
        <div className={styles.picture4_1}>
          <img src={pictures[0].src} alt="" />
        </div>
        <div className={styles.picture4_1}>
          <img src={pictures[1].src} alt="" />
        </div>
        <div className={styles.picture4_1}>
          <img src={pictures[2].src} alt="" />
        </div>
        <div className={styles.picture4_1}>
          <img src={pictures[3].src} alt="" />
        </div>
      </figure>
    );
  }

  return null;
}
