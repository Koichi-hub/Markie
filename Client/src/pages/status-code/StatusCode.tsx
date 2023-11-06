import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/button';
import styles from './StatusCode.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '../../router';
import { IconButton } from '../../components/icon-button';

const statusCodes = ['401', '404'] as const;
type StatusCode = (typeof statusCodes)[number];
const isStatusCode = (x: unknown): x is StatusCode =>
  statusCodes.includes(x as StatusCode);

const statusCodeValue = {
  '401': 'Вы не авторизованы :(',
  '404': 'Страница не найдена :(',
} as {
  [key in StatusCode]: string;
};

type Props = {
  statusCode?: StatusCode;
};

export const StatusCode = ({ statusCode }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [code, setCode] = useState<StatusCode>('404');
  const [value, setValue] = useState(statusCodeValue['404']);

  const onNavigateToWelcome = useCallback(() => {
    navigate(routes.welcome);
  }, [navigate]);

  useEffect(() => {
    if (statusCode) {
      setCode(statusCode);
      setValue(statusCodeValue[statusCode]);
    }
  }, [statusCode]);

  useEffect(() => {
    const _statusCode = searchParams.get('status_code');
    if (_statusCode && isStatusCode(_statusCode)) {
      setCode(_statusCode);
      setValue(statusCodeValue[_statusCode]);
    }
  }, [searchParams]);

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
            <div className={styles['status-code']}>{code}</div>
            <div className={styles['status-text']}>{value}</div>
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
