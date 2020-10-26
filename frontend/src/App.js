import React, {useState} from 'react';
import logo from './shopping-list.png';
import './dist/App.css';
import axios from 'axios';

function App() {

  const [todolist, setTodolist] = useState([]);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  
    const removeTodo = index => {
      const newTodos = [...todolist];
      newTodos.splice(index, 1);
      setTodolist(newTodos);

      const options = {
        method: 'delete',
        url: 'http://localhost:4000/deleteTodos',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          list: newTodos
        }
      }

      console.log(options)
      console.log(newTodos)

      axios(options)
      .then((response) => {
        console.log(response);        
      })
      .catch((error) => console.error(error))

    };

    const handleLogin = e => {
      //returns 'false' to prevent default handle behavior
      e.preventDefault();
      //blocking(?)
      console.log(name);
      if (!name) return;
      setPassword("");
      //retrieve todos based on name
  
      const option = {
        method: 'post',
        url: 'http://localhost:4000/getTodos',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          password: password
        }
      }
      axios(option)
      .then((response) => {
        console.log(response.data[0].todos);
        setTodolist(response.data[0].todos);
        
      })
      .catch((error) => console.error(error))
  
    };

    const handleSignup = e => {
      //returns 'false' to prevent default handle behavior
      e.preventDefault();
      //blocking(?)
      console.log(name);
      if (!name) return;
      
      //retrieve todos based on name
  
      const option = {
        method: 'post',
        url: 'http://localhost:4000/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          password: password
        }
      }
      axios(option)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.error(error))

      const option2 = {
        method: 'post',
        url: 'http://localhost:4000/getTodos',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          password: password
        }
      }
      axios(option2)
      .then((response) => {
        console.log(response.data[0].todos);
        setTodolist(response.data[0].todos);
      })
      .catch((error) => console.error(error))

      setPassword("")
  
    };

    const handleDeleteAccount = e => {
      //returns 'false' to prevent default handle behavior
      e.preventDefault();
      //blocking(?)
      console.log(name);
      if (!name) return;
      
      //retrieve todos based on name
  
      const option = {
        method: 'post',
        url: 'http://localhost:4000/deleteAccount',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          password: password
        }
      }
      axios(option)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.error(error))

      setName("")
      setPassword("")
      setTodolist([])
  
    };

    
    
  return (
    <div className="App">
      <header className="App-header">

        <div className="left">
          <img src={logo} className="App-logo" alt="logo" />
          
          <h2>A really sad to-do app</h2>

          <div className="login-form">
            <form >
            <input
              type="text"
              className="username"
              placeholder="Username"
              value={name}
              onChange={e => {
                setName(e.target.value)
                //console.log(name)
              }}
            />
            <input
              type="text"
              className="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              //onChange={e => setName(e.target.value)}
            />
            <button type="submit" onClick={handleLogin}>Login</button>
            <button type="submit" onClick={handleSignup}>Sign up</button>
            <button type="submit" onClick={handleDeleteAccount}>Delete Account</button>
            </form>
            </div>

            <p>Instructions for user:</p>
            <p>Fill in username and password for all operations</p>
            <p>After logging in, you may start adding/deleting todos</p>

          </div>

        <div className="right">
        <SubmitForm />
        <div className="todo-list">
          {todolist.map((todo, index) => (
            <Todo 
            key={index} 
            index={index} 
            todo={todo} 
            removeTodo={removeTodo}
            />
          ))}
		    </div>
      </div>
      </header>
      
    </div>
  );

  function SubmitForm() {
    const [todo, setTodo] = useState("");

    const handleSubmit = e => {
      const newTodos = [...todolist, todo];
      setTodolist(newTodos);

      const options = {
        method: 'post',
        url: 'http://localhost:4000/submitTodos',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          name: name,
          list: newTodos
        }
      }

      console.log(options)
      console.log(newTodos)

      axios(options)
      .then((response) => {
        console.log(response);        
      })
      .catch((error) => console.error(error))

    };

    return(
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write new to-do here"
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
      <button type="submit">Submit</button>
      </form>
    );    

      }
  

  function Todo({ todo, index, removeTodo }) {

    return (
      <div className="todo">
        {todo}
        <div>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      </div>
    )
  }

 

}





export default App;
