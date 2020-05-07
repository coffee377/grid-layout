import React from 'react';
import PredictForm from './PredictForm';
import './style.less';

interface IndexProps {}

const PredictApp: React.FC<IndexProps> = () => (
  <div className="app">
    <PredictForm />
  </div>
);

export default PredictApp;
