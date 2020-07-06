import React, { useState } from "react";
import axios from 'axios'
import { isEmpty } from 'ramda';
import {
  Container,
  Row,
  Col,
  Form,
  Input,
} from 'reactstrap'
import Logo from './logo.svg'

const urlInitialState = '';
const errorInitialState = null;

const inboundAdapter = ({ data: { id, url }}) => ({
  url,
  id: `${window.location.origin}/${id}`
})

export default function App() {
  const [urlsList, setUrlsList] = useState([])
  const [url, setUrl] = useState(urlInitialState)
  const [error, setError] = useState(errorInitialState)

  const onClick = () => {
      setError(errorInitialState)
      return axios.post(`/shortenUrl`, { url })
    .then((res) => {
      const { url, id } = inboundAdapter(res)
      setUrlsList([{ url, id }, ...urlsList])
    })
    .catch((err, a) => {
      setError(err.response.data)
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
        { error && <p className="error-message">{error}</p>}
        {
          !isEmpty(urlsList) && (
            <div className="url-cards">
              {
                urlsList.map(({ url, id }) => (
                  <div className="url-card">
                    <span>{url}</span>
                    <a href={id}>{id}</a>
                  </div>
                ))
              }
            </div>
          )
        }
        </Col>
      </Row>
    </Container>
  );
}