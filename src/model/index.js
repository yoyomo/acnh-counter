
export const Tool = (type, name) => {
  let counter = 0;
  switch(name) {
    case 'shovel':
      switch (type) {
        case 'regular':
          counter = 100;
          break;
        case 'flimsy':
          counter = 40;
          break;
        case 'golden':
          counter = 200;
          break;
      }
      break;
    case 'fishing-rod':
      switch (type) {
        case 'regular':
          counter = 30;
          break;
        case 'flimsy':
          counter = 8;
          break;
        case 'golden':
          counter = 90;
          break;
      }
      break;
    case 'net':
      switch (type) {
        case 'regular':
          counter = 30;
          break;
        case 'flimsy':
          counter = 10;
          break;
        case 'golden':
          counter = 90;
          break;
      }
      break;
    case 'slingshot':
      switch (type) {
        case 'regular':
          counter = 20;
          break;
        case 'golden':
          counter = 60;
          break;
      }
      break;
    case 'stone-axe':
      switch (type) {
        case 'regular':
          counter = 100;
          break;
      }
      break;
    case 'axe':
      switch (type) {
        case 'regular':
          counter = 100;
          break;
        case 'flimsy':
          counter = 40;
          break;
        case 'golden':
          counter = 200;
          break;
      }
      break;
    case 'watering-can':
      switch (type) {
        case 'regular':
          counter = 60;
          break;
        case 'flimsy':
          counter = 20;
          break;
        case 'golden':
          counter = 180;
          break;
      }
      break;
    default: 
      throw 'Invalid tool name';
      return;
  }

  return {
    type,
    name,
    counter,
  }
}

export const initTools = () => {
  return [
    Tool('regular', 'shovel'),
    Tool('regular', 'fishing-rod'),
    Tool('regular', 'net'),
    Tool('regular', 'slingshot'),
    Tool('regular', 'stone-axe'),
    Tool('regular', 'axe'),
    Tool('regular', 'watering-can'),
    Tool('flimsy', 'shovel'),
    Tool('flimsy', 'fishing-rod'),
    Tool('flimsy', 'net'),
    Tool('flimsy', 'axe'),
    Tool('flimsy', 'watering-can'),
    Tool('golden', 'shovel'),
    Tool('golden', 'fishing-rod'),
    Tool('golden', 'net'),
    Tool('golden', 'slingshot'),
    Tool('golden', 'axe'),
    Tool('golden', 'watering-can'),
  ]
}

export default {
  tools: initTools(),
  toggles: {
    isSelectingReset: false,
  },
  viewType: 'regular'
}
