import React from 'react';
import useSWR from 'swr'
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { deleteAsync, postJsonAsync } from './client';

interface Claim {
  id: string;
  name: string;
  type: string;
  coverId: string;
  created: string;
  damageCost: number;
}

const Row = styled.div`
  display: contents;
`;

const HeaderRow = styled(Row)`
  display: contents;
  font-weight: bold;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 5px;
`;

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Claims = () => {
  const { data: claims } = useSWR<Claim[]>('Claims');

  if (!claims) return <span>Loading...</span>;

  const hasClaims = claims.length > 0;

  return (
    <Wrapper>
      <Formik
        initialValues={{
          id: uuidv4(),
          name: '',
          type: '',
          coverId: '',
          created: '',
          damageCost: 0
        }}
        onSubmit={async (values) => {
          const payload = {
            ...values,
            created: new Date().toISOString()
          }
          await postJsonAsync('Claims', payload);
        }}
      >
        <Form>
          <Table>
              <label htmlFor="name">Name</label>
              <label htmlFor="type">Type</label>
              <label htmlFor="cost">Damage Cost</label>
              <div />
              <Field id="name" name="name" />
              <Field id="type" name="type" />
              <Field id="cost" name="damageCost" type="number" />
              <button type="submit">Submit new Claim</button>
          </Table>
        </Form>
      </Formik>
      {!hasClaims && <div>No Claims Found</div>}
      {hasClaims && (
        <Table>
        <HeaderRow>
          <div>Name</div>
          <div>Type</div>
          <div>Cost</div>
          <div>Delete</div>
        </HeaderRow>
        {claims.map(claim => (
          <Row key={claim.id}>
            <div>{claim.name}</div>
            <div>{claim.type}</div>
            <div>{claim.damageCost}</div>
            <div>
              <button
                type="button"
                onClick={async () => await deleteAsync(`Claims/${claim.id}`)}
              >
                Delete
              </button>
            </div>
          </Row>
        ))}
      </Table>
      )}
    </Wrapper>
  );
};
