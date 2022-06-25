import React from "react"
import { Table, Button, Form } from "react-bootstrap"



class Produtos extends React.Component { 

  constructor (props) {
      super (props);

      this.state = {
        nome: "",
        preco: "",
        produtos: [],
    }
  }

  componentDidMount = () =>{
    this.buscarProduto ();
  }
    
  componentWillUnmount(){

  }
  
buscarProduto = () => {
  fetch ("http://localhost:3000/products")
  .then(response => response.json())
  .then(data => {this.setState({ produtos : data})
  
  }) 
}

cadastrarProduto = (produto) => {
  fetch("http://localhost:3000/products/",{
  method: "POST",
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify(produto)
}) 
  .then(response => {
    if(response.ok){
       this.buscarProduto(produto);
    } else {
      alert ("Não foi possivel cadastrar o produto")
    }
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

atualizaNome = (e) => {
  this.setState(
    {
    nome: e.target.value
  }
 )
}

atualizaPreco = (e) => {
  this.setState(
    {
    preco: e.target.value
  }
 )
}

submit = () => { 
  const produto = {
     id: 0,
     nome: this.state.nome,
     preco: this.state.preco
  }
   this.cadastrarProduto(produto);

}

  render () {
     return (  
       <>
          <Form>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Nome do produto</Form.Label>
        <Form.Control type="text" placeholder="Informe o nome do produto" value={this.state.nome} onChange={this.atualizaNome}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Preço </Form.Label>
        <Form.Control type="text" placeholder="Informe nome do produto" value={this.state.preco} onChange={this.atualizaPreco} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit" onClick={this.submit}>
          Salvar 
      </Button>
    </Form>   
    
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
        {   this.state.produtos.map((produtos) =>
         <tr>
            <th>{produtos.id}</th>
            <th>{produtos.name}</th>
            <th> {produtos.price}</th> 
            <th><Button variant="primary">Atualizar</Button> <Button variant="danger" onClick={() => this.deletarProduto(produtos.id)}>Excluir</Button></th>          
         </tr>
        )
      }  
      </tbody>
    </Table>



    </> 
   
     )
  }
  
}

export default Produtos