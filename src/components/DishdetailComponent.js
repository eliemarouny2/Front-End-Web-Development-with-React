import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm, } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class CommentForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
   }
   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      });
   }
   handleSubmit(values) {
      this.toggleModal();
      console.log(this.props.dishId);
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
   }

   render() {

      return (
         <>
            <Button color="secondary" onClick={this.toggleModal}><span><i className="fa fa-pencil" ></i></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}><strong>Submit Comment</strong></ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                        <Label for="rating" md={2}><strong>Rating</strong></Label>
                     </Row>
                     <Row className="form-group">
                        <Col md={{ size: 12, offset: 0 }}>
                           <Control.select model=".rating" className="form-control" name="rating" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                           </Control.select>
                        </Col>
                     </Row>

                     <Row className="form-group">
                        <Label for="author" md={3}><strong>Your Name</strong></Label>
                     </Row>
                     <Row className="form-group">
                        <Col md={{ size: 12, offset: 0 }} >
                           <Control.text model=".author" id="author" name="author"
                              className="form-control"
                              placeholder="Your Name"
                              validators={{
                                 required, minLength: minLength(3), maxLength: maxLength(15)
                              }} />
                           <Errors
                              className="text-danger"
                              model=".name"
                              show="touched"
                              messages={{
                                 required: 'Required',
                                 minLength: 'Must be greater than 2 characters',
                                 maxLength: 'Must be 15 or less characters',
                              }}
                           />
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Label for="comment" md={2}><strong>Comment</strong></Label>
                     </Row>
                     <Row className="form-group">

                        <Col md={12}>
                           <Control.textarea model=".comment" id="comment" name="comment" rows="10" className="form-control" />
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Col md={{ size: 10, offset: 0 }}>
                           <Button type="submit" color="primary">
                              Submit
                           </Button>
                        </Col>
                     </Row>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </>
      );
   }
}

function RenderDish({ dish }) {
   return (
      <div className="col-xs-12 col-md-5 m-1">
         <Card>
            <CardImg src={baseUrl + dish.image} alt="dish name" />
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
         </Card>
      </div>
   );
}



function RenderComments({ comments, addComment, dishId }) {
   return (
      <div className="col-xs-12 col-md-5 m-1">
         <h4>Comments</h4>
         {comments.map((ma) => {
            return (
               <ul className="list-unstyled" id={ma.id}>
                  <li id={ma.comment}>{ma.comment}</li>
                  <li id={ma.author}>--{ma.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(ma.date)))}</li>
               </ul>

            )
         })}
         <CommentForm dishId={dishId} addComment={addComment} />
      </div>
   );
}


const DishDetail = (props) => {
   if (props.isLoading) {
      return (
         <div className="container">
            <div className="row">
               <Loading />
            </div>
         </div>
      )
   }
   else if (props.errMess) {
      return (
         <div className="container">
            <div className="row">
               <h4>{props.errMess}</h4>
            </div>
         </div>
      )
   }
   else if (props.dish != null) {
      return (
         <div className="container">
            <div className="row">
               <Breadcrumb> <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
               </Breadcrumb>
               <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
               </div>

            </div>
            <div className="row" >
               <RenderDish dish={props.dish} />
               <RenderComments comments={props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id} />
            </div>



         </div>
      );
   }
   else {
      return (
         <div></div>
      );
   }
}

export default DishDetail;