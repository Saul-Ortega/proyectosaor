//IMPORTAMOS LA FUNCIÓN CREATESLICE DE LA LIBRERÍA REDUX-TOOLKIT
import { createSlice } from "@reduxjs/toolkit";

//CREAMOS EL OBJETO AUTHSTATE QUE CONTIENE 1 BOOLEANO Y 2 STRINGS
export interface AuthState {
    isAutenticated: boolean;
    userName: string;
    userRole: string;
}

//DECLARAMOS UNA CONSTANTE LLAMADA INITIALAUTHSTATE
//INICIALIZAMOS EL BOOLEANO A FALSE Y LOS STRINGS VACÍOS
const initialAuthState: AuthState = {
    isAutenticated: false,
    userName: '',
    userRole: '',
}

//CREMOS LOS REDUCERS DENTRO DE LA FUNCIÓN CREATESLICE
//DECLARAMOS EL NOMBRE QUE TENDRÁ EL SLICE
//DECLARAMOS EL ESTADO INICIAL
//DECLARAMOS LOS REDUCERS
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: ( state, action ) => {
            const userData = action.payload;
            state.isAutenticated = true;
            state.userName = userData.name;
            state.userRole = userData.role;
        },
        logout: ( state ) => {
            state = initialAuthState
        }
    },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;