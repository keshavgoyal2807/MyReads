import React from 'react'

class Read extends React.Component{
    render()
    {
        return(
            <div className="book-shelf">
                    <h2 className="book-shelf-title">Read</h2>
                    <ol className="book-shelf-books">
                      {this.props.Read.map((book,index)=>{
                        return(
                          <li key={index}>
                          <div className='book-top'>
                          <div className="book-image" style={{backgroundImage:`url(${book.imageLinks.thumbnail})`}}>
                            <img src={book.imageLinks.thumbnail} style={{opacity:"0"}}  alt=""/>
                          </div>
                          <div className="book-shelf-change">
                                <select onChange={(e)=>{
                                  this.props.changeshelf(e.target.value,book);
                                }}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="read">Read</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                          <div className="book-title"><p>{book.title}</p></div>
                          <div className="book-author">{book.authors.map((author)=>{
                            return(
                              <p>{author}</p>
                            )
                          })}</div>
                          </li>
                        )
                      })}
                    </ol>
                    </div>
        )
    }
}
export default Read;