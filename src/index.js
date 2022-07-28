import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const rootElements = [];

rootElements.push(<h1 key="1">3. Rendering elements</h1>);

/*3. Rendering elements*/

function tick() { // function components
  const element = (
      <h2 key="2">It is {new Date().toLocaleTimeString()}.</h2>
  )
  root.render(element);
}

// setInterval(tick, 1000)


/*4. Components and props*/

const head4 = <h1 key="3">4. Components and props</h1>
rootElements.push(head4)

/** Function and class components **/

function WelcomeFunction(props) {
  return (
      <h2>{props.name}</h2>
  );
}

rootElements.push(<WelcomeFunction name="Jobby-function"/>)

class WelcomeClass extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
   );
  }
}

rootElements.push(<WelcomeClass name='Jobba-class'/>)

/** Composing components **/

function App() {
  return (
    <div>
      <WelcomeFunction name="Ad"/>
      <WelcomeFunction name="Bo"/>
      <WelcomeFunction name="He"/>
    </div>
  )
}

rootElements.push(<App/>)

/** Extracting components **/

/* author = {name: 'A', avatarUrl: "www.a.com"} */
/* text = 'A' */
/* date = '2020-01-01' */

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user = {props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user = {props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date.toLocaleDateString()}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: "http://placekitten.com/g/128/128"
  }
};

rootElements.push(<Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />)

/* 5. State and lifecycle */

/* First tick evolution */

const head5 = <h1>5. State and lifecycle</h1>
rootElements.push(head5)

// function Clock(props) {
//   return (
//     <div>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   )
// }

// function tick_2() {
//   root8.render(<Clock date={new Date()} />);
// }

// setInterval(tick_2, 1000)

/* Converting a Function to a Class */
/* Adding local state to a Class */
/* Adding lifecycle methods to a Class */


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount () {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

// root8.render(<Clock />);
rootElements.push(<Clock />)

const head6 = <h1>6. Handling events</h1>
// root9.render(head6)
rootElements.push(head6)

class ToggleBind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render () {
    return (
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' :'OFF'}</button>
    );
  }
}

class ToggleClassField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }
  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render () {
    return (
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' :'OFF'}</button>
    );
  }
}

class ToggleArrowFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }
  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render () {
    return (
      <button onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'ON' :'OFF'}</button>
    );
  }
}


rootElements.push(<ToggleBind />)
rootElements.push(<ToggleClassField/>)
rootElements.push(<ToggleArrowFunction/>)

const head7 = <h1>7. Conditional Rendering</h1>
rootElements.push(head7)

function UserGreeting(props) {
  return <h1>Welcome back</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting/>
  } else {
    return <GuestGreeting/>
  }
}

rootElements.push(<Greeting isLoggedIn={false}/>)
rootElements.push(<Greeting isLoggedIn={true}/>)

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>Logout</button>
  )
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick = () => {
    this.setState({isLoggedIn: true})
  }
  handleLogoutClick = () => {
    this.setState({isLoggedIn: false})
  }
  render () {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>;
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn}/>
        {button}
        {isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick}/> : <LoginButton onClick={this.handleLoginClick}/>}
      </div>
    )
  }
}


rootElements.push(<LoginControl />)

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello !</h1>
      {unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}
    </div>
  );
}

const messages = ['React', 're: React', 're:re: React'];
rootElements.push(<Mailbox unreadMessages={messages}/>)
rootElements.push(<Mailbox unreadMessages={[]}/>)

function NumberList(props) {
  const numbers = props.numbers;
  // const listItems = numbers.map((number) => <li>number</li>);
  // const listItems = numbers.map((number) => <li key={number.toString()}>number</li>);
  const listItems = numbers.map((number, index) => <li key={index}>{number}</li>);
  return(<ul>{listItems}</ul>)
}

rootElements.push(<NumberList numbers={[1,2,3,4,5]}/>)


function ListItem(props) {
  return <li>{props.value}</li>
}

function NumberList2(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number}/>
  )
  return(<ul>{listItems}</ul>)
}


rootElements.push(<NumberList2 numbers={[9,8,7,6]}/>)


function NumberList3(props) {
  return (
    props.numbers.map((number) =>
      <ListItem key={number.toString()} value={number}/>
    )
  )
}

rootElements.push(<NumberList2 numbers={[10,11,12,13]}/>)



root.render(rootElements)
