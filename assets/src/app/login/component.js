import React from 'react'
import { Redirect } from 'react-router'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import styles from './styles.module.css'

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {user: '', password: ''};

        this.handleUserChanged = this.handleUserChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChanged(event) {
        this.setState({user: event.target.value});
    }

    handlePasswordChanged(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state.user, this.state.password);
    }

    render () {
        const { isAuthorized, redirectTo, isAuthorizing } = this.props
        if (isAuthorized) {
            return <Redirect to={redirectTo}/>;
        }
        return (
            <div className={styles.login}>
                <div className={styles.loginContainer}>
                    <Form disabled={isAuthorizing} onSubmit={this.handleSubmit}>
                        <div className={styles.loginTitle}>Admin</div>
                        <FormGroup>
                            <Label for="loginUser">User</Label>
                            <Input type="text" name="loginUser" id="loginUser" placeholder=""
                                value={this.state.user} onChange={this.handleUserChanged} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginPass">Password</Label>
                            <Input type="password" name="loginPass" id="loginPass" placeholder=""
                                value={this.state.password} onChange={this.handlePasswordChanged} />
                        </FormGroup>
                        <Button className={styles.submit} type="submit" color="primary" onClick={this.handleSubmit} disabled={isAuthorizing}>
                            {isAuthorizing ?
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={18}
                                    color={'#FFF'}
                                    loading={isAuthorizing}/> : "Log In"}
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
