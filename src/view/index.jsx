import React from "react";
import ReactDOM from "react-dom";
import imgs from '../assets/img/*.png';

export const ResetButton = (dispatch, model, actions) => (
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

export const Button = ({className, children, ...domProps}) => (
  <div {...domProps} className={"br4 ma4 pa2 pointer tc shadow-4 " + className}>
    {children}
  </div>
)

export const ToolButton = ({isSelectingReset, onDecrement, onReset, tool, ...domProps}) => (
  <Button {...domProps}
    className={isSelectingReset ? 'bg-red white' : 'bg-light-gray'}
    onClick={() => isSelectingReset ? onReset() : onDecrement()}
  >
    <img draggable="false" src={imgs[`${tool.type}-${tool.name}`]} width={64} height={64} />
    <div className="f4">
      {tool.counter}
    </div>
  </Button>
)

export const Tools = (dispatch, model, actions) => (
  <div className="flex flex-row flex-wrap">
    <div className="flex flex-row flex-wrap">
      {model.tools.map((tool, toolIndex) => {
        if(tool.type !== model.viewType) return;
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
  </div>
)

const ViewTypes = ['regular', 'flimsy', 'golden'];

export const Navigation = (dispatch, model, actions) => (
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

export default (dispatch, model, actions) => (
  <div className="flex flex-row min-vh-100 sans-serif disable-dbl-tap-zoom no-select">
    {Navigation(dispatch, model, actions)}
    <div>
      {Tools(dispatch, model, actions)}
      {ResetButton(dispatch, model, actions)}
    </div>
  </div>
)
