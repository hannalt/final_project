import React, {useState} from 'react';
import Sketch from 'react-p5';
import './AppDark.css';
import DarkMode from './components/DarkMode';

const axios = require('axios');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    username: '',
    password: '',
    question: '',
    answer: '', 
    attempting_answer: '',
    loggedin: false,
    msg: 'Put in your info!',
    register: false, 
    retrieving: false,
    joke: 'placeholder',
    playing: false
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  //Check that username and password pass requirements
  submitRegister = async (event) =>{
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;
    const question = this.state.question;
    const answer = this.state.answer;
    
    const response = await axios.get('/api');
    const usernames = response.data.map((obj)=> {
      return obj.username
    });
   
    
    if (usernames.includes(username)) {
      this.state.msg = 'That username is taken. Please try another!';
      this.resetUserInputs();
      return;
    };

    if (username.indexOf(' ') >= 0 ||password.indexOf(' ') >= 0) {
      this.state.msg = 'No whitespace allowed in username and password. Please try again!';
      this.resetUserInputs();
      return;
    };

    if (username === '' || password === '' || answer === '' || question === '') {
      this.state.msg = 'You have to fill out all fields. Please try again!';
      this.resetUserInputs();
      return;
    }

    this.state.msg = 'Put in your info!';
    const payload = {
      username: this.state.username,
      password: this.state.password,
      question: this.state.question, 
      answer: this.state.answer
    }
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log("data has been sent");
        this.resetUserInputs();
        //call do something if needed
      })
      .catch(()=> {
        console.log("error");
      })
  }
  resetUserInputs = () => {
    this.setState({
      username: '',
      password: '',
      question: '',
      answer: ''
    })
  }
  componentDidMount  = () => {
    this.dosomething();
  }
  //in example this gets an updated list of blog posts each time one is submitted
  dosomething = () => {
    console.log("do something")
    //do something everytime the page needs to load
  }

  //displayBlogPost 
  //gets called in new div in renders return to make a list of post. I don't think we need this functionality

  submitLogin = async (event) =>{
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const response = await axios.get('/api');
    const users = response.data.map((obj)=> {
      return {
        username: obj.username,
        password: obj.password,
        question: obj.question,
        answer: obj.answer
      }
    });
    if (username === '' || password === '' ) {
      this.state.msg = 'You have to fill out all fields. Please try again!';
      this.resetUserInputs();
      return;
    }
    const same_username = users.find(user => user.username === username);
    if (same_username == undefined) {
      this.state.msg  = 'Wrong username. Try again or make a new account!';
      this.resetUserInputs();
      return;
    }
    
    console.log('same_user: ', same_username);
    if (same_username.password === password) {
      this.getJoke();
      this.setState({
        loggedin: true, 
        username: same_username.username,
        password: same_username.password,
        question: same_username.question,
        answer: same_username.answer
      });
      console.log('Login state:', this.state)
      this.state.msg  = 'You are logged in!';
    } else {
      this.state.msg = 'That was not correct. Try again!';
      this.resetUserInputs();
    }
  }

  goToRegister= (event)=>{
    event.preventDefault();
    this.setState({
      register: true
    });
    this.resetUserInputs();
  }
  
  goToLogin= (event)=>{
    event.preventDefault();
    this.setState({
      register: false,
      retrieving: false,
      loggedin: false,
      playing:false
    });
    this.resetUserInputs();
  }

  
  getPassword = async (event) => {
    event.preventDefault();
    
    const username = this.state.username;
    this.state.retrieving = true;
    
    if (username === '' ){
      this.state.msg = "Please go back to login, put in your username, then click the 'Get your Password' button again."
      this.resetUserInputs();
      return
    }
    this.state.msg = 'Put in your info!';
    
    const response = await axios.get('/api');
    const users = response.data.map((obj)=> {
      return {
        username: obj.username,
        password: obj.password, 
        question: obj.question, 
        answer: obj.answer
      }
    });
    
    const same_username = users.find(user => user.username === username);
    
    if (same_username === undefined) {
      this.state.msg = "We don't have a user by that name. Go back and retry it or make a new account."
    }
    
    //this.resetUserInputs();
    this.setState({
      question: same_username.question,
      answer: same_username.answer,
      password: same_username.password
    });
  }
  resetAttempting = () => {
    this.setState ({
      attempting_answer: ''
    })
  }

  submitRetrieving = async (event) => {
    event.preventDefault();
    console.log(event);
    const attempting_answer = event.target[0].value;
    console.log(attempting_answer);
    console.log(this.state);
    if (this.state.answer === attempting_answer){
      this.state.msg = 'Good job! Your password is ' + this.state.password + '. Go back to Login!'
      this.resetUserInputs();
    } else {
      this.state.msg = 'That was not right. Try again!';
      event.target[0].value = '';
      this.resetAttempting();
    }
  }

  //https://github.com/15Dkatz/official_joke_api
  getJoke = async (event) => {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const punchline = response.data.punchline;
    const setup = response.data.setup;
    this.setState({
      joke: setup + ' '  + punchline
    });
  }

 
  onPlayGame = (event) => {
    event.preventDefault();
    this.setState({
      playing:true
    })
    
  }

  canvasInfo = {
    socket: undefined, 
   
  }

  setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(600, 600);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    //this.canvasInfo.socket = io.connect('http://localhost:4000')
  }

  draw = (p5) => {
    p5.background("rgb(100%,0%,10%)");
  }

  //add the recovery question and image thing to the form
  //Change what you return if they are logged in or not
  render() {
    console.log(this.state);
    
    if(this.state.playing) {
      return (
        <div className="App">
          <Sketch setup={this.setup} draw={this.draw} className = "App"/>
        </div>
      )
  
    }


    if (this.state.loggedin) {
      return(
          
          <div className ="app">
            <h1>Welcome to my Game!</h1>
            <DarkMode/>
            <div className="menu">
              <button onClick= {this.goToLogin}>Log Out</button>
            </div>
            <h3>Before you play here's a joke!</h3>
            <p>{this.state.joke}</p>
            <button onClick = {this.getJoke}>New Joke</button><br/>
            <button onClick = {this.onPlayGame}>Play the game!</button>
          
          </div>
       
        
      )
    }

    if(this.state.retrieving) {
      return(
        
          <div className ="app">
            <h2>Answer your security question</h2>
            <p>{this.state.question}</p>
            <form onSubmit = {this.submitRetrieving}>
              <div className="form-group">
                <label>Answer:<br></br></label>
                <input type="text"
                  name="attempting_answer"
                  value = {this.state.attempting_answer}
                  onChange = {this.handleChange}
                  placeholder="Fluffy"/>
              </div>
              <p>{this.state.msg}</p>
              <button>Submit</button>
              <div>
                <p>Got it?</p>
                <button onClick= {this.goToLogin}>Log in!</button>
              </div>
            </form>
          </div>
        
      )
    }
    if (!this.state.loggedin && !this.state.register) {
      return (
        
          <div className ="app">
            <h2>Login</h2>
            <form onSubmit = {this.submitLogin}>
              <div className="form-group">
                <label>Username:<br></br></label>
                <input type="text"
                  name="username"
                  placeholder="john_smith"
                  value = {this.state.username}
                  onChange = {this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Password:<br></br></label>
                <input type="text"
                  name="password" 
                  placeholder="unsafe123"
                  value = {this.state.password}
                  onChange = {this.handleChange}/>
              </div>
              <p>{this.state.msg}</p>
              <button>Log in</button>
              <div>
                <p>Don't have an account?</p>
                <button onClick= {this.goToRegister}>Make one!</button>
              </div>
              <div>
                <p>Forgot your info? Put in your username we'll help!</p>
                <button onClick= {this.getPassword}>Get your password!</button>
              </div>
            </form>
          </div>

        
        
      )
    }

    if (!this.state.loggedin && this.state.register){
      return (
        
          <div className ="app">
            <h2>Make a User Profile</h2>
            <form onSubmit = {this.submitRegister}>
              <div className="form-group">
                <label>Username:<br></br></label>
                <input type="text"
                  name="username"
                  placeholder="john_smith"
                  value = {this.state.username}
                  onChange = {this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Password:<br></br></label>
                <input type="text"
                  name="password" 
                  placeholder="unsafe123"
                  value = {this.state.password}
                  onChange = {this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Security Question:<br></br></label>
                <input type="text"
                  name="question"
                  placeholder="Name of my first cat?"
                  value = {this.state.question}
                  onChange = {this.handleChange}/>
              </div>
              <div className="form-group">
                <label>Answer:<br></br></label>
                <input type="text"
                  name="answer"
                  placeholder="Fluffy"
                  value = {this.state.answer}
                  onChange = {this.handleChange}/>
              </div>
              <p>{this.state.msg}</p>
              <button>Create</button>
              <div>
                <p>Have an account?</p>
                <button onClick= {this.goToLogin}>Log in!</button>
              </div>
            </form>
          </div>

       
        
      )
    } 
  }
}
export default App;
