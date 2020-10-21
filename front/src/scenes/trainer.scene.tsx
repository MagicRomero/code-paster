import React from 'react';
import { CreateSessionContainer } from 'pods/create-session';
import { TrainerContainer } from 'pods/trainer';

export const TrainerScene: React.FC = () => {
  React.useEffect(() => {
    document.title = `Trainer - Code Paster`;
  }, []);

  return <TrainerContainer />;
};
