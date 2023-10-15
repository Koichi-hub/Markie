import { useEffect, useState } from 'react';
import styles from './Welcome.module.scss';
import { RoundendButton } from '../../components/rounded-button';

export const Welcome = () => {
  const [activeAnimation, setActiveAnimation] = useState(false);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    onInit();
  });

  const onInit = async () => {
    await delay(200);
    setActiveAnimation(true);
  };

  return (
    <div className={styles['welcome']}>
      <div className={styles['header']}>
        <RoundendButton text="Авторизация" />
      </div>
      <div className={styles['body']}>
        <div className={styles['content']}>
          <div></div>
          <div
            className={[
              styles['content__note'],
              activeAnimation ? styles['content__note_active'] : '',
            ].join(' ')}>
            <h1>Hello world!</h1>
            <p>Первая программа на Python</p>
          </div>
          <div className={styles['content__description']}>
            <div
              className={[
                styles['content__description__caption'],
                activeAnimation
                  ? styles['content__description__caption_active']
                  : '',
              ].join(' ')}>
              Markie
            </div>
            <div
              className={[
                styles['content__description__text'],
                activeAnimation
                  ? styles['content__description__text_active']
                  : '',
              ].join(' ')}>
              Удобный Markdown редактор
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
