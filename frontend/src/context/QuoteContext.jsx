import { createContext, useState, useMemo } from "react";

import axios from "axios";

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);

  const getQuote = async () => {
    try {
      const response = await axios.get("/users/quote/", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setQuote(response.data.quote.quote);
        setAuthor(response.data.quote.author);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Memoize the context
  const quoteProviderValue = useMemo(
    () => ({ quote, author, getQuote }),
    [quote, author, getQuote]
  );

  return (
    <QuoteContext.Provider value={quoteProviderValue}>
      {children}
    </QuoteContext.Provider>
  );
}

export default QuoteContext;
