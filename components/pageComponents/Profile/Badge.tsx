import { RiMedalLine } from "react-icons/ri";

const Badge = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <RiMedalLine style={{ height: 100, width: 100, color:'#bebebe' }} />
      <h5 className="card-title">100 Reputation</h5>
    </div>
  );
};

export default Badge;
