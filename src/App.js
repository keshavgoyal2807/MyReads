import React from 'react';
import {Route} from 'react-router-dom'
import Search from './Search'
import CurrentReading from './currRead'
import WantToRead from './wantRead'
import Read from './Read'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentlyReading:[],
      wantToRead:[],
      finishedReading:[]
    }
  }
  componentDidMount(){
      BooksAPI.getAll().then((books)=>{
        this.setState({
          currentlyReading : books.filter((book)=>{
            return(
                book.shelf === "currentlyReading"
            )
          }),
          wantToRead : books.filter((book)=>{
            return(
                book.shelf === "wantToRead"
            )
          }),
          finishedReading: books.filter((book)=>{
            return(
                book.shelf === "read"
            )
          })
        })
      })
  }
  changeshelfcurrread = (value,book)=>{
    console.log(book)
        BooksAPI.update(book,value).then((ans)=>{

          BooksAPI.getAll().then((books)=>{
            this.setState({
              currentlyReading : books.filter((book)=>{
                return(
                    book.shelf === "currentlyReading"
                )
              }),
              wantToRead : books.filter((book)=>{
                return(
                    book.shelf === "wantToRead"
                )
              }),
              finishedReading: books.filter((book)=>{
                return(
                    book.shelf === "read"
                )
              })
            })
          })
        })
  }
  render()
  {
      return(
        <div className='app'>
            <Route exact path="/" render={()=>{
          return(
            <div>
                        <div className="main-page-title">
                        <h1>MyReads</h1>
                        </div>
                        <div className='books'>
                            <CurrentReading currReading={this.state.currentlyReading} changeshelf={this.changeshelfcurrread} />
                            <WantToRead wantToRead={this.state.wantToRead} changeshelf={this.changeshelfcurrread} />
                            <Read Read={this.state.finishedReading } changeshelf={this.changeshelfcurrread} />
                        </div>
                        <div>
                          <Link to="/search" className='gotosearch'>Click</Link>
                        </div>
                      </div>
          )
        }} />
        <Route exact path="/search" render={()=>{
          return(
              <Search changeshelf={this.changeshelfcurrread}/>
          )
        }} />
        </div>
      )
  }
}

export default App