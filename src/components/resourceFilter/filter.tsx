import React from 'react';
import { Button, Col, Form, FormCheck, FormControl, FormLabel, Row } from 'react-bootstrap';
import '../../styles/filter.style.css';

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
    <Form className="orbit-filter-container">
      <Row>
        <Col>
          <FormControl
            placeholder='Название ресурса'
            type="text"
            value={name?.toString()}
            onChange={(e) => setName(e.target.value)}
            className="orbit-input"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormCheck
            type="checkbox"
            label="Высокий спрос"
            checked={highDemand === '1'}
            onChange={() => setHighDemand(highDemand === '1' ? '' : '1')}
          />
        </Col>
      </Row>
      <Row className="orbit-buttons">
        <Col>
          <Button className="orbit-button" onClick={applyFilters}>
            Поиск
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" className="orbit-button" onClick={clearFilters}>
            Очистить
          </Button>
        </Col>
      </Row>
    </Form>
  );
  
};

export default ResourceFilter;