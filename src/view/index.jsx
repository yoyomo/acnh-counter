import React from "react";
import ReactDOM from "react-dom";
import {decrement, reset, toggle, resetAll, changeViewType} from '../update';

export const ResetButton = (dispatch) => {

  const dispatcher = {
    selectReset: () => dispatch(toggle('isSelectingReset')),
    resetAll: () => dispatch(resetAll()),
  }

  return (model) => {
    return (
      <>
        <Button
          className={model.toggles.isSelectingReset ? 'bg-light-gray' : 'bg-red white'} 
          onClick={dispatcher.selectReset}
        >
          Reset
        </Button>
        {model.toggles.isSelectingReset ?
          <Button
            className='bg-red white' 
            onClick={dispatcher.resetAll}
          >
            Reset All
          </Button>
          : null
        }
      </>
    )
}
}

export const Button = (props) => {
  return (
    <div {...props} className={"br4 ma4 pa2 pointer tc shadow-4 " + props.className}>
      {props.children}
    </div>
  );
}

export const ToolButton = (props) => {

  const resettingClasses = props.isSelectingReset ? 'bg-red white' : 'bg-light-gray'; 

  const {isSelectingReset, onDecrement, onReset, tool, ...domProps} = {...props};

  return (
    <Button {...domProps}
      className={resettingClasses}
      onClick={() => isSelectingReset ? onReset() : onDecrement()}
    >
      <img src={`assets/img/${tool.type}-${tool.name}.png`} width={64} height={64} />
      <div className="sans-serif f4">
        {tool.counter}
      </div>
    </Button>

  );
}

export const Tools = (dispatch) => {

  const dispatcher = {
    decrementTool: (toolIndex) => dispatch(decrement(toolIndex)),
    reset: (toolIndex) => dispatch(reset(toolIndex)),
  }

  return (model) => {

    const regularTools = model.tools.filter(t=>t.type == 'regular');
    const flimsyTools = model.tools.filter(t=>t.type == 'flimsy');
    const goldenTools = model.tools.filter(t=>t.type == 'golden');

    const ToolsByTypeContent = (props) => {
      return (
        <div className="flex flex-row flex-wrap no-select">
          {props.tools.map((tool, toolIndex) => {
            toolIndex += props.offset;
            return (
              <ToolButton 
                key={`tool-${toolIndex}`}
                tool={tool}
                isSelectingReset={model.toggles.isSelectingReset}
                onReset={() => dispatcher.reset(toolIndex)}
                onDecrement={()=> dispatcher.decrementTool(toolIndex)}
              />
            )
          })}
        </div>
      )
    }


    return (
      <div className="flex flex-row flex-wrap no-select">
        {model.viewType === 'regular' && <ToolsByTypeContent tools={regularTools} offset={0}/>}
        {model.viewType === 'flimsy' && <ToolsByTypeContent tools={flimsyTools} offset={regularTools.length}/> }
        {model.viewType === 'golden' && <ToolsByTypeContent tools={goldenTools} offset={regularTools.length + flimsyTools.length}/> }
      </div>

    )
  }
}

const ViewTypes = ['regular', 'flimsy', 'golden'];

export const Navigation = (dispatch) => {

  const dispatcher = {
    changeViewType: (viewType) => dispatch(changeViewType(viewType)),
  }

  return (model) => {
    return (
      <div className="bg-light-gray">
        {ViewTypes.map(viewType => {
          return (
            <div
              key={`view-type-${viewType}`}
              onClick={() => dispatcher.changeViewType(viewType)}
              className={`${viewType === model.viewType ? 'bg-green white' : ''} pa2 pointer`}>
              {viewType}
            </div>
          )
        })}
      </div>
    )
  }
}

export default (dispatch) => {

  const ToolsContent = Tools(dispatch);
  const ResetButtonContent = ResetButton(dispatch);
  const NavigationContent = Navigation(dispatch);

  return (model) => {
    return <div className="flex flex-row vh-100">
      <NavigationContent {...model} />
      <div>
        <ToolsContent {...model} />
        <ResetButtonContent {...model} />
      </div>
    </div>
  }
}
