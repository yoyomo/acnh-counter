import {readFromLocalStorage} from '../update';

export default (dispatch, actions) => {
  dispatch(actions.readFromLocalStorage());
}
