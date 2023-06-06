import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}


//ФУНКЦИИ отвечающие за регистрацию 
export const registerUser = createAsyncThunk( //первый параметр имя слайса, 2 функция
    'auth/registerUser',
    async ({ email, name, password }) => {
        try {
            const { data } = await axios.post('/user/registration', {
                email,
                name,
                password
            })
            // console.log(data);
            // console.log(data.email);
            // console.log(data.name);
            console.log(data.token);
            if (data.token) {
                window.localStorage.setItem('token', data.token)
                console.log("data.token",data.token );
            }
            return data
        } catch (error) {
            console.log(error);
        }
    },
)


//login
export const loginUser = createAsyncThunk( //первый параметр имя слайса, 2 функция
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const { data } = await axios.post('/user/login', {
                email,
                password
            })
            // console.log(data);
            // console.log(data.email);
            if (data.token) {
                window.localStorage.setItem('token', data.token)
                console.log("data.token",data.token);
            }
            return data
        } catch (error) {
            console.log(error);
        }
    },
)

//getMe
export const getMe = createAsyncThunk( //первый параметр имя слайса, 2 функция
    'auth/loginUser',
    async () => {
        try {
            const { data } = await axios.get('/user/auth')
            console.log("data: ",data);
            return data
        } catch (error) {
            console.log(error);
        }
    },
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
                state.token = null
                state.isLoading = false
                state.status = null
        }
    },
    extraReducers: {
        //Register
        //3 состояния
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, //запрос отправляется 
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }, //запрос выполнился до конца
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, //если возникла ошибка


        //Login
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, //запрос отправляется 
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }, //запрос выполнился до конца
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, //если возникла ошибка


        //Проверка авторизации
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, //запрос отправляется 
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        }, //запрос выполнился до конца
        [getMe.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, //если возникла ошибка
    }
})


export const checkIsAuth = state => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer