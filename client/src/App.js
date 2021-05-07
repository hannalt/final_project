import React, {useState} from 'react';
import Sketch from 'react-p5';
import './AppDark.css';
import DarkMode from './components/DarkMode';
import Blob from './blob';
import socketIOClient from "socket.io-client";
const axios = require('axios');
//let server = app.listen(3000);
//let io = require('socket.io')(server);



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
        //console.log("data has been sent");
        this.resetUserInputs();
        //call do something if needed
      })
      .catch(()=> {
        //console.log("error");
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
    //console.log("do something")
    //do something everytime the page needs to load
  }

  //displayBlogPost 
  //gets called in new div in renders return to make a list of post. I don't think we need this functionality

  submitLogin = async (event) =>{
    event.preventDefault();
    console.log('submitlogin')
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
    
    //console.log('same_user: ', same_username);
    if (same_username.password === password) {
      this.getJoke();
      this.setState({
        loggedin: true, 
        username: same_username.username,
        password: same_username.password,
        question: same_username.question,
        answer: same_username.answer
      });
      //console.log('Login state:', this.state)
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
    //console.log(event);
    const attempting_answer = event.target[0].value;
    //console.log(attempting_answer);
    //console.log(this.state);
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
    blob: undefined,
    zoom: 1,
    blobs:[],
    counter: 30,
    timer: undefined,
    interval: undefined
  }

  timeIt = () => {
    if (this.state.playing) {
      if (this.canvasInfo.counter <= 0) {
        this.canvasInfo.counter = 0
      } else {
        this.canvasInfo.counter--;
      }
      
      this.canvasInfo.timer.html(this.canvasInfo.counter)
    }
    
  }

  setup = (p5) => {
    this.canvasInfo.timer = p5.select('#timer');
    this.canvasInfo.timer.html(this.canvasInfo.counter);
    this.canvasInfo.interval = setInterval(this.timeIt, 1000);

    let width = 600;
    let height = 600;
    let xyz = p5.createCanvas(width, height);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    let blobs = [];
    let dumb_num = 200;
    for (let i = 0; i < dumb_num; i++) {
      blobs[i] = new Blob(p5, p5.random(3,5),p5.random(-600, 600), p5.random(-600, 600), i,   "no user");
      
    }
    this.canvasInfo.blobs = blobs;
    
    this.canvasInfo.blob = new Blob(p5, 13, p5.random(width), p5.random(height), 6573454, this.state.username);
    console.log(this.canvasInfo.blob);
  }

  draw = (p5) => {
    if (this.canvasInfo.blob.alive){
    
      p5.background(0); 
      p5.translate(p5.width/2, p5.height/2);
      let new_scale = 64 / this.canvasInfo.blob.r;
      this.canvasInfo.zoom = p5.lerp(this.canvasInfo.zoom, new_scale, 0.02);
      p5.scale(this.canvasInfo.zoom);
      p5.translate(-this.canvasInfo.blob.pos.x, -this.canvasInfo.blob.pos.y);
      for (let i = this.canvasInfo.blobs.length-1; i >= 0; i--) {
        let id = this.canvasInfo.blobs[i].id;
        //This is how you avoid drawing/eating yourself.
        
        if (id !== this.canvasInfo.id){
          //This checks if blob has eaten blob[i] 
          
          if (this.canvasInfo.blob.eats(this.canvasInfo.blobs[i])){
            this.canvasInfo.blobs.splice(i,1); 
            this.canvasInfo.blobs.push(new Blob(p5, p5.random(1,5),p5.random(-600, 600), p5.random(-600, 600), i, "no user"));
          } else {
            //If it isn't eaten it gets drawn onto the screen using p5 functions
            this.canvasInfo.blobs[i].show()  
  
          }
            
        } 
      }
      this.canvasInfo.blob.show();
      //blob only moves toward your mouse if it is pressed.
      if (p5.mouseIsPressed){
        this.canvasInfo.blob.update();
      }
      //keeps it in bounds
      this.canvasInfo.blob.constrain();

      if (this.canvasInfo.counter === 0) {
        this.canvasInfo.blob.alive = false;
      }
    } else {
      p5.background(0);
      p5.fill(this.canvasInfo.blob.red, this.canvasInfo.blob.green, this.canvasInfo.blob.blue);
      p5.textSize(60);
      p5.textAlign(p5.CENTER);
      p5.text('Game Over',300, 300);
      p5.textSize(30);
      p5.text('Your Score:', 300, 400);
      p5.text(Math.round(this.canvasInfo.blob.r), 300, 450)
    }
  }

  goBack = (event) => {
    event.preventDefault();
    clearInterval(this.canvasInfo.interval)
    this.setState({
      register: false,
      retrieving: false,
      loggedin: true,
      playing:false
    });
    this.canvasInfo.counter = 30;
    
    
  }

  //add back button from game 
  render() {
    
    if(this.state.playing) {
      return (
        <div className="App">
          <h1>Play the Game!</h1>
          <p>You have these many seconds remaining:</p>
          <h3 id="timer">2:00</h3>
          <p>Eat as many balls as you can before time runs out!</p>
          <Sketch setup={this.setup} draw={this.draw} className = "App"/>
          <button onClick= {this.goBack}>Go Back</button>
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
