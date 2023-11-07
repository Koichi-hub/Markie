import { useSelector } from 'react-redux';
import { Button } from '../button';
import { TagsList } from './components/tags-list';
import styles from './Sidebar.module.scss';
import { RootState, useAppDispatch } from '../../../../store';
import {
  fetchNotes,
  fetchNotesCount,
  setOpenAddTagToast,
} from '../../notesSlice';
import { useEffect } from 'react';

export const Sidebar = () => {
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.app.user);

  const onEditTags = () => {
    dispatch(setOpenAddTagToast(true));
  };

  const onExit = () => {};

  useEffect(() => {
    if (user?.guid) {
      dispatch(fetchNotesCount({ userGuid: user?.guid }));
      dispatch(fetchNotes(user?.guid));
    }
  }, [dispatch, user]);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img
          className={styles['user-picture']}
          src={'/assets/icons/logo1.jpg'}
        />
        <div className={styles['user-username']}>{user?.userName}</div>
      </div>
      <TagsList />
      <div className={styles['buttons']}>
        <Button
          color="grey-80"
          text="Редактировать теги"
          onClick={onEditTags}
        />
        <Button color="grey-0" text="выйти" onClick={onExit} />
      </div>
    </div>
  );
};
