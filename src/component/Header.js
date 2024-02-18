import React from "react";
import "./Header.css"

const Header = () => {
    return <div className="Header">
        <h3>오늘은 📅</h3>
        <h1>{new Date().toDateString()}</h1>
    </div>
}
export default React.memo(Header);

//현재의 날짜와 시간을 저장하는 객체를 만들고, toDateString 메서드를 이용해 날짜를 문자열로 표시