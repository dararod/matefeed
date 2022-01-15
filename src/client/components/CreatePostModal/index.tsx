import React from 'react';

import { useCreatePost } from '../../hooks/useCreatePost';

import styles from './CreatePostModal.module.css';

export default function CreatePostModal(): JSX.Element {
  const createPost = useCreatePost();

  return (
    <div className={styles.create_post_modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h3 className={styles.create_post_title}>Create new post</h3>
          <button
            className={styles.close_button}
            onClick={createPost.closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
        </div>
        <div className={styles.community_mention}>
          <input
            className={styles.input_community}
            type="text"
            placeholder="Mention your zone!"
          />
        </div>
        <div className={styles.modal_body}>
          <textarea
            className={styles.text_area}
            placeholder="Write something here"
            cols={50}
            maxLength={150}
            rows={10}
          ></textarea>
          <p className={styles.p_class}>Select your photos and videos!</p>
          <button className={styles.select_image_button}>
            Search from your gallery
          </button>
        </div>
        <div className={styles.modal_footer}></div>
      </div>
    </div>
  );
}
