import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

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
    <Form style={{ textAlign: 'center', backgroundColor: 'rgba(54, 54, 54, 0.7)', border: '1px solid #ddd', borderRadius: '5px', marginTop: '40px', width: '19%', padding: '5px', margin: '0 auto', color: 'white', marginBottom: '10px' }}>
      <Row>
        <Col>
          <Form.Select
            value={reqStatus?.toString()}
            onChange={(e) => setReqStatus(e.target.value)}
            style={{
              width: '200px',
              borderRadius: '5px',
            }}
          >
            <option value="">Выберите статус</option>
            <option value="Удалена">Удалена</option>
            <option value="Черновик">Черновик</option>
            <option value="Сформирована">Сформирована</option>
            <option value="Оказана">Оказана</option>
            <option value="Отклонена">Отклонена</option>
            
          </Form.Select>
        </Col>
      </Row>
      <Row className="justify-content-end" style={{ marginTop: '10px' }}>
        <Col>
          <Button style={{ backgroundColor: '#001f3f', color: '#fff' }} onClick={applyFilters}>
            Поиск
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" style={{marginRight: '5px'}} onClick={clearFilters}>
            Очистить
          </Button>
        </Col>
      </Row>
    </Form>

  );
  
};

export default ReportFilter;