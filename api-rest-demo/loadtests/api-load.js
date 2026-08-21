// loadtests/api-load.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const resHealth = http.get('http://localhost:3000/health');
  check(resHealth, {
    'health status is 200': (r) => r.status === 200,
  });

  const resUsers = http.get('http://localhost:3000/api/users');
  check(resUsers, {
    'users status is 200': (r) => r.status === 200,
    'response has users': (r) => r.json().length > 0,
  });

  sleep(1);
}