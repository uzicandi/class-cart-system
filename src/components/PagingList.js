import React from 'react';
import { Row, Col, Pagination } from 'antd';

function PagingList({ total, onSetCurrentPage }) {
  return (
    <Row style={{ marginTop: '15px' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={5}
          total={total}
          onChange={onSetCurrentPage}
        />
      </Col>
    </Row>
  );
}

export default PagingList;
