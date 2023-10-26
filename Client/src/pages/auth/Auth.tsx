import { useCallback, useEffect } from 'react';
import { RoundendButton } from '../../components/rounded-button';
import styles from './Auth.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  getGoogleAuthUri,
  getGoogleAuthorizedUser,
  getVKAuthUri,
  getVKAuthorizedUser,
} from '../../api';
import { routes } from '../../router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/appSlice';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const { variant } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authViaGoogle = useCallback(
    async (code: string) => {
      const response = await getGoogleAuthorizedUser(code);
      dispatch(setUser(response.user));
      navigate(routes.notes);
    },
    [dispatch, navigate]
  );

  const authViaVK = useCallback(
    async (code: string) => {
      const response = await getVKAuthorizedUser(code);
      dispatch(setUser(response.user));
      navigate(routes.notes);
    },
    [dispatch, navigate]
  );

  const onSelectGoogleAuth = useCallback(async () => {
    const uri = await getGoogleAuthUri();
    window.location.href = uri;
  }, []);

  const onSelectVKAuth = useCallback(async () => {
    const uri = await getVKAuthUri();
    window.location.href = uri;
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && variant) {
      switch (variant) {
        case 'google':
          authViaGoogle(code);
          break;
        case 'vk':
          authViaVK(code);
          break;
        default:
          break;
      }
    }
  }, [authViaGoogle, authViaVK, searchParams, variant]);

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
