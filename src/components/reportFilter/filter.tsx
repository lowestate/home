import React from 'react';
import { Button, Col, Form, FormCheck, FormControl, FormLabel, Row } from 'react-bootstrap';
import '../../styles/filter.style.css';

interface ReportFilterProps {
  reqStatus: string | null;
  setReqStatus: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({
  reqStatus,
  setReqStatus,
  applyFilters,
  clearFilters,
}) => {
  return (
    <Form className="resource-filter-container">
      <Row>
        <Col>
            <Form.Select
            value={reqStatus?.toString()}
            onChange={(e) => setReqStatus(e.target.value)}
            className="resource-input"
            >
            <option value="">Выберите статус</option>
            <option value="На рассмотрении">На рассмотрении</option>
            <option value="Оказана">Оказана</option>
            <option value="Отклонена">Отклонена</option>
            </Form.Select>
        </Col>
        </Row>
      <Row className="resource-buttons">
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

export default ReportFilter;