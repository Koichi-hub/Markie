import { useCallback, useEffect } from 'react';
import { RoundendButton } from '../../components/rounded-button';
import styles from './Auth.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { authApi } from '../../api';
import { routes } from '../../router';
import { useAppDispatch, useAppSelector } from '../../store';
import { authViaGoogle, authViaVK } from '../../store/appSlice';
import { PageLoader } from '../../components/page-loader';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const { variant } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUserLoading = useAppSelector(state => state.app.isUserLoading);

  const onAuthViaGoogle = useCallback(
    async (code: string) => {
      try {
        await dispatch(authViaGoogle(code)).unwrap();
        navigate(routes.notes);
      } catch (e) {
        navigate(`${routes.statusCode}?status_code=401`);
      }
    },
    [dispatch, navigate]
  );

  const onAuthViaVK = useCallback(
    async (code: string) => {
      try {
        await dispatch(authViaVK(code)).unwrap();
        navigate(routes.notes);
      } catch (e) {
        navigate(`${routes.statusCode}?status_code=401`);
      }
    },
    [dispatch, navigate]
  );

  const onSelectGoogleAuth = useCallback(async () => {
    const uri = await authApi.getGoogleAuthUri();
    window.location.href = uri;
  }, []);

  const onSelectVKAuth = useCallback(async () => {
    const uri = await authApi.getVKAuthUri();
    window.location.href = uri;
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && variant) {
      switch (variant) {
        case 'google':
          onAuthViaGoogle(code);
          break;
        case 'vk':
          onAuthViaVK(code);
          break;
        default:
          navigate(`${routes.statusCode}?status_code=401`);
          break;
      }
    }
  }, [navigate, onAuthViaGoogle, onAuthViaVK, searchParams, variant]);

  return isUserLoading ? (
    <PageLoader text="Идет загрузка данных, подождите..." />
  ) : (
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
            <div
              className={styles['content__options__item']}
              onClick={onSelectGoogleAuth}>
              <img src="/assets/icons/google.svg" alt="" />
            </div>
            <div
              className={styles['content__options__item']}
              onClick={onSelectVKAuth}>
              <img src="/assets/icons/vk.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
