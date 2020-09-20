import React from 'react';
// get our fontawesome imports
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { getAllMessages, addMessage, getMessageByID } from '../actions';
import { Button, Modal } from 'react-bootstrap';


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            show: false,
            detail:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleClose = () => this.setState({ show: false });
    handleShow = (id) => {
        this.props.getMessageByID(id)
        this.setState({ show: true });
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
        console.log(this.state)
    }

    handleMessageDetail(event) {
        this.setState({ detail: event.target.value });
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();
        var msg = { Sender: "5f63d7fb30f10f3d8c2675fb", MessageContent: this.state.value };
        this.props.addMessage(msg);
        this.setState({ value: '' });
        //alert('A name was submitted: ' + this.state.value);
    }
    renderMessages(messages) {
        if (messages) {
            if (messages.length === 0) {
                return <div>there are no messages</div>
            }
            return messages.map((msg) => (<div className="container">
                <div className="row">
                    <div className="col-12 bg-light">
                        <b>  {msg.Sender.Username} </b>
                        <div>
                            {msg.MessageContent}
                        </div>
                        <li className="list-inline-item">
                            <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        </li>
                        <li className="list-inline-item">
                            <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip"
                                data-placement="top" title="Edit" onClick={() => { this.handleShow(msg._id) }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        </li>
                        
                        <div className="mt-2">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group ">
                                    <input className="form-control"
                                        type="text"
                                        id="exampleInput"
                                        placeholder="Reply"
                                        value={this.state.value}
                                        onChange={this.handleChange} />
                                <button type="submit" className="btn btn-primary mt-2">Reply</button>
                                </div>
                            </form>
                            </div>
                            {this.renderReplies(msg.Replies)}
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control"
                            type="text"
                            id="exampleInput"
                            placeholder="Enter your message"
                            value={this.state.detail}
                            onChange={()=>{this.handleMessageDetail(this.props.msgsDetails?.MessageContent)}}>
                            </input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>


            </div>))
        }
    }

    renderReplies(replies) {
        if (replies) {
            if (replies.length !== 0)
           {     // return <div> there are no replies</div>
            return replies.map((item) => (
                
                <div className="container">
                    <div className="row">
                        <div className="col-12 bg-light">
                            <b>  {item.Sender.Username} </b>
                            <div>
                                {item.ReplyContent}
                            </div>
                            <li className="list-inline-item">
                                <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                            </li>
                            <li className="list-inline-item">
                                <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip"
                                    data-placement="top" title="Edit" onClick={() => { this.handleShow(item._id) }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                            </li>
                            <div className="mt-2">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group ">
                                    <input className="form-control"
                                        type="text"
                                        id="exampleInput"
                                        placeholder="Reply"
                                        value={this.state.value}
                                        onChange={this.handleChange} />
                                <button type="submit" className="btn btn-primary mt-2">Reply</button>
                                </div>
                            </form>
                            </div>
                            {/* {this.renderReplies(msg.Replies)} */}
                        </div>
                    </div>
                </div>

            ))
        }
    }
        return null;
    }

    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">

                    {/* <button className="btn btn-success mb-4 mt-2" >Add Message</button> */}


                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                id="exampleInput"
                                placeholder="Enter your message"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Message</button>
                    </form>

                </div>
                <div className="row">
                    {this.renderMessages(this.props.msgsList)}
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.getAllMessages();
    }

}

const mapStateToProps = (state) => ({
    msgsList: state.msgs.list,
    msgsDetails: state.msgs.details,
});

const mapDispatchToProps = {
    getAllMessages,
    addMessage,
    getMessageByID
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
