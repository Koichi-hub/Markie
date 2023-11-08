import { useCallback, useEffect, useState } from 'react';
import { RoundendButton } from '../../components/rounded-button';
import styles from './Auth.module.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { authApi } from '../../api';
import { useAppDispatch, useAppSelector } from '../../store';
import { authViaGoogle, authViaVK } from '../../store/appSlice';
import { routes } from '../../router';

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { variant } = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.app.user);

  const [code, setCode] = useState('');
  const [authVariant, setAuthVariant] = useState('');

  const onAuthViaGoogle = useCallback(
    (code: string) => dispatch(authViaGoogle(code)),
    [dispatch]
  );

  const onAuthViaVK = useCallback(
    (code: string) => dispatch(authViaVK(code)),
    [dispatch]
  );

  const onSelectGoogleAuth = useCallback(async () => {
    const uri = await authApi.getGoogleAuthUri();
    window.location.href = uri;
  }, []);

  const onSelectVKAuth = useCallback(async () => {
    const uri = await authApi.getVKAuthUri();
    window.location.href = uri;
  }, []);

  const onAuthUser = useCallback(() => {
    if (code && authVariant) {
      switch (authVariant) {
        case 'google':
          onAuthViaGoogle(code);
          break;
        case 'vk':
          onAuthViaVK(code);
          break;
        default:
          break;
      }
    }
  }, [authVariant, code, onAuthViaGoogle, onAuthViaVK]);

  useEffect(() => {
    const searchParamsCode = searchParams.get('code');
    if (!code && searchParamsCode) setCode(searchParamsCode);
  }, [code, searchParams]);

  useEffect(() => {
    if (!authVariant && variant) setAuthVariant(variant);
  }, [authVariant, variant]);

  useEffect(() => {
    onAuthUser();
  }, [onAuthUser]);

  useEffect(() => {
    if (user) navigate(routes.notes);
  }, [navigate, user]);

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
