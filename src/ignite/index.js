import {readFromLocalStorage} from '../update';

export default (dispatch) => {
  dispatch(readFromLocalStorage());
}
