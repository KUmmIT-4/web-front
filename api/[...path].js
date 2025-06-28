import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, User-Agent, DNT, Cache-Control, X-Mx-ReqToken, Keep-Alive, X-Requested-With, If-Modified-Since');
  res.setHeader('Access-Control-Max-Age', '86400');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 백엔드로 요청 프록시
    const backendUrl = `http://15.164.88.35/api/${apiPath}`;
    
    console.log('Proxying request:', {
      method: req.method,
      url: backendUrl,
      body: req.body
    });

    const config = {
      method: req.method.toLowerCase(),
      url: backendUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    };

    // POST, PUT, PATCH 요청에 body 추가
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      config.data = req.body;
    }

    const response = await axios(config);
    
    console.log('Backend response:', {
      status: response.status,
      data: response.data
    });

    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    if (error.response) {
      // 백엔드에서 오는 에러 응답
      res.status(error.response.status).json(error.response.data);
    } else {
      // 네트워크 에러 등
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }
} 