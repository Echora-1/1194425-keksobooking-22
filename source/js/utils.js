const removeСhildByClass = (parentElement, childClass) => {
  const arrayChildren = Array.from(parentElement.children);
  arrayChildren.forEach((element) => {
    if(element.classList.contains(childClass)) {
      parentElement.removeChild(element);
    }
  });
};

const setThrottle = (func, ms) => {
  let ignore = false;
  let lastArgs = null;
  let lastThis = null;

  const throttle = function() {
    if(ignore) {
      lastArgs = arguments;
      lastThis = this;
      return;
    }

    func.apply(this, arguments);

    ignore = true;

    setTimeout(() => {
      ignore = false;
      if(lastArgs) {
        throttle.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, ms);
  };

  return throttle;
};

const isEscPressed = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isLeftMouseButtonPressed = (evt) => {
  return evt.type === 'mousedown' && evt.which === 1 ;
};

export {removeСhildByClass, setThrottle, isEscPressed, isLeftMouseButtonPressed};
