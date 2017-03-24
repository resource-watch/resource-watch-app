import React from 'react';

import { Field, Select } from 'rw-components';

function Home() {
  return (
    <div className="c-page">
      <h1>Home</h1>
      <Field
        // onChange={value => this.props.onChange({ name: value })}
        onChange={value => console.info(value)}
        options={[{
          label: 'hola',
          value: 'hola'
        }]}
        validations={['required']}
        properties={{
          name: 'name',
          label: 'Title',
          type: 'text',
          required: true,
          default: ''
        }}
      >
        {Select}
      </Field>
    </div>
  );
}

export default Home;
