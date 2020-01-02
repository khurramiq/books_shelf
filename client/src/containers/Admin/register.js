import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: '',
    }

    componentDidMount(){
        this.props.dispatch(getUsers());
    }

    hendleInputEmail = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    hendleInputPassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    hendleInputName = (event) => {
        this.setState({
            name:event.target.value
        })
    }

    hendleInputLastname = (event) => {
        this.setState({
            lastname:event.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error, try again'})
        }else{
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
                error: '',
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ error:'' });
        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
        },this.props.user.users));
    }

    showUsers = (user) => (
        user.users ?
            user.users.map(item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        :null
    )


    render() {
        let user = this.props.user;
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.hendleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.hendleInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.hendleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.hendleInputPassword}
                        />
                    </div>

                    <button type="submit">Add user</button>

                    <div className="error">
                        { this.state.error }
                    </div>
                    
                </form>
                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.showUsers(user) }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);