import { useCallback, useMemo } from 'react';
import { Button } from '../../../button';
import styles from './AddTag.module.scss';
import { useDispatch } from 'react-redux';
import { setOpenAddTagToast } from '../../../../mainSlice';

export const AddTag = () => {
  const dispatch = useDispatch();

  const onClose = useCallback(
    () => dispatch(setOpenAddTagToast(false)),
    [dispatch]
  );

  const renderTags = useMemo(() => <div></div>, []);

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название тега:</span>
        <input className={styles['input']} type="text" />
        <Button text="Создать" color="grey-80" />
        <Button text="Удалить" color="grey-80" />
        <Button text="Закрыть" color="grey-80" onClick={onClose} />
      </div>
      <div className={styles['tags']}>
        <span className={styles['title']}>Теги:</span>
        <div className={styles['tags__list']}>{renderTags}</div>
      </div>
    </div>
  );
};
