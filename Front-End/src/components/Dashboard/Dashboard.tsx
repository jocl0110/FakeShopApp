const Dashboard = ({ handleHome, handleSettings }) => {
  return (
    <div>
      <ul>
        <li>Hello username</li>
        <li onClick={handleSettings}>Settings</li>
      </ul>
      <div>
        <h2>Purchase History</h2>
      </div>
      <button onClick={handleHome}>Home</button>
    </div>
  );
};

export default Dashboard;
