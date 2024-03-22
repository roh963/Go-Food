import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Search = () => {
    const styles={
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)"
    }
  return (
    < >
        <Form style={styles}>
      <FormControl className="mr-sm-2" type="text"  placeholder="Search"  />
      <Button variant="outline-success">Search</Button>
    </Form>
    </>
  );
};

export default Search;

