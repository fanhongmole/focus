import React, { FC } from 'react';
import TodoBox from './components/TodoBox';
import { connect, Dispatch, HomeState, GlobalState } from 'umi';

interface HomeProps {
  dispatch: Dispatch;
  home: HomeState;
}

const Home: FC<HomeProps> = props => {
  return (
    <div>
      <h1>今天的计划</h1>
      <TodoBox {...props} />
    </div>
  );
};

export default connect(({ home }: { home: HomeState }) => ({
  home,
}))(Home);
