import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NoteDto, TagDto } from '../../models';

export type TagsNotesAmount = {
  tag?: TagDto;
  notesAmount?: number;
};

// state
export type NotesState = {
  tag?: TagDto | null;
  notes?: NoteDto[] | null;
  tagsNotesAmount?: TagsNotesAmount[] | null;
  openAddTagToast?: boolean;
  openAddNoteToast?: boolean;
};

const initialState: NotesState = {
  openAddTagToast: false,
  openAddNoteToast: false,
};

// reducers
export const notesSlice = createSlice({
  initialState,
  name: 'notesSlice',
  reducers: {
    setTag: (state, { payload }: PayloadAction<TagDto>) => {
      state.tag = payload;
    },
    resetTag: state => {
      state.tag = null;
    },
    setNotes: (state, { payload }: PayloadAction<NoteDto[]>) => {
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
} = notesSlice.actions;

export default notesSlice.reducer;
