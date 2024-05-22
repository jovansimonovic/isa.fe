import testAction from "@/core/testAction";

const { createContext, useReducer, useContext } = require("react");

const initialState = {
  firstName: "Jovan",
  email: "test@gmail.com",
};

// global state context
const testContext = createContext();

// reducer - function that changes context state
const testReducer = (state, action) => {
  switch (action.type) {
    case testAction.CHANGE_EMAIL:
      return { ...state, email: action.payload };
    case testAction.CHANGE_FIRST_NAME:
      return { ...state, firstName: action.payload };
    default:
      return state;
  }
};

// provider for our partial components
const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);
  const value = { state, dispatch };

  return <testContext.Provider value={value}>{children}</testContext.Provider>;
};

// function that uses the context
const useTestActions = () => {
  const context = useContext(testContext);
  if (context === undefined) {
    throw new Error("testActions must be used within a testProvider");
  }
  return context;
};

export { TestProvider, useTestActions };
