import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import {
  CacheMetrics,
  DatasourceMetrics,
  GarbageCollectorMetrics,
  HttpRequestMetrics,
  JvmMemory,
  JvmThreads,
  EndpointsRequestsMetrics,
  SystemMetrics,
  Translate,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TIMESTAMP_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT, APP_WHOLE_NUMBER_FORMAT } from 'app/config/constants';
import { getSystemMetrics, getSystemThreadDump } from '../administration.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Progress } from '../../../@/components/ui/progress/progress';

export const MetricsPage = () => {
  const dispatch = useAppDispatch();
  const metrics = useAppSelector(state => state.administration.metrics);
  const isFetching = useAppSelector(state => state.administration.loading);
  const threadDump = useAppSelector(state => state.administration.threadDump);

  const [testPro, setTestPro] = useState(0);

  useEffect(() => {
    dispatch(getSystemMetrics());
    dispatch(getSystemThreadDump());
  }, []);

  const getMetrics = () => {
    if (!isFetching) {
      dispatch(getSystemMetrics());
      dispatch(getSystemThreadDump());
    }
  };

  return (
    <div>
      <h2 id="metrics-page-heading" data-cy="metricsPageHeading">
        <Translate contentKey="metrics.title">Application Metrics</Translate>
      </h2>
      <p className="tw-mb-4">
        <Button onClick={getMetrics} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>
      <p className="tw-mb-4">
        <Button
          onClick={() => {
            if (testPro !== 100) {
              setTestPro(testPro + 5);
            } else {
              setTestPro(0);
            }
          }}
          color="btn btn-primary"
          disabled={isFetching}
        >
          Test progress bar
        </Button>
      </p>
      <Progress value={testPro} includePercentage className="!tw-w-7/12" />
      <hr />

      <Row>
        <Col sm="12">
          <h3>
            <Translate contentKey="metrics.jvm.title">JVM Metrics</Translate>
          </h3>
          <Row>
            <Col md="4">{metrics?.jvm ? <JvmMemory jvmMetrics={metrics.jvm} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} /> : ''}</Col>
            <Col md="4">{threadDump ? <JvmThreads jvmThreads={threadDump} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} /> : ''}</Col>
            <Col md="4">
              {metrics?.processMetrics ? (
                <SystemMetrics
                  systemMetrics={metrics.processMetrics}
                  wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT}
                  timestampFormat={APP_TIMESTAMP_FORMAT}
                />
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {metrics?.garbageCollector ? (
        <GarbageCollectorMetrics garbageCollectorMetrics={metrics.garbageCollector} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} />
      ) : (
        ''
      )}
      {metrics && metrics['http.server.requests'] ? (
        <HttpRequestMetrics
          requestMetrics={metrics['http.server.requests']}
          twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT}
          wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT}
        />
      ) : (
        ''
      )}
      {metrics?.services ? (
        <EndpointsRequestsMetrics endpointsRequestsMetrics={metrics.services} wholeNumberFormat={APP_WHOLE_NUMBER_FORMAT} />
      ) : (
        ''
      )}

      {metrics?.cache ? (
        <Row>
          <Col sm="12">
            <CacheMetrics cacheMetrics={metrics.cache} twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
          </Col>
        </Row>
      ) : (
        ''
      )}

      {metrics?.databases && JSON.stringify(metrics.databases) !== '{}' ? (
        <Row>
          <Col sm="12">
            <DatasourceMetrics datasourceMetrics={metrics.databases} twoDigitAfterPointFormat={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT} />
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

export default MetricsPage;
