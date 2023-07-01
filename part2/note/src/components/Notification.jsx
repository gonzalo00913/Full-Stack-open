import '../App.css';

const Notification = ({ message }) => {
  console.log(message);
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  export default Notification;