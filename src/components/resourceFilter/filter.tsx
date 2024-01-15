import React from 'react';
import { Button, Col, Form, FormCheck, FormControl,  Row } from 'react-bootstrap';
import '../../styles/filter-style.css'; // импорт применяется только если стереть, сохранить, вернуть, сохранить

interface ResourceFilterProps {
  name: string | null;
  highDemand: string | null;
  setName: (value: string) => void;
  setHighDemand: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const ResourceFilter: React.FC<ResourceFilterProps> = ({
  name,
  highDemand,
  setName,
  setHighDemand,
  applyFilters,
  clearFilters,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '15vh' }}>
      <Form>
        <Row>
          <Col>
            <FormControl
              placeholder='Название ресурса'
              type="text"
              value={name?.toString()}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '200px',
                borderRadius: '5px',
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{
            marginTop: '10px',
            color: 'white',
          }}>
            <FormCheck
              type="checkbox"
              label="Высокий спрос"
              checked={highDemand === '1'}
              onChange={() => setHighDemand(highDemand === '1' ? '' : '1')}
            />
          </Col>
        </Row>
        <Row className="justify-content-end" style={{
          marginTop: '10px',
        }}>
          <Col>
            <Button style={{
              backgroundColor: '#001f3f',
              color: '#fff',
            }} onClick={applyFilters}>
              Поиск
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" style={{
            }} onClick={clearFilters}>
              Очистить
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  
  
};



export default ResourceFilter;