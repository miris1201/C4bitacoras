import { configureStore } from '@reduxjs/toolkit'
import { transactionSlice } from './slices/transaction';
import { templateSlice } from './slices/template/templateSlice';
import { loginSlice } from './slices/login';
import { userSlice } from './slices/users';
import { profileSlice } from './slices/profiles';
import { sliceColonias } from './slices/catalogos';

export const store = configureStore({
	reducer: {
		transaction: transactionSlice.reducer,
		template: templateSlice.reducer,
		login: loginSlice.reducer,
		users: userSlice.reducer,
		profiles: profileSlice.reducer,
		colonias: sliceColonias.reducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
//state
export type GetState = typeof store.getState;