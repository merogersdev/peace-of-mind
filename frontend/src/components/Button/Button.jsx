import React from "react";

export default function Button({ text }) {
  return (
    <button className="button" type="button">
      {text}
    </button>
  );
}
