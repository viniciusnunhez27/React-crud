import React from "react"
import { Table, Button } from "react-bootstrap"



class Produtos extends React.Component { 

  constructor (props) {
      super (props);

      this.state = {
        produtos: [  
      
      ]
    }
  }
  

  componentDidMount () { 
    fetch ("http://localhost:3000/products")
    .then(response => response.json())
    .then(data => {this.setState({produtos : data})
  })
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
         <th><Button variant="primary">Atualizar</Button> <Button variant="danger">Excluir</Button></th>          
       </tr>
        )}   

      
       
      </tbody>
    </Table>
     
     )
  }
}

export default Produtos