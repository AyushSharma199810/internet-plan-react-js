import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/plans')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the plans!', error);
      });
  }, []);

  const activatePlan = (planId) => {
    axios.post('http://localhost:3001/api/activate', { planId })
      .then(response => {
        setActivationMessage(`Plan activated! Start time: ${response.data.activation.startTime}`);
      })
      .catch(error => {
        console.error('There was an error activating the plan!', error);
      });
  };

  return (
    <div>
      <h1>Available Internet Plans</h1>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            {plan.name} - ${plan.price}
            <button onClick={() => activatePlan(plan.id)}>Activate</button>
          </li>
        ))}
      </ul>
      {activationMessage && <p>{activationMessage}</p>}
    </div>
  );
};

export default Plans;
