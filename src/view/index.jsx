import React from "react";
import ReactDOM from "react-dom";
import imgs from '../assets/img/*.png';

export const ResetButton = (dispatch, model, actions) => {
  return (
    <>
      <Button
        className={model.toggles.isSelectingReset ? 'bg-light-gray' : 'bg-red white'} 
        onClick={() => dispatch(actions.toggle('isSelectingReset'))}
      >
        {model.toggles.isSelectingReset ? 'Cancel' : 'Reset'}
      </Button>
      {model.toggles.isSelectingReset ?
        <Button
          className='bg-red white' 
          onClick={() => dispatch(actions.resetAll())}
        >
          Reset All
        </Button>
        : null
      }
    </>
  )
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
      <img src={imgs[`${tool.type}-${tool.name}`]} width={64} height={64} />
      <div className="f4">
        {tool.counter}
      </div>
    </Button>

  );
}

export const Tools = (dispatch, model, actions) => {

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
              onReset={() => dispatch(actions.reset(toolIndex))}
              onDecrement={()=> dispatch(actions.decrementTool(toolIndex))}
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

const ViewTypes = ['regular', 'flimsy', 'golden'];

export const Navigation = (dispatch, model, actions) => {
  return (
    <div className="bg-light-gray">
      {ViewTypes.map(viewType => {
        return (
          <div
            key={`view-type-${viewType}`}
            onClick={() => dispatch(actions.changeViewType(viewType))}
            className={`${viewType === model.viewType ? 'bg-green white' : ''} pa2 pointer`}>
            {viewType}
          </div>
        )
      })}
    </div>
  )
}

export default (dispatch, model, actions) => {
  return <div className="flex flex-row min-vh-100 sans-serif">
    {Navigation(dispatch, model, actions)}
    <div>
      {Tools(dispatch, model, actions)}
      {ResetButton(dispatch, model, actions)}
    </div>
  </div>
}
