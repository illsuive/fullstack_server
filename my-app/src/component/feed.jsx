import '../style/feed.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchPost} from '../../store/postReducer'
import { useDispatch , useSelector } from 'react-redux'
  const Feed = () => {
    let post = useSelector((state)=> state.post.data)
    let dispatch = useDispatch()
    let loading = useSelector((state)=> state.post.loading)
    let error = useSelector((state)=> state.post.error)
    // let token = useSelector((state)=> state.user.token)
    let token = localStorage.getItem(`${import.meta.env.VITE_JWT}`)
    let navigate = useNavigate()

      
      


    useEffect(()=>{
      if(!token){
        navigate("/Login")
      }
    })


  useEffect(()=>{
      dispatch(fetchPost(token))
  },[dispatch, token])
  
  if(error){
    return <h1 className='error'>Due to some reason error arise</h1>
  }
  
  if(loading){
    return <h1 className='error'>Loading.....</h1>
  }

  
  
  return (
    <div className="feed-container">
      <h1>All POSTS</h1>
      <div className="card-grid">
        {post.map((e , i) => (
          <div key={i} className="card-wrapper">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={e.imgUrl} alt={e.title} />
              <Card.Body>
                <Card.Title>{e.title}</Card.Title>
                <Card.Text>
                  {e.title.substring(0, 50)}... 
                </Card.Text>
                <Button variant="primary">View Post</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed;