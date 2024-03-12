import React from 'react';
import useSWR from 'swr'
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { deleteAsync, postJsonAsync } from './client';

interface Cover {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  premium: number;
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
  grid-template-columns: repeat(5, auto);
  column-gap: 5px;
`;

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Covers = () => {
  const { data: covers } = useSWR<Cover[]>('Covers');

  if (!covers) return <span>Loading...</span>;
  
  const hasCovers = covers.length > 0;

  return (
    <Wrapper>
      <Formik
        initialValues={{
          id: uuidv4(),
          startDate: '',
          endDate: '',
          type: '',
          premium: 0
        }}
        onSubmit={async (values) => {
          const payload = {
            ...values,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString()
          };
          await postJsonAsync('Covers', payload);
        }}
      >
        <Form>
          <Table>
              <label htmlFor="startDate">Start Date</label>
              <label htmlFor="endDate">End Date</label>
              <label htmlFor="type">Type</label>
              <label htmlFor="premium">Premium</label>
              <div />
              <Field id="startDate" name="startDate" type="date" />
              <Field id="endDate" name="endDate" type="date" />
              <Field id="type" name="type" />
              <Field id="premium" name="premium" type="number" />
              <button type="submit">Submit new Cover</button>
          </Table>
        </Form>
      </Formik>
      {!hasCovers && <div>No Covers Found</div>}
      {hasCovers && (
         <Table>
        <HeaderRow>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Type</div>
          <div>Premium</div>
          <div>Delete</div>
        </HeaderRow>
        
        {covers.map(cover => (
          <Row key={cover.id}>
            <div>{new Date(cover.startDate).toLocaleDateString()}</div>
            <div>{new Date(cover.endDate).toLocaleDateString()}</div>
            <div>{cover.type}</div>
            <div>{cover.premium}</div>
            <div>
              <button
                type="button"
                onClick={async () => await deleteAsync(`Covers/${cover.id}`)}
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
