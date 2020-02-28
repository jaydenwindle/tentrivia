import React, { useContext, createContext } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";

export const StoreContext = createContext(null);

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    questions: [],
    answers: [],
    fetchQuestions: async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      ).then(res => res.json());

      if (response.response_code === 0) {
        store.questions = response.results;
      }
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
