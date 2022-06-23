import React from "react"
import { Table, Button } from "react-bootstrap"



class Produtos extends React.Component { 

  constructor (props) {
      super (props);

      this.state = {
        produtos: []
    }
  }
  


    


buscarProduto = () => {
  fetch ("http://localhost:3000/products")
  .then(response => response.json())
  .then(data => {this.setState({ produtos : data})
  }) 
}

deletarProduto = (id) => {
   fetch(`http://localhost:3000/products/${id}`, {method: "DELETE"})
    .then(response => {
      if(response.ok){
         this.buscarProduto();
      }
   })
}

componentDidMount = () =>{
  this.buscarProduto ();
}
  
  


  render (){
     return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {this.state.produtos.map((produtos) =>
         <tr>
         <th>{produtos.id}</th>
         <th>{produtos.name}</th>
         <th> {produtos.price}</th> 
         <th><Button variant="primary">Atualizar</Button> <Button variant="danger" onClick={() => this.deletarProduto(produtos.id)}>Excluir</Button></th>          
       </tr>
        )}  
      </tbody>
    </Table>
     
     )
  }
}

export default Produtos