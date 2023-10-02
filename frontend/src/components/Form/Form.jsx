import "./Form.scss";

import React from "react";

export default function Form({ children, handler }) {
  return (
    <form className="form" onSubmit={handler}>
      {children}
    </form>
  );
};
