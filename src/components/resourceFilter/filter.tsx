import React from 'react';
import { Button, Col, Form, FormCheck, FormControl, FormLabel, Row } from 'react-bootstrap';
import '../../styles/filter.style.css';

interface ResourceFilterProps {
  name: string | null;
  oceanOnly: string | null;
  vostOnly: string | null;
  vlazhOnly: string | null;
  setName: (value: string) => void;
  setOcean: (value: string) => void;
  setVost: (value: string) => void;
  setVlazh: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const ResourceFilter: React.FC<ResourceFilterProps> = ({
  name,
  oceanOnly,
  vostOnly,
  vlazhOnly,
  setName,
  setOcean,
  setVost,
  setVlazh,
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
            label="Океан Бурь"
            checked={oceanOnly === '1'}
            onChange={() => setOcean(oceanOnly === '1' ? '' : '1')}
          />
          <FormCheck
            type="checkbox"
            label="Море Восточное"
            checked={vostOnly === '0'}
            onChange={() => setVost(vostOnly === '1' ? '' : '1')}
          />
        </Col>
        <Col>
          <FormCheck
            type="checkbox"
            label="Море Влажности"
            checked={vlazhOnly === '1'}
            onChange={() => setVlazh(vlazhOnly === '1' ? '' : '1')}
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