import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../features/categoriesReducer";
import { createNews } from "../../features/newsReducer";
import { deleteUser, getUsers } from "../../features/usersReducer";
import "./styles.css";

const Panel = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.news.loading);
  const categories = useSelector((state) => state.categories.categories);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null)
  const [categoryText, setCategoryText] = useState('')
  const [categoryID, setCategoryID] = useState(null)
  const [titleText, setTitleText] = useState('')
  const [newsText, setNewsText] = useState('')
  const [list, setList] = useState(false);
  const [newsCreate, setNewsCreate] = useState(false);
  const [categoryCreate, setCategoryCreate] = useState(false);

  const searcher = users.filter(
    (item) => item.login.toLowerCase().indexOf(text.toLowerCase()) !== -1
  );

  function handleText(e) {
    setText(e.target.value);
  }

  function handleCategoryText(e) {
    setCategoryText(e.target.value);
  }

  function handleTitleText(e) {
    setTitleText(e.target.value)
  }

  function handleNewsText(e) {
    setNewsText(e.target.value)
  }

  function handleBanUser(id) {
    dispatch(deleteUser(id));
  }

  function handleUsersList() {
    setList(!list);
    setCategoryCreate(false);
    setNewsCreate(false);
  }

  function handleCreateNews() {
    setNewsCreate(!newsCreate);
    setCategoryCreate(false);
    setList(false);
  }

  function handleCreateCategoryButton() {
    dispatch(createCategory(categoryText))
    setCategoryText('')
  }

  function handleCreateNewsBtn() {
    dispatch(createNews({ img, titleText, newsText, categoryID}))
    setTitleText('')
    setNewsText('')
  }

  function handleCreateCategory() {
    setCategoryCreate(!categoryCreate);
    setNewsCreate(false);
    setList(false);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="panel">
      {loading && (
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
      <div className="admin_title">???????????? ????????????????????????????</div>
      <div className="admin_tools">
        <div className="users_list">
          <button className="users_list_button" onClick={handleUsersList}>
            ???????????? ??????????????????????????
          </button>
          <div>
            {list && (
              <div className="users_map">
                <input
                  onChange={handleText}
                  value={text}
                  className="users_search"
                  type="text"
                  placeholder="?????????? ??????????????????????????..."
                />
                {searcher &&
                  searcher.map((element, index) => {
                    return (
                      <div key={index} className="one_user">
                        <div>{index + 1})</div>
                        <div>{element.login}</div>
                        <button
                          onClick={() => handleBanUser(element._id)}
                          className="ban_user"
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div>
          <button className="create_news" onClick={handleCreateNews}>
            ???????????????? ??????????????
          </button>
          {newsCreate ? (
            <div className="create_news_form">
              <div>???????????????? ????????:</div>
              <input name="assets" type="file" onChange={(e) => setImg(e.target.files[0])} />
              <div>??????????????????:</div>
              <select onChange={(e) => setCategoryID(e.target.value)} type="text">
                <option disabled>???????????????? ??????????????????</option>
                {categories.map((element, index) => {
                  return <option key={index} value={element._id}>{element.name}</option>;
                })}
              </select>
              <div>??????????????????:</div>
              <input onChange={handleTitleText} value={titleText} type="text" />
              <div>??????????:</div>
              <textarea onChange={handleNewsText} value={newsText} type="text" />
              <button onClick={handleCreateNewsBtn} className="create_news_btn">??????????????????</button>
            </div>
          ) : null}
        </div>
        <div>
          <button className="create_category" onClick={handleCreateCategory}>
            ???????????????? ??????????????????
          </button>
          {categoryCreate ? (
          <div className="category_create_form">
            <div>???????????????? ??????????????????:</div>
            <input value={categoryText} onChange={handleCategoryText} type="text" />
            <button onClick={handleCreateCategoryButton} className="create_category_btn">??????????????</button>
          </div>) : null}
        </div>
      </div>
    </div>
  );
};

export default Panel;
