import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
export default function Footers() {
  return (
    <>
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          &copy; 2024  Go Food
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Made with ❤️ by You
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
