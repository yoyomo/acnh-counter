import {Tool, initTools} from '../model';

export const decrement = (toolIndex) => {
  return {
    type: 'decrement',
    toolIndex
  }
}

export const reset = (toolIndex) => {
  return {
    type: 'reset',
    toolIndex
  }
}

export const toggle = (target) => {
  return {
    type: 'toggle',
    target
  }
}

export const readFromLocalStorage = () => {
  return {
    type: 'read-from-local-storage'
  }
}

export const resetAll = () => {
  return {
    type: 'reset-all'
  }
}

export const changeViewType = (viewType) => {
  return {
    type: 'change-view-type',
    viewType,
  }
}

export default (model, action) => {
  switch (action.type) {
    case 'decrement':
      model = {...model};
      model.tools = model.tools.slice();
      model.tools[action.toolIndex] = {...model.tools[action.toolIndex]};
      model.tools[action.toolIndex].counter--;

      if(model.tools[action.toolIndex].counter < 0) {
        model.tools[action.toolIndex].counter = 0;
      }

      localStorage.setItem('tools', JSON.stringify(model.tools));
      break;
    case 'reset':
      model = resetCounter(model, action.toolIndex);
      break;
    case 'reset-all':
      model = resetCounter(model);
      break;
    case 'toggle':
      model = {...model};
      model.toggles= {...model.toggles};
      model.toggles[action.target] = !model.toggles[action.target];
      break;
    case 'read-from-local-storage':
      try {
        const storageTools = JSON.parse(localStorage.getItem('tools'));

        if (storageTools) {
          model = {...model};
          model.tools = storageTools;
        }

        const storageViewType = localStorage.getItem('viewType');
        if (storageViewType) {
          model = {...model};
          model.viewType = storageViewType;
        }
      }
      catch(err){
        console.error(err);
      }
      break;
    case 'change-view-type':
      model = {...model};
      model.viewType = action.viewType;

      localStorage.setItem('viewType', model.viewType);
      break;

  }
  return {model};
}

export const resetCounter = (model, toolIndex) => {

  model = {...model};

  if(toolIndex) {
    const tool = model.tools[toolIndex];

    model.tools = model.tools.slice();
    model.tools[toolIndex] = Tool(tool.type, tool.name);
  } 
  else {
    model.tools = initTools();
  }

  model.toggles = {...model.toggles};
  model.toggles.isSelectingReset = false;

  localStorage.setItem('tools', JSON.stringify(model.tools));

  return model;
}
