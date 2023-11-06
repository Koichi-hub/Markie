import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Welcome.module.scss';
import { RoundendButton } from '../../components/rounded-button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../router';
import { delay } from '../../utils';
import { useAppSelector } from '../../store';

export const Welcome = () => {
  const navigate = useNavigate();

  const user = useAppSelector(state => state.app.user);
  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  const [activeAnimation, setActiveAnimation] = useState(false);

  useEffect(() => {
    onInit();
  });

  const onInit = async () => {
    await delay(200);
    setActiveAnimation(true);
  };

  const onClickAuthorization = useCallback(
    () => navigate(routes.auth),
    [navigate]
  );

  const onClickNotes = useCallback(() => navigate(routes.notes), [navigate]);

  const renderButton = useMemo(() => {
    return user ? (
      <RoundendButton text="К заметкам" onClick={onClickNotes} />
    ) : (
      <RoundendButton text="Авторизация" onClick={onClickAuthorization} />
    );
  }, [onClickAuthorization, onClickNotes, user]);

  return (
    <div className={styles['welcome']}>
      <div className={styles['header']}>{!isUserLoading && renderButton}</div>
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
