import './App.css';
import 'antd/dist/antd.css';
import { Button, Divider, Layout, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import * as api from './lib/api';
import AddPost from './lib/AddPost';
import PostsTable from './lib/PostsTable';
import { fetchUsers, fetchPosts } from './lib/api'
import useUuid from './useUuid';

// YOU CANNOT CHANGE ANY COMPONENT INSIDE LIB FOLDER, JUST THIS ONE
// Before to start, please check the code inside lib folder just to get familiar with it
// With the minimum re-renders and not adding new useState, please do:
// 1. Fetch Users & pass it to AddPost sorted by name ascending
// 2. Fetch Posts & pass it to PostsTable (fulfill the table)
//  2.1. Fetch post and users must happen in parallel
// 3. Use Sort button to toggle sort order on post by users' name
// 4. Receive new entries from AddPost and add them to PostsTable
// 5. BONUS: Make the alert only appear once after clicking on the element

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  let userFecthedData = [];

  // ONLY MAKE YOUR CHANGES HERE

  let setAllUsers = (users) => {
    users.sort((a, b) => (a.name > b.name) ? 1 : -1);
    userFecthedData = users;
    setUsers(users);
  }

  let findUserName = (userId) => {
    let user = userFecthedData.find((item) => item.id === userId);
    return user ? user.name : '';
  }

  let setAllPosts = (posts) => {

    posts = posts.map((item) => {
      let userName = findUserName(item.userId);
      return {
        ...item,
        userName : userName
      }
    });
    setPosts(posts);
  }

  let fetchData = () => {
    let usersData = fetchUsers();
    let postsData = fetchPosts();

    Promise.all([usersData, postsData]).then((values) => {
      setAllUsers(values[0]);
      setAllPosts(values[1]);
    })

  } 
  useEffect(()=>{
    fetchData();
  }, [] );


  const records = posts;

  const handleNewPost = (newPost) => {};

  const handleSortClick = () => {};

  // FINISH YOUR CHANGES HERE

  // ---------------------------------------------------------------
  // DONT REMOVE THIS LINE, THIS IS FOR step 5, BONUS
  const [uuid, handleRecordsChange] = useUuid();

  return (
    <Layout>
      <Layout.Content className="content">
        <Typography.Title>
          innRoad Interview
          <small id="uuid" className="records"> (Last uiid: {uuid})</small>
        </Typography.Title>
        <AddPost users={users} onSubmit={handleNewPost} />
        <Divider />
        <Button onClick={handleSortClick} className="sortButton">
          Sorting Posts: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
        <PostsTable records={records} onRecordsChange={handleRecordsChange} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
