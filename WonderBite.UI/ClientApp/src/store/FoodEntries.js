const requestFoodEntriesType = 'REQUEST_FOOD_ENTRIES';
const receiveFoodEntriesType = 'RECEIVE_FOOD_ENTRIES';
const requestCreateFoodEntryType = 'REQUEST_CREATE_FOOD_ENTRY';
const receiveCreateFoodEntryType = 'RECEIVE_CREATE_FOOD_ENTRY';
const modalOpenType = 'MODAL_OPEN';
const modalCloseType = 'MODAL_CLOSE';
const initialState = { entries: [], isLoading: false, isCreateFoodEntry:0};

export const actionCreators = {
    requestFoodEntries: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().foodEntries.startDateIndex) {
            return;
        }
        dispatch({ type: requestFoodEntriesType, startDateIndex });
        
        const url = `api/FoodEntry/GetAll`;
        const response = await fetch(url);
        const entries = await response.json();
        dispatch({ type: receiveFoodEntriesType, startDateIndex, entries });
    },
    requestCreateFoodEntryType: model => async (dispatch, getState) => {
        console.log("data", model);
        dispatch({ type: requestCreateFoodEntryType, isCreateFoodEntry : 1});
        const url = `api/FoodEntry/Create`;
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Accept':'application/json' },
            body: model
        });
        const result = await response.json();
        console.log("result",result);
        dispatch({ type: receiveCreateFoodEntryType, isCreateFoodEntry: 2, show:false });
    },
    modalClose:() => (dispatch, getState) =>  {
        dispatch({ type: modalCloseType,show: false });
    },

    modalShow: () => (dispatch, getState) =>  {
        dispatch({ type: modalOpenType, show: true });
    }
};

export const reducer = (state, action) => {
  state = state || initialState;
    if (action.type === requestFoodEntriesType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
        isLoading: true
    };
  }
    
    if (action.type === receiveFoodEntriesType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
        entries: action.entries,
        isLoading: false
        };
    }

    if (action.type === requestCreateFoodEntryType) {
        return {
            ...state,
            isCreateFoodEntry: 0
        };
    }

    if (action.type === receiveCreateFoodEntryType) {
        return {
            ...state,
            isCreateFoodEntry: 2,
            //show: false,
            startDateIndex: undefined
        };
    }

    if (action.type === modalOpenType) {
        return {
            ...state,
            show: true
        };
    }

    if (action.type === modalCloseType) {
        return {
            ...state,
            show: false
        };
    }
  return state;
};


