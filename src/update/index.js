import {Tool, initTools} from '../model';

export default {
  decrementTool: (toolIndex) => (model) => {

    let tools = model.tools.slice();
    tools[toolIndex] = {...tools[toolIndex]};
    tools[toolIndex].counter--;

    if(tools[toolIndex].counter < 0) {
      tools[toolIndex].counter = 0;
    }

    localStorage.setItem('tools', JSON.stringify(tools));
    return ({...model, tools});
  },
  reset: (toolIndex) => (model) => (resetCounter(model, toolIndex)),
  resetAll: () => (model) => (resetCounter(model)),
  toggle: (target) => (model) => {
    let toggles= {...model.toggles};
    toggles[target] = !toggles[target];
    return ({...model, toggles});
  },
  readFromLocalStorage: () => (model) => {
    let tools = model.tools.slice();
    let viewType = model.viewType;
    try {
      const storageTools = JSON.parse(localStorage.getItem('tools'));

      if (storageTools) {
        tools = storageTools;
      }

      const storageViewType = localStorage.getItem('viewType');
      if (storageViewType) {
        viewType = storageViewType;
      }
    }
    catch(err){
      console.error(err);
    }
    return ({...model, tools, viewType});
  },
  changeViewType: (viewType) => (model) => {
    localStorage.setItem('viewType', viewType);
    return ({...model, viewType});
  }

}

export const resetCounter = (model, toolIndex) => {

  let tools = model.tools.slice();

  if(toolIndex) {
    const tool = model.tools[toolIndex];

    tools = model.tools.slice();
    tools[toolIndex] = Tool(tool.type, tool.name);
  } 
  else {
    tools = initTools();
  }

  let toggles = {...model.toggles};
  toggles.isSelectingReset = false;

  localStorage.setItem('tools', JSON.stringify(tools));

  return ({...model, tools, toggles});
}
