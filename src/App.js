import { useCallback, useRef, useReducer} from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
// import TestComp from './component/testComp';



const mockTodo = [
  {
    id : 0,
    isDone: false,
    content: "React 공부하기",
    createdDate : new Date().getTime(),
  },
  {
    id : 1,
    isDone: false,
    content: "빨래 널기",
    createdDate : new Date().getTime(),
  },
  {
    id : 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate : new Date().getTime(),
  },
];

function reducer(state, action) {
  //상태 변화 코드
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": { //토글
      return state.map((it) => 
        it.id === action.targetId ?
        {
          ...it,
          isDone: !it.isDone
        }
        : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default :
      return state;

  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  // const [todo, setTodo] = useState(mockTodo); useState -> useReducer 변경

  const idRef = useRef(3);

  const onCreate = (content) => { //할 일 생성을 위한 함수
      dispatch({
        type : "CREATE",
        newItem: {
          id: idRef.current,
          content,
          isDone: false,
          createdDate: new Date().getTime(),
        }
      });
      idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type : "UPDATE",
      targetId,
    })
  },[])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type : "DELETE",
      targetId,
    });
  },[]);

  return (
    <div className="App">
      {/* <TestComp /> */}
      <Header />
      <TodoEditor onCreate = {onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
