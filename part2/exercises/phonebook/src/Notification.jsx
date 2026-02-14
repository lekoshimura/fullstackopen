const Notification = ({ message }) => {
  if (!message) return null;
  return (
    <div class="notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
