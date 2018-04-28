import * as systemActions from './systemActions';
const initialState =  {
  selectedElement: [],
  msg: ''
};
export default function systemReducer (state = initialState, action) {
  const {type, data} = action;
  switch (type) {

    case systemActions.CAT_DATA:
      let objectName = data.objectName;
      objectName = objectName.charAt(0).toLowerCase() + objectName.slice(1);
      return {
        ...state,
        [objectName]: data,
        selectedElement: []
      };

    case systemActions.SELECTED_ITEM:
      const { checked, el } = data;
      let {selectedElement} = state;
      if(!checked){
        let findIndex = selectedElement.indexOf(el);
        selectedElement.splice(findIndex, 1);
      } else{
        selectedElement = [...selectedElement, el];
      }
      return {
        ...state,
        selectedElement
      }

    case systemActions.SELECT_ALL:
      return {
        ...state,
        selectedElement: data
      }
    case systemActions.REMOVE_ITEM:
      return {
        ...state,
        msg: data.msg
      }
    default:
      return state;
  }
}
