import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css';
import Pagination from './components/Pagination';
import Posts from './components/Posts';


function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPosts, setCurrentPosts] = useState([])
  const [postsPerPage] = useState(10)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      console.log(res);
      setPosts(res.data)
    } catch (error) {
      console.log('please try again');
    } finally {
      setLoading(false)
    }
   
  }

  useEffect(() => {
   fetchPosts()
  }, [])

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPostArr = posts.slice(indexOfFirstPost, indexOfLastPost)
    setCurrentPosts(currentPostArr)
  }, [currentPage, postsPerPage, posts])
  //依赖项有state都要放，因为一个state改变就要rerendering

  //change page
  const updateActivePage = (number) => setCurrentPage(number)
  
  return (
    <div className='container'>
      <h1 className='title'>My Blog</h1>
      <Posts currentPosts={currentPosts} loading={loading}/>
      <Pagination 
      postsPerPage={postsPerPage}
      totalPosts={posts.length}
      currentPage={currentPage}
      // setCurrentPage={setCurrentPage}
      updateActivePage={updateActivePage}
      />
    </div>
  );
}

export default App;
