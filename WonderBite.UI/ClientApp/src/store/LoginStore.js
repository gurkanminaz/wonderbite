const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT',
    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',
};

const initialState = { loggingIn: false, loading:false}

export const userActions = {
    login: (email, password) => async (dispatch, getState) => {
        console.log("TEST login1", email,password);
        dispatch({ type: userConstants.LOGIN_REQUEST, email });
        const model = JSON.stringify({email,password});
        const url = `api/Account/Login`;
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json' },
            body: model
        });
        const result = await response.json();
        console.log("result", result);
    },
    //logout,
    //getAll
};


export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === userConstants.GETALL_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }
    if (action.type === userConstants.GETALL_SUCCESS) {
        return {
            ...state,
            items: action.users
        };
    }
    if (action.type === userConstants.GETALL_FAILURE) {
        return {
            ...state,
            error: action.error
        };
    }
    return state;
};
