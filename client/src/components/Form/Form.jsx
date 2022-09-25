import "./Form.scss";

import React from "react";

const Form = ({ children, handler }) => {
  return (
    <form className="form" onSubmit={handler}>
      {children}
    </form>
  );
};

export default Form;
