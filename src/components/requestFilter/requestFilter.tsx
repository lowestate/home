import React from 'react';
import { Button, Col, Form,  FormControl,  Row } from 'react-bootstrap';
import '../../styles/filter-style.css'; // импорт применяется только если стереть, сохранить, вернуть, сохранить

interface RequestFilterProps {
  usernameReq: string | null;
  dateStart: string | null;
  dateFin: string | null;
  setUsernameReq: (value: string) => void;
  setDateStart: (value: string) => void;
  setDateFin: (value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const RequestFilter: React.FC<RequestFilterProps> = ({
  usernameReq,
  dateStart,
  dateFin,
  setUsernameReq,
  setDateFin,
  setDateStart,
  applyFilters,
  clearFilters,
}) => {
    return (
        <div className="d-flex flex-column align-items-center" style={{ height: '15vh' }}>
          <Form className="mb-3">
            <Row className="mb-2">
              <Col>
                <FormControl
                  placeholder='Имя пользователя'
                  type="text"
                  value={usernameReq?.toString()}
                  onChange={(e) => setUsernameReq(e.target.value)}
                  style={{
                    width: '200px',
                    borderRadius: '5px',
                  }}
                />
              </Col>
              <Col>
                <FormControl
                  placeholder='Дата создания'
                  type="text"
                  value={dateStart?.toString()}
                  onChange={(e) => setDateStart(e.target.value)}
                  style={{
                    width: '145px',
                    borderRadius: '5px',
                  }}
                />
              </Col>
              <Col>
                <FormControl
                  placeholder='Дата завершения'
                  type="text"
                  value={dateFin?.toString()}
                  onChange={(e) => setDateFin(e.target.value)}
                  style={{
                    width: '160px',
                    borderRadius: '5px',
                  }}
                />
              </Col>
            </Row>
            <Row>
                <Button
                  style={{
                    backgroundColor: '#001f3f',
                    color: '#fff',
                    marginRight: '20px',
                    marginLeft: '10px',
                    width: '80px'
                  }}
                  onClick={applyFilters}
                >
                  Поиск
                </Button>
                <Button
                  variant="secondary"
                  style={{
                    marginRight: '25px',
                    width: '100px'
                  }}
                  onClick={clearFilters}
                >
                  Очистить
                </Button>
                <FormControl
                  readOnly
                  value="Дата должна быть формата ГГГГ-ММ-ДД"
                  style={{
                    width: '330px',
                    borderRadius: '5px',
                    color: 'white',
                    backgroundColor: 'rgba(54, 54, 54, 0.7)',
                    border: '1px solid #fff',
                  }}
                />
            </Row>
          </Form>
        </div>
      );
    };
export default RequestFilter;