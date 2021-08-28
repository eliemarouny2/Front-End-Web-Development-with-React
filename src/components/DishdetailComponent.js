import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

   constructor(props) {
      super(props);
   }


   render() {
      const dish = this.props.dish;




      if (dish != null) {
         return (
            <div className="row" id={dish.id}>
               <div className="col-xs-12 col-md-5 m-1">
                  <Card>

                     <CardImg src={dish.image} alt="dish.name" />

                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>

                  </Card>
               </div>

               <div className="col-xs-12 col-md-5 m-1">
                  <h4>Comments</h4>
                  {dish.comments.map((ma) => {
                     return (
                        <ul className="list-unstyled" id={dish.id}>
                           <li >{ma.comment}</li>
                           <li >--{ma.author}, {ma.date}</li>
                        </ul>
                     )
                  })}
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
}


export default DishDetail;