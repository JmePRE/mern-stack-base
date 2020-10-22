import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [todolist, setTodolist] = useState([]);
  //const [name, setName] = React.useState("");
  //const [password, setPassword] = React.useState("");
  /*
  axios.get('http://localhost:4000/')
    .then(results => {
      console.log("retrieved");
      console.log(results.todos);
      setTodolist(results.todos);
    })
    .catch(error => console.error(error))
    */
    const completeTodo = index => {
      //this time, copy todo again, but we're not adding anything
      const newTodos = [...todolist];
      if (newTodos[index].isCompleted === true) {
        newTodos[index].isCompleted = false;
      } else {
        newTodos[index].isCompleted = true;
      };
      //finally, update
      //note: never change value of newtodos directly, always access it through a getter function like so
      setTodolist(newTodos);
    };
  
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
          //name: name,
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

    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginForm />
        <SubmitForm />
        <div className="todo-list">
          {todolist.map((todo, index) => (
            <Todo 
            key={index} 
            index={index} 
            todo={todo} 
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            />
          ))}
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
          //name: name,
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
        className="submit"
        value=""
        onChange={e => setTodo(e.target.value)}
      />
      <button type="submit">Submit</button>
      </form>
    );

            

      }
  

  function LoginForm() {
    //local state for the todo form
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    const handleLogin = e => {
      //returns 'false' to prevent default handle behavior
      e.preventDefault();
      //blocking(?)
      console.log(name);
      if (!name) return;
      setName("");
      //retrieve todos based on name
  
      //ISSUE: body not being sent over
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

      //console.log(name);
      //axios.post('http://localhost:4000/getTodos', {name, password})
      axios(option)
      .then((response) => {
        console.log(response.data[0].todos);
        setTodolist(response.data[0].todos);
        
      })
      .catch((error) => console.error(error))
  
    };
  
    //displays form
    return (
      <div className="login-form">
      <form onSubmit={handleLogin}>
      <input
        type="text"
        className="username"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        className="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        //onChange={e => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
      </form>
      
      </div>
    );
  }

  function Todo({ todo, index, completeTodo, removeTodo }) {

    return (
      <div className="todo" style={{ textDecoration: (todo.isCompleted) ? "line-through" : ""}}>
        {todo}
        <div>
          <button onClick={() => completeTodo(index)}>{(todo.isCompleted) ? "Mark Uncomplete" : "Mark Complete"}</button>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      </div>
    )
  }

 

}





export default App;
