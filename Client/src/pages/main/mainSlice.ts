import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from '../../models/note';
import { Tag } from '../../models/tag';

export type TagsNotesAmount = {
  tag?: Tag;
  notesAmount?: number;
};

// state
export type MainState = {
  tag?: Tag | null;
  notes?: Note[] | null;
  tagsNotesAmount?: TagsNotesAmount[] | null;
  openAddTagToast?: boolean;
  openAddNoteToast?: boolean;
};

const initialState: MainState = {
  tag: { title: 'Тэг какого-то ноунейма' } as Tag,
  notes: [
    {
      guid: '1234thisisguid',
      tag: {} as Tag,
      created_at: new Date(),
      updated_at: new Date(),
      title: 'LoL oMg',
    },
  ],
  tagsNotesAmount: [
    {
      tag: { title: 'Экзистенциальные проблемы' } as Tag,
      notesAmount: 1,
    },
    {
      tag: { title: 'Как правильно стрейфить в CS:GO' } as Tag,
      notesAmount: 999,
    },
  ],
  openAddTagToast: false,
  openAddNoteToast: false,
};

// reducers
export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    setTag: (state, { payload }: PayloadAction<Tag>) => {
      state.tag = payload;
    },
    resetTag: state => {
      state.tag = null;
    },
    setNotes: (state, { payload }: PayloadAction<Note[]>) => {
      state.notes = payload;
    },
    resetNotes: state => {
      state.notes = [];
    },
    setTagsNotesAmount: (
      state,
      { payload }: PayloadAction<TagsNotesAmount[]>
    ) => {
      state.tagsNotesAmount = payload;
    },
    resetTagsNotesAmount: state => {
      state.tagsNotesAmount = [];
    },
    setOpenAddTagToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddTagToast = payload;
    },
    toggleOpenAddTagToast: state => {
      state.openAddTagToast = !state.openAddTagToast;
    },
    setOpenAddNoteToast: (state, { payload }: PayloadAction<boolean>) => {
      state.openAddNoteToast = payload;
    },
  },
});

// actions
export const {
  setNotes,
  resetNotes,
  setTag,
  resetTag,
  setTagsNotesAmount,
  resetTagsNotesAmount,
  setOpenAddTagToast,
  toggleOpenAddTagToast,
  setOpenAddNoteToast,
} = mainSlice.actions;

export default mainSlice.reducer;
