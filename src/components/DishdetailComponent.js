import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {




   render() {
      const dish = this.props.dish;

      if (dish != null) {
         return (
            <div className="container">
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
                              <li >--{ma.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(ma.date)))}</li>
                           </ul>
                        )
                     })}
                  </div>

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