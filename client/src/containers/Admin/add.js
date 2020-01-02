import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBood, clearNewBook } from '../../actions';

class AddBook extends Component {

    state = {
        formdata:{
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }

    handleInput = (event, name) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData[name] = event.target.value;
        this.setState({
            formdata:newFormData
        })
    }

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Cool !! <Link to={`/books/${book.bookId}`}>
                    Click the link to see the post
                </Link>
            </div>
        :null
    )

    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(addBood({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }));
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewBook());
    }

    render() {
        let data = this.state.formdata;
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={data.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                            />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={data.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                        />
                    </div>

                    <textarea
                        value={data.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter pages"
                            value={data.pages}
                            onChange={(event)=>this.handleInput(event,'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={data.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={data.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        />
                    </div>

                    <button type="submit">Add review</button>
                    {
                        this.props.books.newbook ?
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(AddBook);