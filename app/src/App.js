import React, { useState } from "react";
import axios from 'axios'
import { isEmpty } from 'ramda';
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Table,
} from 'reactstrap'
import Logo from './logo.svg'

const urlInitialState = '';

const inboundAdapter = ({ data: { id, url }}) => ({
  url,
  id: `${window.location.origin}/${id}`
})

export default function App() {
  const [urlsList, setUrlsList] = useState([])
  const [url, setUrl] = useState(urlInitialState)

  const onClick = () => {
    return axios.post(`/shortenUrl`, { url })
    .then((res) => {
      const { url, id } = inboundAdapter(res)
      setUrlsList([...urlsList, { url, id }])
    })
    .catch((err) => {
      console.log('errrr', err)
    })
  }

  const onChange = (event) => {
    setUrl(event.target.value)
  }

  const onSubmit = (event) => {
    onClick()
    setUrl(urlInitialState)
    event.preventDefault()
  }

  return (
    <Container>
      <Row>
        <Col>
        <div className="url-logo">
          <img className="" alt="JustRedirect logo"src={Logo}/>
        </div>
        <Form onSubmit={onSubmit} className="url-form">
          <Input id="url-input" type="text" placeholder="Your link to shorten" value={url} onChange={onChange} />
          <Input className="btn btn-primary" id="submit-input" type="submit" value="Shorten" />
        </Form>
        {
          !isEmpty(urlsList) && (
            <Table className="url-table">
              <thead>
                <tr>
                  <th>Original Link</th>
                  <th>New Link</th>
                </tr>
              </thead>
              {
                urlsList.map(({ url, id }) => (
                  <tr>
                    <td>{url}</td>
                    <td><a href={id}>{id}</a></td>
                  </tr>
                ))
              }
            </Table>
          )
        }
        </Col>
      </Row>
    </Container>
  );
}