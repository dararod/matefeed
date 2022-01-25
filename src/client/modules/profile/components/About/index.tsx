import React from 'react';
import { Edit2, User, Gift, Map } from 'react-feather';

import styles from './About.module.css';

export default function About() :JSX.Element {
  return(
    <div className={styles.about_info}>
      <div className={styles.header_info}>
        <h2>Basic Info</h2>
        <button>
          <Edit2/>
        </button>
      </div>
      <div className={styles.basic_info}>
        <button>
          <User/> 
        </button>
        <p>
          <h2>Male</h2>
          <span>Gender</span>
        </p>
      </div>
      <div className={styles.basic_info}>
        <button>
          <Gift/> 
        </button>
        <p>
          <h2>30.01.2004</h2>
          <span>Birthday</span>
        </p>
      </div>
      <div className={styles.basic_info}>
        <button>
          <Map/> 
        </button>
        <p>
          <h2>Valencia, Venezuela</h2>
          <span>Live in</span>
        </p>
      </div>
    </div>
  );
}
