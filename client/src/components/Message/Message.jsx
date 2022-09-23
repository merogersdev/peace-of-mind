import "./Message.scss";

/*

Supported Types:

info (Default)
error
warning
success

*/

const Message = ({ type = "info", message = "Loading..." }) => {
  return (
    <div className={`message${type ? ` message--${type}` : ""}`}>{message}</div>
  );
};

export default Message;
