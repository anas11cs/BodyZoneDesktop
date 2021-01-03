// rafce
import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
const RegisterUser = ({addItem}) => {
    // default null below
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [feeAmount, setFeeAmount] = useState('')
    // default null up
    const onSubmit = (e) => {
        e.preventDefault()
        if(name === '' || phoneNumber === '')
        {
          console.log(name)
          console.log(phoneNumber)
          console.log('System Message: Masti Kar raya aen !')
        }
        else
        {
          addItem({ name, phoneNumber, feeAmount })
        }
        setName('')
        setPhoneNumber('')
        setFeeAmount('')
        console.log(feeAmount)
        
      }
    return (
        <Card className='mt-5 mb-3'>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Row className='my-3'>
                <Col>
                  <Form.Control
                    placeholder='Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    placeholder='Phone Number'
                    value={phoneNumber}
                    type='number'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Col>
                <Col>
                  {/* <Form.Control
                    as='select'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value='0'>Select Priority</option>
                    <option value='low'>Low</option>
                    <option value='moderate'>Moderate</option>
                    <option value='high'>High</option>
                  </Form.Control> */}
                  <Col>
                  <Form.Control
                    placeholder='Fee Amount'
                    value={feeAmount}
                    type='number'
                    onChange={(e) => setFeeAmount(e.target.value)}
                  />
                </Col>
                <Col></Col>
                </Col>
              </Row>
              <Row className='my-3'>
                <Col>
                  <Button type='Register User' variant='secondary' block>
                    Add User
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )
    }
    
    export default RegisterUser