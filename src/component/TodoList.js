import { useState, useMemo } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css"


const TodoList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const getSearchResult = () => { //함수 getSearchResult는 현재 입력한 검색어인
        return search === "" //search가 빈문자열 ""이면 
        ? todo //todo를 그대로 반환
        : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase())); //그렇지 않으면 todo배열에서 search의 내용과 일치하는 아이템만 필터링해 반환
    }

    const analyzeTodo = useMemo(() => {
        // console.log("analyzeTodo 함수 호출")
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);
    const {totalCount, doneCount, notDoneCount} = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
            <div>
                <div>총개수 : {totalCount}</div>
                <div>완료된 할 일 : {doneCount}</div>
                <div>아직 완료하지 못한 할 일 : {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar" 
                placeholder="검색어를 입력하세요"
            />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    )
}

export default TodoList;