import logo from './logo.svg';
import './App.css';
import withSocket from "./withSocket"

function App({socketListen,socketSend}) {

  socketListen("consumerResponse", (response) => {
    console.log(`\nsocket listening to consumerResponse`)
    console.log(response)
  })

console.log(`emitting socket 'messageFromApp' `)
  socketSend("messageFromApp", {name:"I am connected"})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withSocket(App);
