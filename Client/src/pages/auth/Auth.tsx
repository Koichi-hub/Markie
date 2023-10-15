import { RoundendButton } from '../../components/rounded-button';
import styles from './Auth.module.scss';

export const Auth = () => {
  return (
    <div className={styles['auth']}>
      <div className={styles['header']}>
        <RoundendButton text="Авторизация" focus />
      </div>
      <div className={styles['body']}>
        <div className={styles['content']}>
          <div className={styles['content__text']}>
            Выберите способ авторизации
          </div>
          <div className={styles['content__options']}>
            <div className={styles['content__options__item']}>
              <img src="/assets/icons/google.svg" alt="" />
            </div>
            <div className={styles['content__options__item']}>
              <img src="/assets/icons/vk.svg" alt="" />
            </div>
            <div className={styles['content__options__item']}>
              <img src="/assets/icons/telegram.svg" alt="" />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
