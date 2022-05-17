import React from "react";
import AlertContext from "../../context/alert/AlertContext";
import { useContext } from "react";

const Alerts = () => {
  const alertContex = useContext(AlertContext);

  return (
    alertContex.alerts.length > 0 &&
    alertContex.alerts.map((alert) => {
      return <div key={alert.id} className={`alert alert-${alert.type}`}>
        {" "}
        {alert.msg}{" "}
      </div>;
    })
  );
};

export default Alerts;
