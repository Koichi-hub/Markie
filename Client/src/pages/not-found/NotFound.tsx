import { useCallback } from 'react';
import { Button } from '../../components/button';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../router';
import { IconButton } from '../../components/icon-button';

export const NotFound = () => {
  const navigate = useNavigate();

  const onNavigateToWelcome = useCallback(() => {
    navigate(routes.welcome);
  }, [navigate]);

  return (
    <div className={styles['not-found']}>
      <div className={styles['header']}>
        <IconButton
          src="/assets/icons/logo.svg"
          onClick={onNavigateToWelcome}
        />
      </div>
      <div className={styles['body']}>
        <div className={styles['content']}>
          <div className={styles['status']}>
            <div className={styles['status-code']}>404</div>
            <div className={styles['status-text']}>Страница не найдена :(</div>
          </div>
          <div className={styles['button-container']}>
            <Button
              color="grey-0"
              text="На главную"
              onClick={onNavigateToWelcome}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
