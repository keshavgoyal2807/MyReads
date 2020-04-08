import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            books:[]
        }
    }
    searchBooks = (e)=>{
        BooksAPI.search(e.target.value).then((bks)=>{
            console.log(bks);
            this.setState({
                books:bks
            })
        })
    }
    render(){
        return(
            <div className="search-page">
                <div className="search-bar">
                    <Link to="/" className="search-bar-back"></Link>
                    <input type="text" placeholder="Search By Title or Author" className="search-bar-input" onChange={this.searchBooks}></input>
                </div>
                <div className="search-results">
                    {this.state.books.map((book)=>{
                        {/* console.log(book) */}
                        return(
                            <div className="book">
                            <div className='book-top'>
                            <div className="book-image" style={{backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail})`}}>
                                <img src={book.imageLinks && book.imageLinks.thumbnail} style={{opacity:"0"}}  alt=""/>
                            </div>
                            <div className="book-shelf-change">
                                <select onChange={(e)=>{
                                  this.props.changeshelf(e.target.value,book);
                                }}>
                                    <option value="move" >Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                    
                          <div className="book-title"><p>{book.title}</p></div>
                          <div className="book-author">{book.authors && book.authors.map((author)=>{
                            return(
                              <p>{author}</p>
                            )
                          })}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Search