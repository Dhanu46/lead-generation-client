import React, { useEffect, useState } from 'react';
import './App.css';
import Base from './core/Base';
import setAuthToken from './auth/helper/setToken';
import DashboardCard from './components/dashboardCard/DashboardCard';
import { getAllLeads, getAllLeadsInFunnel } from './user/helper/leadapicall';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header.js';
import { Link } from 'react-router-dom';

function App() {
  const [leads, setLeads] = useState([]);
  const [funnels, setFunnels] = useState([]);
  const dispatch = useDispatch();
  const setToken = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = JSON.parse(localStorage.getItem("jwt"));
      console.log("jwt", jwt);
      setAuthToken(jwt.token);
    }
    getAllLeads()
      .then(response => {
        console.log(response);
        setLeads(response.data);
        dispatch({
          type: "GET_LEADS",
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err)
      });

      getAllLeadsInFunnel()
      .then(response => {
          console.log(response);
          setFunnels(response.data.reverse());
      })
      .catch(err => {
          console.log(err)
      });
  }


  useEffect(() => {
    setToken();
  }, []);

  const leadsToBeContacted = leads.filter(lead => lead.contacted === false);
  const leadsToBeFollowed = leads.filter(lead => lead.followups === true);
  return (
    <Base>
        <Header title="Dashboard" />
        <div className="card-deck p-3 text-center mb-5">
          <div className="col-lg-6">
            <Link to="/allleads" style={{ textDecoration: "none!important", color: "black", height: "100px" }}>
              <DashboardCard title="Total leads" data={leads.length} icon={`fa fa-bar-chart`} />
            </Link>
          </div>
          {/* <div className="col-lg-4">
            <Link to="/" style={{ textDecoration: "none!important", color: "black" }}>
              <DashboardCard title="Leads shared" data={6} icon={`fa fa-calendar-check-o`} />
            </Link>
          </div> */}
          <div className="col-lg-6">
            <Link to="/funnel" style={{ textDecoration: "none!important", color: "black" }}>
                <DashboardCard title="Leads in funnel" data={funnels.length} icon={`fa fa-pie-chart`}  />
            </Link>
          </div>
          <div className="col-lg-6">
            <Link to="/followups" style={{ textDecoration: "none!important", color: "black" }}>
                <DashboardCard title="Followups required" data={leadsToBeFollowed.length} icon={`fa fa-pencil-square-o`}  />
            </Link>
          </div>
          <div className="col-lg-6">
            <Link to="/contacted" style={{ textDecoration: "none!important", color: "black" }}>
              <DashboardCard title="Leads to be contacted today" data={leadsToBeContacted.length} icon={`fa fa-hourglass-start`}  />
            </Link>
          </div>
        </div>
    </Base>
  );
}

export default App;
