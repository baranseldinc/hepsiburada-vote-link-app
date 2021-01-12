import React from 'react';
import LinkListSection from './components/LinkListSection';
import HeaderSection from './components/HeaderSection';
import NewItem from './components/NewItem';


function App(props) {
  const appName = <span><b>Link</b>VOTE Challenge</span>;
  
  return (
    <div className="container">
      <HeaderSection appName={appName} />

      <hr className="mt-0" />

      {!props.page && <LinkListSection />}

      {props.page === 'new' && <NewItem />}

    </div>
  );
}

export default App;
