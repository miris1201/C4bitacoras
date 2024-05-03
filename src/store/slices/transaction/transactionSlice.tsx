import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserActive {
  sNombre: string,
  sUsuario: string,
}
export interface transactionState {
  idRecord: number,
  idActive: number,
  uActive: UserActive,
  showList: boolean,
  loadingList: boolean,
  loadingBtn: boolean,
  allowEdit: boolean,
  allowNew: boolean,
  allowDelete: boolean,
  allowUpdate: boolean,
  allowPrint: boolean,
  allowView: boolean,
  readOnly: boolean,
  list: Array<any>,
  refresh: boolean,
  data: object,
  search: object,
  descSearch: string,
  dataDtl: Array<any>,
  menu: Array<any>,
  loading: boolean,
  currentPage: number,
}

const initialUserActive = {
  sNombre: '',
  sUsuario: '',
}

const initialState: transactionState = {
  idRecord: 0,
  idActive: 0,
  uActive: initialUserActive,
  showList: true,
  loadingList: true,
  loadingBtn: false,
  allowEdit: false,
  allowNew: false,
  allowDelete: false,
  allowUpdate: false,
  allowPrint: false,
  allowView: true,
  readOnly: false,
  list: [],
  refresh: false,
  data: {},
  search: {},
  descSearch: "",
  dataDtl: [],
  menu: [],
  loading: false,
  currentPage: 0,
}

export const transactionSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showList: (state, action: PayloadAction<boolean>) => {
      state.showList = action.payload;
    },
    setShowList: (state, action: PayloadAction<boolean>) => {
      state.showList = action.payload;
    },
    unSetActiveUser: (state) => {
      state.idActive = 0;
      state.uActive = initialUserActive;
    },
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readOnly = action.payload
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { showList, setShowList, unSetActiveUser, setReadOnly, setLoadingState } = transactionSlice.actions;